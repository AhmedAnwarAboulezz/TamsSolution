
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { PartialPermissionType } from '../../../../../models/PartialPermissionType';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { PartialPermissionTypesService } from '../Services/partial-permission-types.services';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-partial-permission-type',
  templateUrl: './partial-permission-type.component.html',
  styleUrls: ['./partial-permission-type.component.scss']
})


export class PartialPermissionTypeComponent extends BaseEditComponent implements OnInit {
  model: PartialPermissionType = {};
  countries: Country[];
  id: string;
  url = 'PartialPermissionTypes/GetAllPaged';
  get Service(): PartialPermissionTypesService { return Shell.Injector.get(PartialPermissionTypesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<PartialPermissionType>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.contry();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }else{
      this.model.active=true;
      this.model.numberPerMonth=0;
      this.model.period=0;
      this.model.balance=0;

    }
    this.form = this.resetForm(this.model);
    this.form.setValidators(this.comparisonValidator())
  }

  ngOnInit() {
  }

  setPeriod(balance,numberPerMonth){
    if(balance && numberPerMonth){
      let period =Math.floor(balance / numberPerMonth);
      if(period >= 1){
        this.form.controls['period'].setValue(period);  
      }
      else{
        this.form.controls['period'].setValue(0);  
      }
    }
  }
  onAddSave(event){
    this.close(event, this.resetForm(new PartialPermissionType()));
  }

  contry(): void {
    this.Service.getCountries().subscribe((data: any) => {
     this.countries = data;
    });
  }
  onCheckChange(event,value) {
    if (!event.checked) {
      if(value=='isOfferedBefore')
      {
        this.form.patchValue({
          numberOfferedBefore: 0
        });
      }
      
    }
  }
  public comparisonValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const period = group.controls['period'];
      const balance = group.controls['balance'];
      const numberPerMonth = group.controls['numberPerMonth'];

      if (period.value > (balance.value / numberPerMonth.value)) {
        period.setErrors({ notEquivalent: true });
      } else {
        period.setErrors(null);
      }
      return;
    };
  }

  resetForm(model:PartialPermissionType): any{
    let resetForm = this.fb.group({   
      id: [model.id],
      code: [model.code],
      partialPermissionFL: [model.partialPermissionFL, [Validators.required,this.removeSpaces]],
      partialPermissionSL: [model.partialPermissionSL,this.removeSpaces],
      countryId: [model.countryId, Validators.required],
      balance: [model.balance, Validators.required],
      numberPerMonth: [model.numberPerMonth, Validators.required],
      period: [model.period, Validators.required],
      calculatePermissionDutyAllowance: [model.calculatePermissionDutyAllowance != null ?
        model.calculatePermissionDutyAllowance : false],
      calculatePermissionDutyAllowanceCancelInRamadan: [model.calculatePermissionDutyAllowanceCancelInRamadan != null ?
        model.calculatePermissionDutyAllowanceCancelInRamadan : false],
      calculatePermissionEmployeeAllowances: [model.calculatePermissionEmployeeAllowances != null ?
        model.calculatePermissionEmployeeAllowances : false],
      calculatePermissionEmployeeAllowancesCancelInRamadan: [model.calculatePermissionEmployeeAllowancesCancelInRamadan!=null ?
        model.calculatePermissionEmployeeAllowancesCancelInRamadan : false],    
        active: [model.active != null ? model.active : false],
        isOfferedBefore :[model.isOfferedBefore ? this.model.isOfferedBefore : false] ,   
        numberOfferedBefore: [model.numberOfferedBefore ? this.model.numberOfferedBefore : 0],
    });
    return resetForm;
  }

}

