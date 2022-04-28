import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Shell } from 'src/app/component/shell';
import { Organization } from 'src/app/models/Organization';
import { AlertService } from 'src/app/services/AlertService';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { BreakSettingService } from './service/break-setting.service';

@Component({
  selector: 'app-break-setting',
  templateUrl: './break-setting.component.html',
  styleUrls: ['./break-setting.component.scss']
})
export class BreakSettingComponent implements OnInit {
  formsetting: FormGroup;
  triggerTypes: any[];
  signIntriggerTypes: any[];
  get alertService(): AlertService { return Shell.Injector.get(AlertService); }
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }

  get Service(): BreakSettingService { return Shell.Injector.get(BreakSettingService); }
  model: any = {};
  organiztionID: any;
isNew=true;
  constructor(    private fb: FormBuilder
    ) {
      let organization = JSON.parse(localStorage.getItem('Organizations_data')) as Organization;  

      this.organiztionID=organization.id;
      this.initForm(this.model);

     }

  ngOnInit() {
 
    this.getLookups();
    this.getData();

  }
  initForm(model : any) {
    this.formsetting = this.fb.group({
      id: [model.id],
      signOutTriggerTypeId: [model.signOutTriggerTypeId],
      signInTriggerTypeId: [model.signInTriggerTypeId],

    });
  
  }
  getLookups() {
    this.Service.getTriggerTypes().subscribe(data => {
     
      this.triggerTypes = data.filter(c=>c.id<=4);
    });
  }
  save(){
    if (this.isNew == true){
   this.Service.addBreakSetting(this.formsetting.value)
       .subscribe(() => {
        this.alertService.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      },error =>{
        this.alertService.showError(error);

      });  
    }
    else
    {
      this.Service.updateBreakSetting(this.formsetting.value)
      .subscribe(() => {
       this.alertService.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
     },error =>{
       this.alertService.showError(error);

     });  
    }
  
  }
  getData() {
    this.Service.getBreakSettings(this.organiztionID).subscribe(res => {
if(res.result != null) {
  this.isNew = false
  this.signIntriggerTypes=this.triggerTypes.filter(x=>x.id != res.result.signOutTriggerTypeId);
     this.initForm(res.result);

}  
    });
  }
  showsignInDrop(value){
    this.signIntriggerTypes=this.triggerTypes.filter(x=>x.id != value)
  }
}
