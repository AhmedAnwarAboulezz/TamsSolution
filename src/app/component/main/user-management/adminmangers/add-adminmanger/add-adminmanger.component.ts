import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminManger } from 'src/app/models/adminManger';
import { AdminmanagersService } from '../services/adminmanagers.service';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { Shell } from 'src/app/component/shell';
import { TreeComponent } from 'src/app/shared/components/tree/components/tree/tree.component';

@Component({
  selector: 'app-add-adminmanger',
  templateUrl: './add-adminmanger.component.html',
  styleUrls: ['./add-adminmanger.component.scss']
})
export class AddAdminmangerComponent extends BaseEditWithListComponent implements OnInit {
  @ViewChild(TreeComponent, null) tree: TreeComponent;
  url = 'adminMangers/GetAllPaged';
  formdata = true;
  componentName = 'AdminmangersComponent';
  currentadminmanger = '';
  isDisabled = false;

  form: FormGroup;
  adminMangers: AdminManger[];
  adminManger: AdminManger = {};
  displayIf: boolean;
  displayedColumns = {};
  header = DatePickerHeader;
  get Service(): AdminmanagersService { return Shell.Injector.get(AdminmanagersService); }
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }

  columnsTypes = { startDate: 'Date', endDate: 'Date' };
  // implememnt mainLoader here in every component to get the inital data of the datatable
  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);
    return from(result);
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAdminmangerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.form = this.fillFormGroup(this.adminManger);
    if (this.localize.currentLang == 'Fl') {
      this.displayedColumns = {
        admLevelFl: 'adminstrative',employeeNumber: 'employee Number',employeeNameFl: 'employee Name',  startDate: 'Start date', endDate: 'End date'
        
      };
    } else {
      this.displayedColumns = {
        admLevelSl: 'اسم الاداره',employeeNumber: 'رقم الموظف', employeeNameSl: 'اسم الموظف',
        startDate: 'تاريخ البدايه', endDate: 'تاريخ النهايه',
       
       
      };
    }

  }

  async resultOfEmployee(queryRequest: any) {
    const responce: any = await this.Service.postQueryParamsReq('AdminMangers/GetAllAdminMangerById',
      this.adminManger, queryRequest).toPromise();
    return responce;
  }
  loadTableData() {

    this.dataTable.dataService = (d: any) => this.mainLoader(d);
    this.dataTable.reload.emit();
  }

  onCancel() {
    this.tree.loadData([], true);
    this.isDisabled = false;
    this.setData(new AdminManger());
  }
  onSave() {

    let data = this.form.value;

    if (data.id) {
      this.update(data);
    } else {
      this.addNew(data);
      
    }
    // this.scrollToBottom();

  }
  edit(event: any) {
    this.getData(event);
    console.log('form ', this.form);

  }

  addNew(adminmanger: AdminManger) {
    this.Service.addadminmanger(adminmanger)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
        this.saveAndReload();
        this.tree.loadData([], true);
         this.isDisabled = false;
         this.currentadminmanger = '';
         this.setData(new AdminManger());

      }, error => {
        this.Alert.showError(this.getErrorMessage(error));
      });

  }
  update(adminManger: AdminManger) {
    this.Service.editadminmanger(adminManger)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
        this.saveAndReload();
        this.tree.loadData([], true);
    this.isDisabled = false;
    this.currentadminmanger = '';
    this.setData(new AdminManger());
      }, error => {
        this.Alert.showError(this.getErrorMessage(error));

      });

  }
  getData(adminManger: AdminManger) {
    this.Service.getAdminManagerById(adminManger.id).subscribe(result => {
      this.setData(result);
      this.isDisabled = true;
    });

  }

  fillFormGroup(model: AdminManger): any {
    let result = this.fb.group({
      id: [model.id],
      employeeId: [model.employeeId, Validators.required],
      adminId: [model.adminId, Validators.required],
      startDate: [model.startDate, Validators.required],
      endDate: [model.endDate]

    });
    return result;

  }
  setData(model: AdminManger): any {
    this.form.controls.id.setValue(model.id);
    this.form.controls.employeeId.setValue(model.employeeId);
    this.form.controls.adminId.setValue(model.adminId);
    this.form.controls.startDate.setValue(model.startDate);
    this.form.controls.endDate.setValue(model.endDate);
  }
  selectedNodes(event) {
    this.adminManger.adminId = event;
    this.Service.getCurrentAdminmanger(event).subscribe(result => {

      this.currentadminmanger = this.localize.currentLang == "Fl" ? result.nameFl : result.nameSl;
    });

    this.loadTableData();

  }

  delete(id: any) {
    this.Service.deleteAdminManager(id)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.DeleteSuccess'));
        this.saveAndReload();
      }, error => {
        this.Alert.showError(this.getErrorMessage(error));
      });
  }

  onEmployeeCancel() {
    this.form.controls.employeeId.setValue(null);
  }

}
