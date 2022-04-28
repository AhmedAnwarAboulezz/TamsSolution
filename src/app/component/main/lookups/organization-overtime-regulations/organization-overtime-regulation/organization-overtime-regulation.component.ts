import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { OrganizationOvertimeRegulationsService } from '../Service/organization-overtime-regulations.service';
import { OrganizationOverTimeReguations } from 'src/app/models/organizationovertimeregulations';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { basename } from 'path';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-organization-overtime-regulation',
  templateUrl: './organization-overtime-regulation.component.html',
  styleUrls: ['./organization-overtime-regulation.component.scss']
})
export class OrganizationOvertimeRegulationComponent extends BaseEditComponent implements OnInit {

  model: OrganizationOverTimeReguations = {};
  id: string;
  url = 'OrganizationOvertimeRegulations/GetAllPaged';
  isViewDetils;
  terminalips:any;
  header = DatePickerHeader;

  isDefault= false;
  get Service(): OrganizationOvertimeRegulationsService { return Shell.Injector.get(OrganizationOvertimeRegulationsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<OrganizationOvertimeRegulationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    super(dialogRef);
    this.getdevices();

    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDefault=data.isDefault;
    }
    else
    {
      this.model.overtimeMaxmumInOffDay=0
      this.model.overtimeMaxmumInWorkDay=0
      this.model.overtimeMinimum=0

    }
    if (this.model.overTimeRegulationsDevices !== undefined &&
      this.model.overTimeRegulationsDevices.some(e => typeof e === 'object')) {
      this.model.overTimeRegulationsDevices = this.model.overTimeRegulationsDevices.map(({ deviceIp }: any) => (deviceIp));
    }
    
    this.form = this.resetForm(this.model);
  }
  ngOnInit() {
    this.getdevices();

  }
  resetForm(model:OrganizationOverTimeReguations):any{
    let resetForm = this.fb.group({
      id: [model.id],
      startDate: [model.startDate, Validators.required],
      endDate: [model.endDate, Validators.required],
      note: [model.note],
      mustSignForOverTime: [model.mustSignForOverTime != null ? model.mustSignForOverTime : false],
      overTimeFromSpecificDevices: [model.overTimeFromSpecificDevices != null ? model.overTimeFromSpecificDevices : false],
      overtimeMaxmumInOffDay: [model.overtimeMaxmumInOffDay],
      overtimeMaxmumInWorkDay: [model.overtimeMaxmumInWorkDay],
      overtimeMinimum: [model.overtimeMinimum],
      overTimeRegulationsDevices: [model.overTimeRegulationsDevices],
      isDefault: [this.isDefault]

    }, {
      validator: (group) => {
        if (group.controls.overTimeFromSpecificDevices.value === true) {
          return Validators.required((group.controls.overTimeRegulationsDevices));
        }
        return null;
      }
    });
    return resetForm;
  }
  
  getdevices(){
  this.Service.getTerminalIp().subscribe(data => {
    this.terminalips = data;
  });
 
}
  onCheckChange(event) {
    if (!event.checked) {
      this.form.patchValue({
        overTimeRegulationsDevices: null
      });
    }
  }
  closeConfirmation(result, resetForm?: any) {
    if (result.form.overTimeFromSpecificDevices) {
      result.form.overTimeRegulationsDevices = result.form.overTimeRegulationsDevices.filter(e => e != 0).map((e: any) => ({ deviceIp: e, overTimeRegulationId: result.form.id }));
    }
    let newmodel =new  OrganizationOverTimeReguations() ;

    newmodel.overtimeMaxmumInOffDay=0;
    newmodel.overtimeMaxmumInWorkDay=0;
    newmodel.overtimeMinimum=0;
    this.close(result, this.resetForm(newmodel));
  }


  toggleAllSelection(selected) {
    if (selected) {
      this.form.controls.overTimeRegulationsDevices
        .patchValue([...this.terminalips.map(item => item.treminal_IP), 0]);
    } else {
      this.form.controls.overTimeRegulationsDevices.patchValue([]);
    }
  }
  toggleUnSelectAll(selected)
  {
    var selectedItems= this.form.controls.overTimeRegulationsDevices.value.filter(e => e != 0);
    this.form.controls.overTimeRegulationsDevices.patchValue(selectedItems);

  }


}
