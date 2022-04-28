import { ContractType } from 'src/app/models/contracttype';
import { DeductionGroupType } from './../../../../../models/DeductionGroupType';
import { DeductionCategory } from './../../../../../models/DeductionCategory';
import { LateRegulation } from './../../../../../models/LateRegulation';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { DeductionUnit } from './../../../../../models/DeductionUnit';
import { DeductionCategoreEnum } from 'src/app/enums/DeductionCategoreEnum';
import { DeductionGroupTypeEnum } from 'src/app/enums/DeductionGroupTypeEnum';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { LateRegulationsService } from '../Services/late-regulations.services';
import { lateRegulationDeduction } from 'src/app/models/lateRegulationDeduction';
import { lateRegulationContractType } from 'src/app/models/lateRegulationContractType';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { Employee } from 'src/app/models/employee';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-late-regulation',
  templateUrl: './late-regulation.component.html',
  styleUrls: ['./late-regulation.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class LateRegulationComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;

  get Service(): LateRegulationsService { return Shell.Injector.get(LateRegulationsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<LateRegulationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.lookups();
    if (this.data) {
      this.model = this.data[0];
      this.isViewDetils = this.data[1];
      this.isNew = false;
    } else {
      this.model.allowance = 0;
    }
    let deductionGroupTypeId = this.model.deductionGroupTypeId != undefined ?
      this.model.deductionGroupTypeId : DeductionGroupTypeEnum.Contracts;

    let deductionCategoreID =
      this.model.lateRegulationDeductions != null && this.model.lateRegulationDeductions.length > 0 ?
        this.model.lateRegulationDeductions[0].deductionCategoryId : DeductionCategoreEnum.Multiplier;
    this.form = this.resetForm(this.model);
    this.getSelectedDeductionGroupTypes(deductionGroupTypeId.toString());
    this.getSelectedDeductionCategory(deductionCategoreID.toString());

    let validationIndexes = ['lateRegulationNameFL', 'lateRegulationNameSL'];
    validationIndexes.forEach((element, i) => {
      this.form.controls[element].setValidators(this.isExistValidator(this.form.controls[element], i));
    });
  }
  model: LateRegulation = {};
  isViewDetils = false;
  id: string;
  url = 'LateRegulations/GetAllPaged';
  deductionGroupTypes: DeductionGroupType[];
  deductionCategories: DeductionCategory[];
  deductionUnits: DeductionUnit[];
  contractTypes: ContractType[];
  deductionCategoriesMultiplier: boolean;
  deductionCategoriesPeriod: boolean;
  deductionGroupTypesContracts: boolean;
  deductionGroupTypesAllEmployees: boolean;
  deductionGroupTypesOldEmployees: boolean;
  quarterDayFromValue = 0;
  quarterDayToValue = 0;
  halfDayToValue = 0;
  threeQuarterDayToValue = 0;
  fullDayToValue = 0;
  validatorDeductionGroupInputs = ['lateRegulationContractTypes', 'lengthOfServiceFrom', 'lengthOfServiceTo'];
  validatorDeductionCategoryInputs = ['lateBalance', 'deductionUnitID', 'quarterDayFrom', 'quarterDayTo', 'halfDayFrom', 'halfDayTo',
    'threeQuarterDayFrom', 'threeQuarterDayTo', 'fullDayFrom', 'fullDayTo'];

  ngOnInit() {

  }
  checklateBalance(){
   if (this.form.get('lateBalance').value <=0  )
   this.form.controls['lateBalance'].setValidators(Validators.min(1));

  }
  resetForm(model: LateRegulation): any {
    let deductionGroupTypeId = model.deductionGroupTypeId != undefined ? model.deductionGroupTypeId : DeductionGroupTypeEnum.Contracts;

    let deductionCategoreID =
      model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 0 ?
        model.lateRegulationDeductions[0].deductionCategoryId : DeductionCategoreEnum.Multiplier;

    let result = this.fb.group({
      id: [model.id],
      startDate: new FormControl(this.SetDate(moment(model.startDate), 1), Validators.required),
      endDate: new FormControl(this.SetDate(moment(model.endDate), 2), Validators.required),
      deductionGroupTypeId: [deductionGroupTypeId, Validators.required],
      deductionCategoreID: [deductionCategoreID, Validators.required],
      deductionUnitID: [(model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 0) ?
        model.lateRegulationDeductions[0].deductionUnitId : null],
      lateBalance: [(model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 0) ?
        model.lateRegulationDeductions[0].lateBalance : null],
      note: [model.note],
      lateRegulationNameFL: [model.lateRegulationNameFL, Validators.required],
      lateRegulationNameSL: [model.lateRegulationNameSL],
      allowance: [model.allowance, Validators.required],
      quarterDayFrom: [(model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 1) ?
        model.lateRegulationDeductions[0].lateFrom : null],
      quarterDayTo: [(model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 1) ?
        model.lateRegulationDeductions[0].lateTo : null],
      halfDayFrom: [(model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 1) ?
        model.lateRegulationDeductions[1].lateFrom : null],
      halfDayTo: [(model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 1) ?
        model.lateRegulationDeductions[1].lateTo : null],
      threeQuarterDayFrom: [(model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 1) ?
        model.lateRegulationDeductions[2].lateFrom : null],
      threeQuarterDayTo: [(model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 1) ?
        model.lateRegulationDeductions[2].lateTo : null],
      fullDayFrom: [(model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 1) ?
        model.lateRegulationDeductions[3].lateFrom : null],
      fullDayTo: [(model.lateRegulationDeductions != null && model.lateRegulationDeductions.length > 1) ?
        model.lateRegulationDeductions[3].lateTo : null],
      lengthOfServiceFrom: [model.lengthOfServiceFrom],
      lengthOfServiceTo: [model.lengthOfServiceTo],
      lateRegulationContractTypes: [(model.lateRegulationContractTypes != null && model.lateRegulationContractTypes.length > 0) ?
        model.lateRegulationContractTypes.map(element => element.contractTypeId) : null]
    });

    return result;
  }
  getSelectedDeductionCategory(id) {
    if (id == DeductionCategoreEnum.Multiplier) {
      this.deductionCategoriesMultiplier = true;
      this.deductionCategoriesPeriod = false;
      this.updateValidators(['deductionUnitID', 'lateBalance'], this.validatorDeductionCategoryInputs);
    } else if (id == DeductionCategoreEnum.Period) {
      this.deductionCategoriesPeriod = true;
      this.deductionCategoriesMultiplier = false;
      this.updateValidators(['quarterDayFrom', 'quarterDayTo', 'halfDayFrom', 'halfDayTo', 'threeQuarterDayFrom',
        'threeQuarterDayTo', 'fullDayFrom', 'fullDayTo'], this.validatorDeductionCategoryInputs);
    }
  }
  getSelectedDeductionGroupTypes(id) {
    if (id == DeductionGroupTypeEnum.Contracts) {
      this.deductionGroupTypesContracts = true;
      this.deductionGroupTypesAllEmployees = false;
      this.deductionGroupTypesOldEmployees = false;
      this.updateValidators(['lateRegulationContractTypes'], this.validatorDeductionGroupInputs);
    } else if (id == DeductionGroupTypeEnum.AllEmployees) {
      this.deductionGroupTypesContracts = false;
      this.deductionGroupTypesAllEmployees = true;
      this.deductionGroupTypesOldEmployees = false;
      this.updateValidators([], this.validatorDeductionGroupInputs);
    } else if (id == DeductionGroupTypeEnum.OldEmployees) {
      this.deductionGroupTypesContracts = false;
      this.deductionGroupTypesAllEmployees = false;
      this.deductionGroupTypesOldEmployees = true;
      this.updateValidators(['lengthOfServiceFrom', 'lengthOfServiceTo'], this.validatorDeductionGroupInputs);
    }
  }

  onQuarterDayFromChange(value) {
    let val = Number(value);
    if (val > 0) {
      this.quarterDayFromValue = val;

    } else {
      this.form.controls['quarterDayTo'].setValue(null);
    }
  }
  onQuarterDayToChange(value) {
    this.form.controls['halfDayTo'].setValue(null);
    this.form.controls['threeQuarterDayTo'].setValue(null);
    this.form.controls['fullDayTo'].setValue(null);
    let val = Number(value);
    if ((val > 0) && (this.quarterDayFromValue > 0) && (val > this.quarterDayFromValue)) {
      this.quarterDayToValue = val + 1;
      this.form.controls['halfDayFrom'].setValue(val + 1);
    } else {
      this.form.controls['halfDayFrom'].setValue(null);
    }
  }
  onHalfDayToChange(value) {
    this.form.controls['threeQuarterDayTo'].setValue(null);
    this.form.controls['fullDayTo'].setValue(null);
    let val = Number(value);
    if ((val > 0) && (this.quarterDayFromValue > 0) && (this.quarterDayToValue > 0)
      && (val > this.quarterDayToValue)) {
      this.halfDayToValue = val + 1;
      this.form.controls['threeQuarterDayFrom'].setValue(val + 1);
    } else {
      this.form.controls['threeQuarterDayFrom'].setValue(null);
    }
  }
  onThreeQuarterDayToChange(value) {
    this.form.controls['fullDayTo'].setValue(null);
    let val = Number(value);
    if ((val > 0) && (this.quarterDayFromValue > 0) && (this.quarterDayToValue > 0)
      && (this.halfDayToValue > 0) && (val > this.halfDayToValue)) {
      this.threeQuarterDayToValue = val + 1;
      this.form.controls['fullDayFrom'].setValue(val + 1);
    } else {
      this.form.controls['fullDayFrom'].setValue(null);
    }
  }
  onFullDayToChange(value) {
    let val = Number(value);
    if (!((val > 0) && (val > this.threeQuarterDayToValue))) {

      this.form.controls['fullDayTo'].setValidators(Validators.min(this.threeQuarterDayToValue + 1));
    }
  }

  MapFormAndDto(NewForm, NewModel) {
    NewModel.id = NewForm.id;
    NewModel.lateRegulationNameFL = NewForm.lateRegulationNameFL;
    NewModel.lateRegulationNameSL = NewForm.lateRegulationNameSL;
    NewModel.startDate = moment.parseZone(NewForm.startDate);
    NewModel.endDate = moment.parseZone(NewForm.endDate);
    NewModel.allowance = NewForm.allowance;
    NewModel.note = NewForm.note;
    NewModel.deductionGroupTypeId = NewForm.deductionGroupTypeId;
    NewModel.deductionCategoreID = NewForm.deductionCategoreID;
    let lateContracts: lateRegulationContractType[] = [];
    if (NewForm.deductionGroupTypeId == DeductionGroupTypeEnum.Contracts) {
      NewForm.lateRegulationContractTypes.forEach(item => {
        let lateContract = new lateRegulationContractType();
        lateContract.contractTypeId = item;
        lateContract.lateRegulationId = this.model.id;
        lateContracts.push(lateContract);
      });
      NewModel.lateRegulationContractTypes = lateContracts;
    }
    if (NewForm.deductionGroupTypeId == DeductionGroupTypeEnum.OldEmployees) {
      NewModel.lengthOfServiceFrom = NewForm.lengthOfServiceFrom;
      NewModel.lengthOfServiceTo = NewForm.lengthOfServiceTo;
    }
    let lateDeductions: lateRegulationDeduction[] = [];
    if (NewForm.deductionCategoreID == DeductionCategoreEnum.Multiplier) {
      let lateDeduction = new lateRegulationDeduction();
      lateDeduction.lateBalance = NewForm.lateBalance;
      lateDeduction.deductionUnitId = NewForm.deductionUnitID;
      lateDeduction.deductionCategoryId = NewForm.deductionCategoreID;
      lateDeduction.lateRegulationId = this.model.id;
      lateDeductions.push(lateDeduction);
    }
    if (NewForm.deductionCategoreID == DeductionCategoreEnum.Period) {
      let lateDeduction1 = new lateRegulationDeduction();
      lateDeduction1.lateFrom = NewForm.quarterDayFrom;
      lateDeduction1.lateTo = NewForm.quarterDayTo;
      lateDeduction1.deductionUnitId = this.deductionUnits[0].id;
      lateDeduction1.deductionCategoryId = NewForm.deductionCategoreID;
      lateDeduction1.lateRegulationId = this.model.id;
      lateDeductions.push(lateDeduction1);
      let lateDeduction2 = new lateRegulationDeduction();
      lateDeduction2.lateFrom = NewForm.halfDayFrom;
      lateDeduction2.lateTo = NewForm.halfDayTo;
      lateDeduction2.deductionUnitId = this.deductionUnits[1].id;
      lateDeduction2.deductionCategoryId = NewForm.deductionCategoreID;
      lateDeduction2.lateRegulationId = this.model.id;
      lateDeductions.push(lateDeduction2);
      let lateDeduction3 = new lateRegulationDeduction();
      lateDeduction3.lateFrom = NewForm.threeQuarterDayFrom;
      lateDeduction3.lateTo = NewForm.threeQuarterDayTo;
      lateDeduction3.deductionUnitId = this.deductionUnits[2].id;
      lateDeduction3.deductionCategoryId = NewForm.deductionCategoreID;
      lateDeduction3.lateRegulationId = this.model.id;
      lateDeductions.push(lateDeduction3);
      let lateDeduction4 = new lateRegulationDeduction();
      lateDeduction4.lateFrom = NewForm.fullDayFrom;
      lateDeduction4.lateTo = NewForm.fullDayTo;
      lateDeduction4.deductionUnitId = this.deductionUnits[3].id;
      lateDeduction4.deductionCategoryId = NewForm.deductionCategoreID;
      lateDeduction4.lateRegulationId = this.model.id;
      lateDeductions.push(lateDeduction4);
    }
    NewModel.lateRegulationDeductions = lateDeductions;
    return NewModel;
  }
  onAddSave(event: any) {
    let NewForm = event.form;
    if (NewForm.lateRegulationContractTypes != null) {
      NewForm.lateRegulationContractTypes = NewForm.lateRegulationContractTypes.filter(e => e != 0);
    }
    let NewModel = new LateRegulation();
    let ResultDto = this.MapFormAndDto(NewForm, NewModel);
    event.form = ResultDto;
    this.close(event, this.resetForm(new LateRegulation()));
  }

  updateValidators(setList: string[], validateList: string[]) {
    let removedList = validateList.filter(item1 => !setList.some(item2 => (item2 === item1)));
    removedList.forEach(item => {
      this.removeRequired(item);
    });
    setList.forEach(item => {
      this.setRequired(item);
    });
  }
  setRequired(columnName: string) {
    this.form.controls[columnName].setValidators([Validators.required]);
    this.form.controls[columnName].updateValueAndValidity();
  }
  removeRequired(columnName: string) {
    this.form.controls[columnName].clearValidators();
    this.form.controls[columnName].updateValueAndValidity();
  }

  toggleAllSelection(selected) {
    if (selected) {
      this.form.controls.lateRegulationContractTypes.patchValue([...this.contractTypes.map(item => item.id), 0]);
    } else {
      this.form.controls.lateRegulationContractTypes.patchValue([]);
    }
  }

  toggleUnSelectAll(selected)
  {
    var selectedItems= this.form.controls.lateRegulationContractTypes.value.filter(e => e != 0);
    this.form.controls.lateRegulationContractTypes.patchValue(selectedItems);

  }
  checkAllContracts() {
    if (this.data && this.form.controls.lateRegulationContractTypes.value) {
      if (this.form.controls.lateRegulationContractTypes.value.length == this.contractTypes.length) {
        this.form.controls.lateRegulationContractTypes.patchValue([...this.contractTypes.map(item => item.id), 0]);
      }
    }
  }
  lookups(): void {
    this.Service.getLookups().subscribe((data: any) => {
      this.deductionGroupTypes = data[0];
      this.contractTypes = data[1];
      this.deductionCategories = data[2];
      this.deductionUnits = data[3];
      this.checkAllContracts();
    });
  }

  chosenYearHandler(normalizedYear: Moment, type) {
    const ctrlValue = type === 1 ? this.form.controls.startDate.value : this.form.controls.endDate.value;
    ctrlValue.year(normalizedYear.year());
    if (type === 1) {
      this.form.controls.startDate.setValue(ctrlValue);
    } else if (type === 2) {
      this.form.controls.endDate.setValue(ctrlValue);
    }
  }
  monthCalc(normalizedMonth: Moment, type) {
    const ctrlValue = type === 1 ? this.form.controls.startDate.value : this.form.controls.endDate.value;
    ctrlValue.month(normalizedMonth.month());
    if (type === 1) {
      ctrlValue.date(1);
      this.form.controls.startDate.setValue(ctrlValue);
    } else if (type === 2) {
      ctrlValue.date(new Date(ctrlValue.year(), ctrlValue.month() + 1, 0).getDate());
      this.form.controls.endDate.setValue(ctrlValue);
    }
  }
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, type) {
    this.monthCalc(normalizedMonth, type);
    datepicker.close();
  }
  customeEndHandler(input) {
    let value = input.target.value.split('/');
    const ctrlValue = this.form.controls.endDate.value;
    let month = value[0];
    let year = value[1];
    let date = moment.parseZone(new Date(year, month, 0).getDate());
    ctrlValue.date(date);
    console.log(this.form.controls.endDate);
  }
  SetDate(date, type) {
    if (type === 1) {
      date.date(1);
    } else if (type === 2) {
      date.date(new Date(date.year(), date.month() + 1, 0).getDate());
    }
    return date;
  }

  public isExistValidator(control: AbstractControl, type: any): ValidatorFn {

    return (group: FormGroup): ValidationErrors => {
      if (control.value != null && control.value) {
        const values = (): LateRegulation => ({
          lateRegulationNameFL: type == 0 ? control.value : null,
          lateRegulationNameSL: type == 1 ? control.value : null,
          id: this.form.value.id
        });
        this.Service.isExist(values()).subscribe(data => {
          if (data) {
            control.setErrors({ notEquivalent: true });
          } else {
            control.setErrors(null);
          }
        });
      } else {
        control.setErrors({ required: true });
      }
      return;
    };
  }
}
