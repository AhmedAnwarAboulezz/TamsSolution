import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { ApproveOverTimeDetails } from 'src/app/models/approveOvertime';
import { ApproveOvertimeDetailsService } from '../Services/approveOvertimeDetail.service';

@Component({
  selector: 'app-approve-overtime-detail-update',
  templateUrl: './approve-overtime-detail-update.component.html',
  styleUrls: ['./approve-overtime-detail-update.component.scss']
})


export class ApproveOvertimeDetailUpdateComponent  extends BaseEditComponent implements OnInit {
  model: ApproveOverTimeDetails = {};
  id: string;
  saveBtn = false;


  url = 'ApproveOverTimeDetails/GetAllPaged';
  get Service(): ApproveOvertimeDetailsService { return Shell.Injector.get(ApproveOvertimeDetailsService); }
  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ApproveOvertimeDetailUpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
    }
    this.form = this.resetForm(this.model);
  }
  

  

  onAddSave(event)
  {
    if(this.ValidateForm())
    {
      let newEvent = {
        form:event, buttonType: 'SaveClose'
      };
      this.close(newEvent);
    }
  }
  resetForm(model:ApproveOverTimeDetails): any{
    let resetForm = this.fb.group({   
      id: [model.id, Validators.required],
      employeeId:[model.employeeId, Validators.required],
      approveOverTimeId:[model.approveOverTimeId, Validators.required],
      morningTime:[model.morningTime, Validators.required],
      nightTime: [model.nightTime, Validators.required],
      weekEndTime: [model.weekEndTime, Validators.required],
      holidayTime: [model.holidayTime, Validators.required],
      actualMorningTime: [model.actualMorningTime, [Validators.required, Validators.min(0) , Validators.max(model.morningTime)]],
      actualNightTime: [model.actualNightTime, [Validators.required, Validators.min(0) , Validators.max(model.nightTime)]],
      actualWeekEndTime: [model.actualWeekEndTime, [Validators.required, Validators.min(0) , Validators.max(model.weekEndTime)]],
      actualHolidayTime: [model.actualHolidayTime, [Validators.required, Validators.min(0) , Validators.max(model.holidayTime)]],
      daysOfOvertime: [model.daysOfOvertime, Validators.required]
    });
    return resetForm;
  }

  ngOnInit() {
  }


  
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }


  ValidateForm() : boolean{    
      if(this.form.value.actualMorningTime > this.form.value.morningTime){
        this.Alert.showError(this.localize.translate.instant('approveOvertimeMessages.actualMorningTime'));
        return false;
      }
      else if(this.form.value.actualNightTime > this.form.value.nightTime){
        this.Alert.showError(this.localize.translate.instant('approveOvertimeMessages.actualNightTime'));
        return false;
      }
      else if(this.form.value.actualHolidayTime > this.form.value.holidayTime){
        this.Alert.showError(this.localize.translate.instant('approveOvertimeMessages.actualHolidayTime'));
        return false;
      }
      else if(this.form.value.actualWeekEndTime > this.form.value.weekEndTime){
        this.Alert.showError(this.localize.translate.instant('approveOvertimeMessages.actualWeekEndTime'));
        return false;
      }
      else{
        return true;
      }
  }

}