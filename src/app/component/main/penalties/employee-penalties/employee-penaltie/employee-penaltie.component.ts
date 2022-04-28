import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { EmployeeePenaltiesService } from '../services/employeepenalties.services';

@Component({
  selector: 'app-employee-penaltie',
  templateUrl: './employee-penaltie.component.html',
  styleUrls: ['./employee-penaltie.component.scss']
})

export class EmployeePenaltieComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;

  model: any = {};
  id: string;
  url = 'EmployeePenalties/GetAllPaged';
  get Service(): EmployeeePenaltiesService { return Shell.Injector.get(EmployeeePenaltiesService); }
  form: FormGroup;
  penaltietypes: any[];

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeePenaltieComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    super(dialogRef);
    this.getPenaltiesType();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      penaltiesTypeId: [this.model.penaltiesTypeId, Validators.required],
      penaltiesDate: [this.model.penaltiesDate, Validators.required],
      penaltieNote: [this.model.penaltieNote],
      decisionNumber: [this.model.decisionNumber,Validators.required],
    });
  }

  ngOnInit() {

  }

  getPenaltiesType(): void {
    this.Service.getPenaltiesTypes()
      .subscribe(data => {
        this.penaltietypes = data;
      });
  }
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }

}
