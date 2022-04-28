import { Component, OnInit, Optional, Inject } from '@angular/core';
import { OrganizationLatesRegulations } from 'src/app/models/organizationLatesRegulations';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { OrganizationLateRegulationService } from '../Services/organization-late-regulation.service';
import { Shell } from 'src/app/component/shell';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-organization-late-regulation',
  templateUrl: './organization-late-regulation.component.html',
  styleUrls: ['./organization-late-regulation.component.scss']
})
export class OrganizationLateRegulationComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;

  model: OrganizationLatesRegulations = {};
  id: string;
  url = 'OrganizationLatesRegulations/GetAllPaged';
  isViewDetils;
  isDefault=false;
  get Service(): OrganizationLateRegulationService { return Shell.Injector.get(OrganizationLateRegulationService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<OrganizationLateRegulationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ){
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDefault=this.model.isDefault;
    }else{
      this.model.goingOutAllowance = 0;
      
  }
    
    this.form = this.resetForm(this.model);
  }
  SaveData(event){
    this.close(event, this.resetForm(new OrganizationLatesRegulations()));
  }
  resetForm(model:OrganizationLatesRegulations):any{
    let resetForm = this.fb.group({
      id: [model.id],
      startDate: [model.startDate, Validators.required],
      endDate: [model.endDate, Validators.required],
      note: model.note,
      calcLateGoingOutDuty: [model.calcLateGoingOutDuty != null ? model.calcLateGoingOutDuty : false],
      calcTotalLates_LateIn: [model.calcTotalLates_LateIn != null ? model.calcTotalLates_LateIn : false],
      calcTotalLates_EarlyOut: [model.calcTotalLates_EarlyOut != null ? model.calcTotalLates_EarlyOut : false],
      calcTotalLates_LateGoingOutDuty: [model.calcTotalLates_LateGoingOutDuty != null ? model.calcTotalLates_LateGoingOutDuty : false],
      goingOutAllowance: [model.goingOutAllowance],
      calclateafterDutyallowancein:[model.calclateAfterDutyAllowanceIn != null ? model.calclateAfterDutyAllowanceIn : false],
      calcEarlyOutBeforeAllowanceOut:[model.calcEarlyOutBeforeAllowanceOut != null ? model.calcEarlyOutBeforeAllowanceOut : false],
      isDefault: [this.isDefault]


    }, {
      validator: (group) => {
        if (group.controls.calcLateGoingOutDuty.value === true) {
          return Validators.required((group.controls.goingOutAllowance));
        }
        return null;
      }
    }
    );
    return resetForm;
  }

  onCheckChange(event) {
    if (!event.checked) {
      this.form.patchValue({
        goingOutAllowance: 0
      });
    }
  }
  ngOnInit() {
  }

}
