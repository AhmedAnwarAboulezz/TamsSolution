import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { PreviousEmployeeEvaluationService } from '../services/previousemployeeevaluation.services';

@Component({
  selector: 'app-previous-employee-evaluations',
  templateUrl: './previous-employee-evaluations.component.html',
  styleUrls: ['./previous-employee-evaluations.component.scss']
})

export class PreviousEmployeeEvaluationsComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;

  model: any = {};
  id: string;
  url = 'EmployeeEvaluations/GetAllPaged';
  get Service(): PreviousEmployeeEvaluationService { return Shell.Injector.get(PreviousEmployeeEvaluationService); }
  form: FormGroup;
  grades: any[];
  years = [];

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<PreviousEmployeeEvaluationsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    super(dialogRef);
    this.getAllGrades();
    if (this.data) {
      debugger;
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      totalRating: [this.model.totalRating, Validators.required],
      totalGradeId: [this.model.totalGradeId, Validators.required],
      year: [this.model.year],
      isCalculated:false
    });

    let year = new Date().getFullYear();
    for (let i = year - 4; i < year; i++) {
      this.years.push(i);
    }
  }

  ngOnInit() {

  }

  getAllGrades(): void {
    this.Service.getAllGrades()
      .subscribe(data => {
        this.grades = data;
      });
  }
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }

}