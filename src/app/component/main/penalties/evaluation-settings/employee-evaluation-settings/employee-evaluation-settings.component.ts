import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { Shell } from 'src/app/component/shell';
import { Organization } from 'src/app/models/Organization';
import { EvaluationSettingServices } from '../services/evaluationsetting.services';

@Component({
  selector: 'app-employee-evaluation-settings',
  templateUrl: './employee-evaluation-settings.component.html',
  styleUrls: ['./employee-evaluation-settings.component.scss']
})


export class EmployeeEvaluationSettingsComponent extends BaseComponent implements OnInit {

  get Service(): EvaluationSettingServices { return Shell.Injector.get(EvaluationSettingServices); }
  formsetting: FormGroup;
  model: any = {};
  organiztionId: any;
  organizationData:Organization;
  transferredDepartments = [
    { val: '10000000-1000-1000-1000-100000000000', nameEn: 'First Department',nameAr :'أول اداره'},
    { val: '20000000-2000-2000-2000-200000000000', nameEn: 'Last Department',nameAr :'أخر اداره'},
    { val: '30000000-3000-3000-3000-300000000000', nameEn: 'Longest Duration',nameAr :'الاكثر مده'}
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
    this.formsetting = this.fb.group({
      id: [model.id],
      durationOfAssignment: [model.durationOfAssignment],
      transferredDepartment: [model.transferredDepartment],
      employeeWorkingDaysDuringYear: [model.employeeWorkingDaysDuringYear]
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
  edit2() {
    this.Service.UpdateEmployeeEvaluationSetting(this.formsetting.value)
       .subscribe(() => {
        this.alertService.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      },error =>{
        this.alertService.showError(this.getErrorMessage(error));

      });   
  }

  getData() {
    this.Service.GetEmployeeEvaluationSetting(this.organiztionId).subscribe(res => {
      this.initForm(res);
    });
  }

}
