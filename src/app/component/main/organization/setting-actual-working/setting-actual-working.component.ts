import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { Shell } from 'src/app/component/shell';
import { ActualWorkingDayTypeEnum } from 'src/app/enums/actualWorkingDayTypeEnum';
import { Organization } from 'src/app/models/Organization';
import { settingActualWorking } from 'src/app/models/organizationSetting';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-setting-actual-working',
  templateUrl: './setting-actual-working.component.html',
  styleUrls: ['./setting-actual-working.component.scss']
})


export class SettingActualWorkingComponent extends BaseComponent implements OnInit {

  get Service(): OrganizationService { return Shell.Injector.get(OrganizationService); }
  formsetting: FormGroup;
  model: settingActualWorking[] = [];
  leaves: any[];
  fulldays: any[];
  organiztionID: any;
  actualWorkingDayTypeEnum: ActualWorkingDayTypeEnum;

  organizationData:Organization;


  constructor(
    private fb: FormBuilder,

  ) {
    super();

    this.organizationData = JSON.parse(localStorage.getItem('Organizations_data')) as Organization;
    this.organiztionID = this.organizationData.id;
    this.initForm([]);
    this.getLookups();
    this.getData();
  }

  ngOnInit() {
  }
  initForm(model : settingActualWorking[]) {
    this.formsetting = this.fb.group({     
      leaveIds: [model.length > 0 ? model.filter(a=>a.typeId == ActualWorkingDayTypeEnum.Leave).map(a=> a.transactionId) : []],
      fullPermissionIds: [model.length > 0 ? model.filter(a=>a.typeId == ActualWorkingDayTypeEnum.FullDayPermision).map(a=> a.transactionId): []]    
    });
    
  }

  getLookups(): void {
    this.Service.getLookup()
      .subscribe(data => {
        this.leaves = data[4];
        this.fulldays = data[5];
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
  mapFormData():settingActualWorking[] {
    let res: settingActualWorking[] = [];
    let inputs = this.formsetting.value;
    inputs.leaveIds.forEach(element => {
      res.push({ organizationId:this.organiztionID, transactionId : element, typeId : ActualWorkingDayTypeEnum.Leave});
    });
    inputs.fullPermissionIds.forEach(element => {
      res.push({ organizationId:this.organiztionID, transactionId : element, typeId : ActualWorkingDayTypeEnum.FullDayPermision});
    });
    return res;
  }
  editWorkingSetting() {
    let result = this.mapFormData();
    console.log(result);
    this.Service.UpdateSettingActualWorking(result)
       .subscribe(() => {
        this.alertService.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      },error =>{
        this.alertService.showError(this.getErrorMessage(error));

      });   
  }

  getData() {
    this.Service.GetSettingActualWorking(this.organiztionID).subscribe(res => {
      console.log("model ", res);
      this.model = res;
      this.initForm(this.model);
    });
  }

}
