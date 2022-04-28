import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import moment from 'moment';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { ValidLogStatusEnum } from 'src/app/enums/ValidLogStatusEnum';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { EmployeeAttendanceService } from '../../employee-attedances/services/employeeAttendance.service';

@Component({
  selector: 'app-auto-solve-logs',
  templateUrl: './auto-solve-logs.component.html',
  styleUrls: ['./auto-solve-logs.component.scss']
})
export class AutoSolveLogsComponent extends BaseEditComponent implements OnInit {
  currentCulture = this.localize.currentLang == 'ar' ? 'ar-EG' : 'en-US';
  model: any = {};
  absenceSearch: any = {
    notes: ""
  };
  logTypes: any;
  reviewList: any[] = [];
  notes = "";
  search: { employeeId: any; employeeNumber: any; startDate: any; remarkId: any; logTypeId: any; id: any; };
  get Service(): EmployeeAttendanceService { return Shell.Injector.get(EmployeeAttendanceService); }
  constructor(
    public dialogRef: MatDialogRef<AutoSolveLogsComponent>,
    public dialog: MatDialog,
    public loaderService: LoaderService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
    }
    console.log( this.model)
    this.getLookups();
    this.getData();
  }
  getLookups() {
    this.Service.getLogtypes().subscribe(data => {
      this.logTypes = data;
    });
  }



  Close(){
    this.dialogRef.close();
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable('Reports/GetEmployeeAbsence', this.absenceSearch.searchValues);
  }
  ngOnInit() {
  }
  showResetDialog(): void {
    
  }

  getData(){
    this.absenceSearch = {
      autoChange: false,
      searchValues: this.model.searchValues,
      notes: ""
    }
    this.loaderService.show();
    this.Service.reviewSolvedLogs(this.absenceSearch).subscribe(res => {
      this.loaderService.hide();
      this.reviewList = res;
    }, error => {
      this.loaderService.hide();
      this.Alert.showError(this.getErrorMessage(error));
    });
  }


  saveData(){
    this.absenceSearch.autoChange = true;
    console.log("this.absenceSearch = ", this.absenceSearch);
    this.loaderService.show();
    this.Service.reviewSolvedLogs(this.absenceSearch).subscribe(res => {
      this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      setTimeout(() => {
        this.loaderService.hide();
        this.Close();
      }, 2000);
    }, error => {
      this.loaderService.hide();
      this.Alert.showError(this.localize.translate.instant('Message.UpdateError'));
    });
  }

  openConfirmDialog(): void {
    let confirmTitle = "autoSolve.confirmTitle";
    let confirmMessage = "autoSolve.confirmMessage";
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { message : confirmMessage, title : confirmTitle }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == undefined || result.data == false) 
      {  return;  }
        this.saveData();          
    });
  }
}
