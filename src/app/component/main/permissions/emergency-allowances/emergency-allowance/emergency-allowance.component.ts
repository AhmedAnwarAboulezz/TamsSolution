import { Component, OnInit, Inject, Optional } from '@angular/core';
import { EmergencyAllowance } from '../../../../../models/EmergencyAllowance';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmergencyAllowanceDescriptionTypeEnum } from 'src/app/enums/EmergencyAllowanceDescriptionTypeEnum';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { EmergencyAllowancesService } from '../services/emergency-allowances.service';
import { Shell } from 'src/app/component/shell';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import moment from 'moment';
@Component({
  selector: 'app-emergency-allowance',
  templateUrl: './emergency-allowance.component.html',
  styleUrls: ['./emergency-allowance.component.scss']
})

export class EmergencyAllowanceComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;
  model: EmergencyAllowance = {};
  id: string;
  isEdit: boolean = false;
  descriptionTypeIsAdmin: boolean = false;
  descriptionTypeIsLocation: boolean = true;
  emergencyAllowanceDescriptionTypes: any[];
  allowanceTypes: any[];
  locations: any[];
  adminLevels: any[];
  url = 'EmergencyAllowances/GetAllPaged';
  get Service(): EmergencyAllowancesService { return Shell.Injector.get(EmergencyAllowancesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmergencyAllowanceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getLookups();

    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      if (this.model.descriptionTypeId.toString() === EmergencyAllowanceDescriptionTypeEnum.AdministrativeLevel) {
        this.descriptionTypeIsAdmin = true;
        this.descriptionTypeIsLocation = false;
      }
    }

    this.form = this.resetForm(this.model);
    this.getSelectedDescriptionType(this.form.value.descriptionTypeId.toString(), 'initilize');
  }

  resetForm(model: EmergencyAllowance): any {
    let descriptionTypeId = this.descriptionTypeIsLocation ?  EmergencyAllowanceDescriptionTypeEnum.Location :EmergencyAllowanceDescriptionTypeEnum.AdministrativeLevel;
    let resetForm = this.fb.group({
      id: [model.id],
      descriptionId: [model.descriptionId, Validators.required],
      descriptionTypeId: [descriptionTypeId, Validators.required],
      allowanceTypeId: [model.allowanceTypeId, Validators.required],
      startDate: [model.startDate, Validators.required],
      endDate: [model.endDate, Validators.required],
      note: [model.note]
    });    
    return resetForm;
  }
  getSelectedDescriptionType(id: string, type?: string) {
    this.form.controls['descriptionId'].setValue(this.isNew ? null :this.model.descriptionId);
    if (this.isNew || type == 'initilize') {
      if (id === EmergencyAllowanceDescriptionTypeEnum.AdministrativeLevel) {
        this.descriptionTypeIsAdmin = true;
        this.descriptionTypeIsLocation = false;
      }
      if (id === EmergencyAllowanceDescriptionTypeEnum.Location) {
        this.descriptionTypeIsAdmin = false;
        this.descriptionTypeIsLocation = true;
      }
    }
  }

  getLookups(): void {
    this.Service.getLookup()
      .subscribe(data => {
        this.allowanceTypes = data[0];
        this.emergencyAllowanceDescriptionTypes = data[1];
        this.adminLevels = data[2];
        this.locations = data[3];
      });
  }
  ngOnInit() {
  }

  onAddSave(event) {
    let newForm = this.resetForm(new EmergencyAllowance());     
    newForm.controls['descriptionTypeId'].setValue(EmergencyAllowanceDescriptionTypeEnum.Location);
    super.close(event, newForm);
    if (event.buttonType === 'Save') {
      this.isNew = true;
      this.getSelectedDescriptionType(EmergencyAllowanceDescriptionTypeEnum.Location, 'initilize');
    }

  }

  setEndDate() {
    let startDate = this.form.value.startDate;
    if (startDate != null) {
      let start = moment.parseZone(startDate);
      this.form.controls['endDate'].setValue(start);
    }
  }


}
