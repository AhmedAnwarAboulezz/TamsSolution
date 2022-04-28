import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { EmployeeDuty } from 'src/app/models/employeeDuty';
import { EmployeeDutiesService } from '../Services/employeeDuties.service';
import { Shell } from 'src/app/component/shell';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-edit-employee-duty',
  templateUrl: './edit-employee-duty.component.html',
  styleUrls: ['./edit-employee-duty.component.scss']
})
export class EditEmployeeDutyComponent  extends BaseEditComponent implements OnInit {
  model: EmployeeDuty;
  id: string;
  url = 'EmployeeDuties/GetAllPaged';
  header = DatePickerHeader;

  get Service(): EmployeeDutiesService { return Shell.Injector.get(EmployeeDutiesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEmployeeDutyComponent>,
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
      dutyId: [this.model.dutyId],
      employeeId: [this.model.employeeId],
      dutyTypeId: [this.model.dutyTypeId],
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate, Validators.required],
    });
  }

  ngOnInit() {
  }
  onAddSave(event) {
    let result = { form: this.form.value, buttonType: event };
    super.close(result);
  }

  
}

