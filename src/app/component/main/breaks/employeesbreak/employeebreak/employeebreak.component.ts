import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { EmployeebreakService } from '../service/employeebreak.service';

@Component({
  selector: 'app-employeebreak',
  templateUrl: './employeebreak.component.html',
  styleUrls: ['./employeebreak.component.scss']
})
export class EmployeebreakComponent extends BaseEditComponent implements OnInit {
  model:any={};
  url = 'EmployeeBreaks/GetAllPaged';
  get Service():  EmployeebreakService { return Shell.Injector.get(EmployeebreakService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeebreakComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
    }
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate, Validators.required],
      startTime: [this.model.startTime],
      endTime: [this.model.endTime],
      breakDuration:[this.model.breakDuration, Validators.required],
      isFixedTime:[this.model.isFixedTime != null ? this.model.isFixedTime : false],

    });
  }

  ngOnInit() {
  }
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }
  fixedTimeChange(event){

   if(event.checked)
   {
    this.form.get('breakDuration').setValidators([]);
    this.form.get('breakDuration').setValue(0);
    this.form.get('breakDuration').updateValueAndValidity();

    this.form.get('startTime').setValidators([Validators.required]); 
    this.form.get('endTime').setValidators([Validators.required]);
   }else
   {
    this.form.get('startTime').setValidators([]);
    this.form.get('endTime').setValidators([]);
    this.form.get('startTime').setValue(null);
    this.form.get('endTime').setValue(null);

    this.form.get('breakDuration').setValidators([Validators.required]); 
    this.form.get('breakDuration').updateValueAndValidity();

   } 
  }
}
