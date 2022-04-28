import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Organization } from 'src/app/models/Organization';
import { organizationSetting } from 'src/app/models/organizationSetting';
import { OrganizationService } from '../services/organization.service';
import { Shell } from 'src/app/component/shell';
import { Nationality } from 'src/app/models/Nationality';
import { ActiveDirectoryPrimaryKey } from 'src/app/models/activeDirectoryPrimaryKey';
import { ActiveDirectoryKey } from 'src/app/models/activeDirectoryKey';
import { WeekDayDropDown } from 'src/app/models/weekday';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent extends BaseComponent implements OnInit {

  get Service(): OrganizationService { return Shell.Injector.get(OrganizationService); }
  formsetting: FormGroup;
  model: organizationSetting = {};
  activeDirectoryPrimaryKeys: ActiveDirectoryPrimaryKey[];
  activeDirectoryKey: ActiveDirectoryKey[];
  nationalities: Nationality[];
  weekDays: WeekDayDropDown[];

  organiztionID: any;
  oldRestDay: any;
  oldWeekend: any;

  organizationData:Organization;


  constructor(
    private fb: FormBuilder,

  ) {
    super();
    this.organizationData = JSON.parse(localStorage.getItem('Organizations_data')) as Organization;
    this.organiztionID = this.organizationData.id;
    this.initForm(this.model);

    this.getLookups();
     this.getData();
  }

  ngOnInit() {
  }
  initForm(model : organizationSetting) {
    let organization = JSON.parse(localStorage.getItem('Organizations_data')) as Organization;  
    this.formsetting = this.fb.group({
      id: [model.id],
      organizationId: [organization.id],
      nationalityId: [model.nationalityId],
      isActiveDirectory: [model.isActiveDirectory],
      adDomainName: [model.adDomainName],
      primaryKeyId: [model.primaryKeyId],
      aDKeyId: [model.adKeyId],
      restDayId: [model.restDayId],
      weekendDayId: [model.weekendDayId],
      isReviewLogs:[model.isReviewLogs]
    });
    if (!model.isActiveDirectory) {
      this.formsetting.controls['isActiveDirectory'].setValue(false);
    }
  }

  getLookups(): void {
    this.Service.getLookup()
      .subscribe(data => {
        this.activeDirectoryPrimaryKeys = data[0];
        this.activeDirectoryKey = data[1];
        this.nationalities = data[2];
        this.weekDays = data[3];

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
    this.Service.UpdateSettingOrganization(this.formsetting.value)
       .subscribe(() => {
        this.alertService.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      },error =>{
        this.alertService.showError(this.getErrorMessage(error));

      });   
  }

  getData() {
    this.Service.GetOrganizationSetting(this.organiztionID).subscribe(res => {
      this.initForm(res);
    });
  }

}
