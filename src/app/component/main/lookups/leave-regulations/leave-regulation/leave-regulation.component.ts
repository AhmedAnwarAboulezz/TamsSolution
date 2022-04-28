import { AttachmentsType } from './../../../../../models/AttachmentsType';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { LeaveRegulation } from '../../../../../models/LeaveRegulation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { Leavestype } from 'src/app/models/Leavestype';
import { Gender as GenderEnum } from 'src/app/enums/Gender';
import { Gender } from 'src/app/models/Gender';
import { Religion } from 'src/app/models/Religion';
import { LeaveRegulationCalculation } from 'src/app/models/LeaveRegulationCalculation';
import { LeaveRegulationBalance } from 'src/app/models/LeaveRegulationBalance';
import { BalancePeriod } from 'src/app/enums/LeaveRegulationBalancePeriod';
import { JobDegreeValidators } from '../leave-regulation-balance/leave-regulation-balance.component';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { LeaveRegulationsService } from '../service/leave-regulations';
import { Shell } from 'src/app/component/shell';
import { LogDetailsComponent } from '../../../permissions/employee-permissions/log-details/log-details.component';

@Component({
  selector: 'app-leave-regulation',
  templateUrl: './leave-regulation.component.html',
  styleUrls: ['./leave-regulation.component.scss']
})
export class LeaveRegulationComponent extends BaseEditComponent implements OnInit {
  model: LeaveRegulation = {};
  id: string;
  url = 'LeaveRegulations/GetAllPaged';
  get Service(): LeaveRegulationsService { return Shell.Injector.get(LeaveRegulationsService); }
  countries: Country[];
  leavesTypes: Leavestype[];
  genders: Gender[];
  religions: Religion[];
  attachmentsTypes: AttachmentsType[];
  form: FormGroup;
  leaveRegulationCalculationForm: FormGroup;
  leaveRegulationBalanceForm: FormGroup;
  leaveRegulationBalanceJobDegrees: FormArray;
  initialPeriods = [
    { BalancePeriodId: BalancePeriod.P100, from: 0, to: 0 },
    { BalancePeriodId: BalancePeriod.P75, from: 0, to: 0 },
    { BalancePeriodId: BalancePeriod.P50, from: 0, to: 0 },
    { BalancePeriodId: BalancePeriod.P25, from: 0, to: 0 },
    { BalancePeriodId: BalancePeriod.P0, from: 0, to: 0 },
  ];
  currentLeaveTypeId :number;
  isSelectLeave:boolean;
  constructor(
    public dialogRef: MatDialogRef<LeaveRegulationComponent>,
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) leaveRegulation: LeaveRegulation) {
    super(dialogRef);
    this.getLookups();
    if (leaveRegulation) {
      this.model = leaveRegulation;
      this.isNew = false;
      this.isSelectLeave =true;
    }else
    {
      this.model.active=true;
    }

    // convert the genderId from number to array (for the multiselect)
    if (this.model.genderId && typeof this.model.genderId === 'string') {
      if (this.model.genderId == GenderEnum.Both) {
        this.model.genderId = [GenderEnum.Male, GenderEnum.Female];
      } else {
        this.model.genderId = [this.model.genderId];
      }
    }

    if (this.model.leaveRegulationReligions !== undefined &&
      this.model.leaveRegulationReligions.some(e => typeof e === 'object')) {

      this.model.leaveRegulationReligions = this.model.leaveRegulationReligions.map(({ religionId }: any) => (religionId));

    }



    if (!this.model.leaveRegulationCalculation) {
      this.model.leaveRegulationCalculation = new LeaveRegulationCalculation();
    }

    if (!this.model.leaveRegulationBalance) {
      this.model.leaveRegulationBalance = new LeaveRegulationBalance();
    }

    if (this.model.leaveRegulationCalculation.leaveRegulationLeavesType !== undefined &&
      this.model.leaveRegulationCalculation.leaveRegulationLeavesType.some(e => typeof e === 'object')) {

      this.model.leaveRegulationCalculation.leaveRegulationLeavesType = this.model.leaveRegulationCalculation.leaveRegulationLeavesType.map(({ leaveTypeId }: any) => (leaveTypeId));

    }
    this.currentLeaveTypeId=this.model.leaveTypeId;
    this.form = fb.group({
      id: [this.model.id],
      leaveTypeId: [this.model.leaveTypeId, Validators.required],
      countryId: [this.model.countryId, Validators.required],
      leaveNameFl: [this.model.leaveNameFl, Validators.required],
      leaveNameSl: [this.model.leaveNameSl],
      genderId: [this.model.genderId, Validators.required],
      leaveRegulationReligions: [this.model.leaveRegulationReligions, Validators.required],

      isSpecialToGeneralManager: [this.model.isSpecialToGeneralManager ? this.model.isSpecialToGeneralManager : false],
      isNeedApproval: [this.model.isNeedApproval ? this.model.isNeedApproval : false],
      isRelatedToSalary: [this.model.isRelatedToSalary ? this.model.isRelatedToSalary : false],
      isAllowedUnPaid: [this.model.isAllowedUnPaid ? this.model.isAllowedUnPaid : false],
      active: [this.model.active != null ? this.model.active : false],

      isOfferedBefore :[this.model.isOfferedBefore ? this.model.isOfferedBefore : false] ,   
      numberOfferedBefore: [this.model.numberOfferedBefore ? this.model.numberOfferedBefore : 0],

      calculateAfterDays: [this.model.calculateAfterDays ? this.model.calculateAfterDays : 0, Validators.required],
      attachmentsTypeId: [this.model.attachmentsTypeId],

    });
    let validationIndexes = ['leaveNameFl', 'leaveNameSl'];
    validationIndexes.forEach((element, i) => {
       this.form.controls[element].setValidators([this.isExistValidator(this.form.controls[element], i),this.removeSpaces]);
    });

    this.leaveRegulationCalculationForm = this.fb.group({
      leaveRegulationId: [this.model.id],
      balanceCaluculationWayId: [this.model.leaveRegulationCalculation.balanceCaluculationWayId, Validators.required],
      canHaveAnotherLeaveAfter: [this.model.leaveRegulationCalculation.canHaveAnotherLeaveAfter ?
        this.model.leaveRegulationCalculation.canHaveAnotherLeaveAfter : false],
      canHaveAnotherLeaveBefore: [this.model.leaveRegulationCalculation.canHaveAnotherLeaveBefore ?
        this.model.leaveRegulationCalculation.canHaveAnotherLeaveBefore : false],
      canHaveAnotherLeaveInside: [this.model.leaveRegulationCalculation.canHaveAnotherLeaveInside ?
        this.model.leaveRegulationCalculation.canHaveAnotherLeaveInside : false],
      isCalculateWeekend: [this.model.leaveRegulationCalculation.isCalculateWeekend ?
        this.model.leaveRegulationCalculation.isCalculateWeekend : false],
      isCalculateRestday: [this.model.leaveRegulationCalculation.isCalculateRestday ?
        this.model.leaveRegulationCalculation.isCalculateRestday : false],
      isCalculateHoliday: [this.model.leaveRegulationCalculation.isCalculateHoliday ?
        this.model.leaveRegulationCalculation.isCalculateHoliday : false],
      leaveRegulationLeavesType: [this.model.leaveRegulationCalculation.leaveRegulationLeavesType],

    }, {
      validator: (group) => {
        if (group.controls.canHaveAnotherLeaveInside.value === true) {
          return Validators.required((group.controls.leaveRegulationLeavesType));
        }
        return null;
      }
    });


    let leavePeriods = this.model.leaveRegulationBalance.leaveRegulationBalancePeriods;

    this.leaveRegulationBalanceForm = this.fb.group({
      leaveRegulationId: [this.model.id],
      balanceType: [this.model.leaveRegulationBalance.balanceType, Validators.required],

      balancePerYear: [this.model.leaveRegulationBalance.balancePerYear, Validators.required],
      leaveRegulationBalanceJobDegrees: this.getFormArray(this.model.leaveRegulationBalance.leaveRegulationBalanceJobDegrees),

      maxNumberOfDaysPerYear: [this.model.leaveRegulationBalance.maxNumberOfDaysPerYear ?
        this.model.leaveRegulationBalance.maxNumberOfDaysPerYear : 0, Validators.required],
      continousNumberOfDays: [this.model.leaveRegulationBalance.continousNumberOfDays ?
        this.model.leaveRegulationBalance.continousNumberOfDays : 0, Validators.required],
      hasNumberOfTimesPerYear: [this.model.leaveRegulationBalance.hasNumberOfTimesPerYear ?
        this.model.leaveRegulationBalance.hasNumberOfTimesPerYear : false],
      timesPerYear: [this.model.leaveRegulationBalance.timesPerYear ?
        this.model.leaveRegulationBalance.timesPerYear : 0],
      isBalanceFixed: [this.model.leaveRegulationBalance.isBalanceFixed ?
        this.model.leaveRegulationBalance.isBalanceFixed : false],
      isFinanciallyRelated: [this.model.leaveRegulationBalance.isFinanciallyRelated ?
        this.model.leaveRegulationBalance.isFinanciallyRelated : false],
      hasNumberOfTimesPerService: [this.model.leaveRegulationBalance.hasNumberOfTimesPerService ?
        this.model.leaveRegulationBalance.hasNumberOfTimesPerService : false],
      numberOfTimesPerService: [this.model.leaveRegulationBalance.numberOfTimesPerService ?
        this.model.leaveRegulationBalance.numberOfTimesPerService : 0],
      isRemainingDaysTransfared: [this.model.leaveRegulationBalance.isRemainingDaysTransfared ?
        this.model.leaveRegulationBalance.isRemainingDaysTransfared : false],
      numberOfRemainingDaysTransfared: [this.model.leaveRegulationBalance.numberOfRemainingDaysTransfared ?
        this.model.leaveRegulationBalance.numberOfRemainingDaysTransfared : 0],
      leaveRegulationBalancePeriods: leavePeriods && Array.isArray(leavePeriods) && leavePeriods.length ?
        this.getFormArray(this.model.leaveRegulationBalance.leaveRegulationBalancePeriods) : this.getFormArray(this.initialPeriods),
    });
  }

  ngOnInit() {

  }

  save() {
    let data = this.form.value;
    data.LeaveRegulationCalculation = this.leaveRegulationCalculationForm.value;

    data.LeaveRegulationBalance = this.leaveRegulationBalanceForm.value;
    data.leaveRegulationReligions = data.leaveRegulationReligions.filter(e => e != 0);
    if (data.LeaveRegulationCalculation.leaveRegulationLeavesType !== undefined
      && data.LeaveRegulationCalculation.leaveRegulationLeavesType !== null) {
      data.LeaveRegulationCalculation.leaveRegulationLeavesType = 
      data.LeaveRegulationCalculation.leaveRegulationLeavesType.filter(e => e != 0);
    }

    let balanceType = data.LeaveRegulationBalance.balanceType;
    if (balanceType == 1) {
      data.LeaveRegulationBalance.leaveRegulationBalanceJobDegrees = null;
      data.LeaveRegulationBalance.leaveRegulationBalancePeriods = null;

    } else if (balanceType == 2) {
      data.LeaveRegulationBalance.leaveRegulationBalanceJobDegrees = null;
      data.LeaveRegulationBalance.balancePerYear = null;
    } else {
      data.LeaveRegulationBalance.leaveRegulationBalancePeriods = null;
      data.LeaveRegulationBalance.balancePerYear = null;
    }

    let result;
    if (data && data !== '') {
      if (data.id) {
        result = this.edit(data);
      } else {
        result = this.add(data);
      }

    }
  }

  add(leaveRegulation) {

    if (leaveRegulation && leaveRegulation !== '') {
      // the genderId by default is array because it's multiselect dropdown, we change it to normal object
      if (leaveRegulation.genderId) {
        if (leaveRegulation.genderId.length > 1) {
          leaveRegulation.genderId = GenderEnum.Both;
        } else {
          leaveRegulation.genderId = leaveRegulation.genderId.toString();
        }
      }

      if (leaveRegulation.leaveRegulationReligions !== undefined) {
        if (leaveRegulation.leaveRegulationReligions[0].religionId != null) {
        } else {
          let list: number[] = leaveRegulation.leaveRegulationReligions;
          leaveRegulation.leaveRegulationReligions = list.map((e: any) => ({ religionId: e, leaveRegulationId: leaveRegulation.id }));
        }
      }


      if (leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType !== undefined
        && leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType !== null) {
        if (leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType[0].leaveTypeId != null) {
        } else {
          leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType =
            leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType.
              map((e: any) => ({ leaveTypeId: e, leaveRegulationCalculationId: leaveRegulation.LeaveRegulationCalculation.id }));

        }
      }
    }
    console.log(leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType)

    super.close({ form: leaveRegulation, buttonType: 'SaveClose' });

  }

  edit(leaveRegulation) {
    if (leaveRegulation && leaveRegulation !== '') {
      // the genderId by default is array because it's multiselect dropdown, we change it to normal object
      if (leaveRegulation.genderId) {
        if (leaveRegulation.genderId.length > 1) {
          leaveRegulation.genderId = GenderEnum.Both;
        } else {
          leaveRegulation.genderId = leaveRegulation.genderId.toString();
        }
      }

      if (leaveRegulation.leaveRegulationReligions !== undefined) {
        if (leaveRegulation.leaveRegulationReligions[0].religionId != null) {
        } else {
          leaveRegulation.leaveRegulationReligions = leaveRegulation.leaveRegulationReligions
            .map((e: any) => ({ religionId: e, leaveRegulationId: leaveRegulation.id }));
        }
      }

      if (leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType !== undefined
        && leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType !== null
        && leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType.length !== 0) {
        if (leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType[0].leaveTypeId != null) {
        } else {
          leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType =
            leaveRegulation.LeaveRegulationCalculation.leaveRegulationLeavesType.
              map((e: any) => ({ leaveTypeId: e, leaveRegulationCalculationId: leaveRegulation.LeaveRegulationCalculation.id }));

        }
      }


    }
    super.close({ form: leaveRegulation, buttonType: 'SaveClose' });

  }
  getLookups() {
    this.Service.getLookup().subscribe(data => {
      this.countries = data[0];
      this.leavesTypes = data[1];
      this.genders = data[2];
      this.religions = data[3];
      this.attachmentsTypes = data[4];
    });
  }

  getFormArray(list): FormArray {

    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    }
    for (let item of list) {
      array.push(this.fb.group(item));
    }

    return array;
  }

  addItem() {
    this.leaveRegulationBalanceJobDegrees = this.leaveRegulationBalanceForm.get('leaveRegulationBalanceJobDegrees') as FormArray;
    this.leaveRegulationBalanceJobDegrees.push(this.createItem());
  }

  removeItem(index) {
    this.leaveRegulationBalanceJobDegrees = this.leaveRegulationBalanceForm.get('leaveRegulationBalanceJobDegrees') as FormArray;
    this.leaveRegulationBalanceJobDegrees.removeAt(index);
  }

  createItem() {
    return this.fb.group({
      leaveRegulationBalanceId: [this.model.leaveRegulationBalance.id],
      jobDegreeId: ['', Validators.required, JobDegreeValidators.shouldBeUnique],
      numberOfDays: ['', Validators.required]
    });
  }

  toggleAllSelection(selected) {
    if (selected) {
      this.form.controls.leaveRegulationReligions
        .patchValue([...this.religions.map(item => item.id), 0]);
    } else {
      this.form.controls.leaveRegulationReligions.patchValue([]);
    }
  }
  toggleUnSelectAll(selected)
  {
    var selectedItems= this.form.controls.leaveRegulationReligions.value.filter(e => e != 0);
    this.form.controls.leaveRegulationReligions.patchValue(selectedItems);

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


  changeFlage(){
    this.isSelectLeave =false;
    this.currentLeaveTypeId=this.form.controls.leaveTypeId.value;
        setTimeout(()=>{                          
          this.isSelectLeave =true;
        }, .25000);

  }
  public isExistValidator(control: AbstractControl, type: any) : ValidatorFn{
    
    return (group: FormGroup): ValidationErrors => {
       if(control.value != null && control.value){
         const values = (): LeaveRegulation => ({
          leaveNameFl: type == 0 ? control.value : null,
          leaveNameSl: type == 1 ? control.value :null,
          countryId: this.form.value.countryId,
          id: this.form.value.id
         });         
        this.Service.isExist(values()).subscribe(data => {
            if (data) {
                control.setErrors({notEquivalent: true});
            } else {
                control.setErrors(null);
            }                     
        });
       }
       else{
        control.setErrors({required: true });
       }
       return;
 };
}
}
