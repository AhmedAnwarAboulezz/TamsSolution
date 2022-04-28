import { OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shell } from '../../shell';
import { AlertService } from 'src/app/services/AlertService';
import { HttpService } from 'src/app/services/http/http.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { FormGroup } from '@angular/forms';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';
import { Observable } from 'rxjs';
import { TableDetailsComponent } from 'src/app/core/table-details/table-details.component';
import { MatDialogRef, MatDatepicker } from '@angular/material';
import moment, { Moment } from 'moment';

export abstract class BaseEditWithListComponent implements OnInit {
  isNew = true;
  url;
  form: FormGroup;
  abstract get Service(): HttpService;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Route(): Router { return Shell.Injector.get(Router); }
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }
  @ViewChild(TableDetailsComponent, null) dataTable: TableDetailsComponent;
  abstract mainLoader(x: any): Observable<any>;

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {

  }
  close(result) {
    if (result.form == null || result.form === undefined) {
      return false;
    }
    if (result.form === '') {
      return false;
    }
    if (this.isNew) {
      this.submitNew(result.form, result.buttonType);
    } else {
      this.submitUpdate(result.form, result.buttonType);
    }
  }

  onNoClick(buttonType?: any) {
    switch (buttonType) {

      case buttonType = 'SaveClose':
        {
          this.dialogRef.close();
          break;
        }
      case buttonType = 'Save':
        {
          this.form.reset();
          return false;
        }
      case buttonType = 'Close':
        {
          this.dialogRef.close();
          break;
        }

    }
  }

  submitNew(model: any, buttonType?: any): void {
    this.Service.postReq('Add', model).subscribe((result: any) => {
      if (result != null) {
        this.Alert.showError(this.localize.translate.instant('Message.AddError'));
        return false;
      }
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable(this.url);
      this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
      this.onNoClick(buttonType);

    }, error => {
      this.Alert.showError(this.getErrorMessage(error));
    });
  }

  submitUpdate(model: any, buttonType?: any): void {
    this.Service.putReq('Update', model).subscribe((result: any) => {

      if (result != null) {
        this.Alert.showError(this.localize.translate.instant('Message.UpdateError'));
        return false;
      }
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable(this.url);
      this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      this.onNoClick(buttonType);

    }, error => {
      this.Alert.showError(this.getErrorMessage(error));
    });
  }

  getErrorMessage(error): string {
    let message = '';

    if (error.status === 400) {

      let errors: Array<any> = error.error.errors;

      if (errors instanceof Object) {
        Object.keys(errors).forEach((key) => {
          message += errors[key][0] + '\n';
        });
      } else if (typeof error.error === 'string') {
        // the error is validation error BadRequest('error message')
        message = error.error;
      } else {
        message = 'Bad Request';
      }

    } else if (error.status === 500) {
      message = 'Unexpected error happened.';
    }

    return message;
  }

  loadPagedData() {
    this.dataTable.dataService = (d: any) => this.mainLoader(d);
    this.dataTable.reload.emit();
  }

  saveAndReload() {
    this.loadPagedData();
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable(this.url);
  }
  saveAndClose() {
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable(this.url);
    this.dialogRef.close();
  }

  onOpen(datepicker: MatDatepicker<Moment>) {
    var matCalendar = document.getElementsByClassName("mat-calendar")[0];
    var button = document.createElement("mat-button");
    button.style.color = 'white';
    button.style.backgroundColor = '#3f51b5';
    button.className = "mat-button";
    button.style.bottom = '5px';
    button.style.position = 'absolute';
    button.style.left = '120px';
    button.style.height = '20px';
    button.style.padding = '0';
    button.style.border = '0';
    button.style.textAlign = 'center';
    button.style.lineHeight = '20px';

    button.addEventListener("click", function(){
      
      const today = moment().utcOffset(0);
      today.set({hour:0,minute:0,second:0,millisecond:0})
      today.toISOString()
      today.format()
      datepicker.select(today);
      datepicker.close();
    }, false);
    
    var today="Today";
    if (this.localize.lang != 'en') {
      today="الـيــــوم";
    }
    
    var text = document.createTextNode(today);


    button.appendChild(text);

    matCalendar.appendChild(button);
  }
}
