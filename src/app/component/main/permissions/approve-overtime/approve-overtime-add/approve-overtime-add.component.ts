import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { ApproveOverTime } from 'src/app/models/approveOvertime';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { OvertimeEmployeeOrdersComponent } from '../../overtime-orders/overtime-employee-orders/overtime-employee-orders.component';
import { ApproveOvertimeEmployeesComponent } from '../approve-overtime-employees/approve-overtime-employees.component';
import { ApproveOvertimeService } from '../Services/approveOverTime.service';

@Component({
  selector: 'app-approve-overtime-add',
  templateUrl: './approve-overtime-add.component.html',
  styleUrls: ['./approve-overtime-add.component.scss']
})


export class ApproveOvertimeAddComponent  extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;
  model: ApproveOverTime = {};
  id: string;
  saveBtn = false;

  years = [];



  url = 'ApproveOverTimes/GetAllPaged';
  get Service(): ApproveOvertimeService { return Shell.Injector.get(ApproveOvertimeService); }
  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ApproveOvertimeAddComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
    }
    let year = new Date().getFullYear();
    for (let i = year; i > year - 10; i--) {
      this.years.push(i);
    }
    this.form = this.resetForm(this.model);
    this.form.get('month').setValidators([Validators.min(1) , Validators.max(12)]);
    this.dialogRef.afterClosed().subscribe(() => {
      if (this.saveBtn == true && this.isNew == true) 
      {
        this.openDetails();
      }
    });
  }




  openDetails(){
    this.Service.GetApproveOverTimeByDescriptionFl(this.form.value.descriptionFl).subscribe((res: any) => {
      this.openViewDetail(ApproveOvertimeEmployeesComponent, res);
     });
  }
  

  

  onAddSave(event){
      this.saveBtn = event.buttonType === 'SaveClose' ? true : false;
      this.close(event, this.resetForm(new ApproveOverTime()));
      if (event.buttonType === 'Save') {
        this.isNew = true;
      }

  }
  resetForm(model:ApproveOverTime): any{
    let resetForm = this.fb.group({   
      id: [model.id],
      descriptionFl:[model.descriptionFl, Validators.required],
      descriptionSl:[model.descriptionSl],
      employeeId: [model.employeeId, Validators.required],
      month: [model.month, Validators.required],
      year: [model.year, Validators.required]
    });
    return resetForm;
  }

  ngOnInit() {
  }


  
  onEmployeeCancel() {
    this.form.controls['requestedBy'].setValue(null);
  }

  protected openDialog(dialog: any, data: any, width: any, height?:any): void {
    this.dialog.open(dialog, {
      height,
      width,
      data,
      panelClass: 'my-dialog',
      direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr'),
      disableClose:true
    });
  }

  openViewDetail(dialog: any, data: any, width = '1100px') {
    this.openDialog(dialog, data, width);
  }

}

