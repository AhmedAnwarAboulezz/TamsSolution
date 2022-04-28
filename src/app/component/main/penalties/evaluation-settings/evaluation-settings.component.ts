import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { Shell } from 'src/app/component/shell';
import { Organization } from 'src/app/models/Organization';
import { AlertService } from 'src/app/services/AlertService';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { EvaluationSettingServices } from './services/evaluationsetting.services';

@Component({
  selector: 'app-evaluation-settings',
  templateUrl: './evaluation-settings.component.html',
  styleUrls: ['./evaluation-settings.component.scss']
})


export class EvaluationSettingsComponent extends BaseComponent implements OnInit {

  get Service(): EvaluationSettingServices { return Shell.Injector.get(EvaluationSettingServices); }
  form: FormGroup;
  model: any = {};
  organiztionId: any;
  organizationData:Organization;
  dutyAttendanceCommitmentTypes = [
    { val: 0, nameEn: 'First row',nameAr :'صف اول'},
    { val: 1, nameEn: 'First row repeated',nameAr :'صف اول مكرر'}
  ];
  constructor(
    private fb: FormBuilder,

  ) {
    super();
    this.organizationData = JSON.parse(localStorage.getItem('Organizations_data')) as Organization;
    this.organiztionId = this.organizationData.id;
    this.initForm(this.model);
     this.getData();
  }

  ngOnInit() {
  }
  initForm(model : any) {
    this.form = this.fb.group({
      id: [model.id],
      minValue: [model.minValue],
      maxValue: [model.maxValue],
      dutyAttendanceCommitment: [model.dutyAttendanceCommitment],
      dutyAttendanceCommitmentType: [model.dutyAttendanceCommitmentType],
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
  edit() {
    this.Service.UpdateEvaluationSetting(this.form.value)
       .subscribe(() => {
        this.alertService.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      },error =>{
        this.alertService.showError(this.getErrorMessage(error));

      });   
  }

  getData() {
    this.Service.GetEvaluationSetting(this.organiztionId).subscribe(res => {
      this.initForm(res);
    });
  }

}
