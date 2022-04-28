import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { ValidLogStatusEnum } from 'src/app/enums/ValidLogStatusEnum';
import { EmployeeAttendanceLog } from 'src/app/models/employeeAttendanceLog';
import { HttpService } from 'src/app/services/http/http.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { DeleteDialogComponent } from 'src/app/shared/components/data-table/components/Delete-dialog.component';
import { ReviewLogsService } from '../services/review-logs.service';

@Component({
  selector: 'app-review-log',
  templateUrl: './review-log.component.html',
  styleUrls: ['./review-log.component.scss']
})
export class ReviewLogComponent extends BaseEditComponent implements OnInit {
  currentCulture = this.localize.currentLang == 'ar' ? 'ar-EG' : 'en-US';
  model: any = {};
  logTypes: any;
  remarks: any;
  search: { employeeId: any; employeeNumber: any; startDate: any; remarkId: any; logTypeId: any; id: any; };
  movementImage: string = './assets/img/man.png';
  emplyeeDefaultImage: string = './assets/img/man.png';
  get Service(): ReviewLogsService { return Shell.Injector.get(ReviewLogsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ReviewLogComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);

    if (this.data) {
      this.model = this.data;
    }
    console.log( this.model)
    this.getLookups();
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      employeeNameFl: [this.model.employeeNameFl, Validators.required],
      employeeNameSl: [this.model.employeeNameSl],
      employeeNumber: [this.model.employeeNumber],
      terminalSn: [this.model.terminalSn],
      terminalIp: [this.model.terminalIp],
      timeEntryStr:[moment.parseZone(new Date(this.model.timeEntry), this.currentCulture).format('DD-MM-YYYY HH:mm:ss'), Validators.required],
      timeEntry: [this.model.timeEntry],
      logTypeId: [this.model.logTypeId, Validators.required],
      remarkId: [this.model.remarkId, Validators.required],
    });
  }
  getLookups() {
    this.Service.getLookup().subscribe(data => {
     
      this.logTypes = data[0];
      this.remarks = data[1];
    });
    this.search = {
      employeeId: this.data.employeeId,
      employeeNumber: this.data.employeeNumber,
      startDate: this.model.timeEntry,
      remarkId: this.model.remarkId,
      logTypeId: this.model.logTypeId,
      id: this.model.id
    };

    this.Service.getActionImageMobile(this.search).subscribe(data => {    
            this.movementImage = data != "" ? data :'./assets/img/man.png';
    });
    this.Service.getEmployeeImage(this.model.employeeId).subscribe(response => {
      
      if(response != null && response != ""){
        this.emplyeeDefaultImage = response;
      }
    });
  }

  ApproveLog(status){
    var approveLogReview = {
      id: this.model.id,
      statusId:status==1?ValidLogStatusEnum.Accepted :ValidLogStatusEnum.Rejected 
    };
    let confirmTitle = "confirmContinuTitle";
    let confirmMessage = "confirmContinuMessage";
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { message : confirmMessage, title : confirmTitle }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data == true) {
        this.ConfirmApprove(approveLogReview);
        }
    });

  }

  
ConfirmApprove(approveLogReview){
  this.Service.ApproveLogReview(approveLogReview).subscribe((result: any) => {
    
    if (result != null && result != "") {
      this.Alert.showError(this.getErrorMessage(result));
      return false;
    }
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable('EmployeeDeviceLogMobiles/GetAllPagedReview');
   this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
    this.dialogRef.close();
  }, error => {
    this.Alert.showError(this.getErrorMessage(error));
  });
}
  Close(){
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  showResetDialog(): void {
    
  }
}
