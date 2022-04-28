import { LeaveRegulationBalanceJobDegree } from './../../../../../models/LeaveRegulationBalance';
import { JobDegreeValidationService } from './../service/job-degree-validation.service';
import { JobDegree } from './../../../../../models/JobDegree';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormArray } from '@angular/forms';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { TranslateService } from '@ngx-translate/core';
import { WeekDays } from 'src/app/enums/WeekDays';
import { BalanceTypesEnum } from 'src/app/enums/BalanceTypesEnum';
import { BalancePeriod } from 'src/app/enums/LeaveRegulationBalancePeriod';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'leave-regulation-balance',
  templateUrl: './leave-regulation-balance.component.html',
  styleUrls: ['./leave-regulation-balance.component.scss']
})
export class LeaveRegulationBalanceComponent extends BaseComponent implements OnInit {

  @Input() leaveRegulationBalanceForm: FormGroup;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  balanceType;

  jobDegrees: JobDegree[];
  filteredJobDegrees: JobDegree[];
  salaries = [100, 75, 50, 25, 0];
  periodsArray;
  balanceTypes: newObject[] = [];
  validatorBalanceTypesInputs = ['balancePerYear'];
  initialPeriods = [
    { BalancePeriodId: BalancePeriod.P100, from: 0, to: 0 },
    { BalancePeriodId: BalancePeriod.P75, from: 0, to: 0 },
    { BalancePeriodId: BalancePeriod.P50, from: 0, to: 0 },
    { BalancePeriodId: BalancePeriod.P25, from: 0, to: 0 },
    { BalancePeriodId: BalancePeriod.P0, from: 0, to: 0 },
  ];

  constructor(translate: TranslateService) {
    super();
    for (let item of Object.keys(BalanceTypesEnum)) {
      let result;
      translate.get(`balanceTypes.${item}`).subscribe((text: string) => result = text)
      this.balanceTypes.push({ name: result, value: BalanceTypesEnum[item] });
    }
  }

  ngOnInit() {
    this.balanceType = this.leaveRegulationBalanceForm.value.balanceType != null ? this.leaveRegulationBalanceForm.value.balanceType.toString() : '1';
    this.onBalanceTypeChange(this.balanceType);
    this.getJobDegrees();
    this.periodsArray = this.leaveRegulationBalanceForm.value.leaveRegulationBalancePeriods;
  }

  onBalanceTypeChange(value) {

    switch (+value) {
      case 1: {
        this.setRequired('balancePerYear');
        this.removeRequired('leaveRegulationBalancePeriods');
        this.removeRequired('leaveRegulationBalanceJobDegrees');

        this.leaveRegulationBalanceForm.controls['leaveRegulationBalancePeriods'].patchValue(this.initialPeriods);
        this.clearJobDegreesArray();

        break;
      }
      case 2: {
        this.setRequired('leaveRegulationBalancePeriods');
        this.removeRequired('balancePerYear');
        this.removeRequired('leaveRegulationBalanceJobDegrees');
        
        this.clearJobDegreesArray();
        this.leaveRegulationBalanceForm.controls['balancePerYear'].setValue(0);
        break;
      }
      case 3: {
        this.setRequired('leaveRegulationBalanceJobDegrees');
        this.removeRequired('balancePerYear');
        this.removeRequired('leaveRegulationBalancePeriods');

        this.leaveRegulationBalanceForm.controls['leaveRegulationBalancePeriods'].patchValue(this.initialPeriods);
        this.leaveRegulationBalanceForm.controls['balancePerYear'].setValue(0);

        break;
      }
    }


  }

  onValueChange() {
    this.periodsArray = this.leaveRegulationBalanceForm.value.leaveRegulationBalancePeriods;

    for (let i = 0; i < this.periodsArray.length; i++) {

      if (i != 0) { // for the first one only
        this.periodsArray[i].from = (+this.periodsArray[i - 1].to) + 1;
      }

      if (this.periodsArray[i].to <= this.periodsArray[i].from) {
        this.periodsArray[i].to = (+this.periodsArray[i].from) + 1;
      }
    }

    this.leaveRegulationBalanceForm.controls['leaveRegulationBalancePeriods'].setValue(this.periodsArray);
  }

  onJobDegreeSelectionChange() {
    JobDegreeValidationService._selectedJobDegreeId =
      this.leaveRegulationBalanceForm.controls.leaveRegulationBalanceJobDegrees.value;
  }

  getJobDegrees() {
    this.service.getList(this.APIs.init('JobDegrees').GetAllForSelect)
      .subscribe(jobDegrees => {
        this.jobDegrees = jobDegrees;
      });
  }

  addItem() {
    this.add.emit();
  }

  removeItem(index) {
    this.remove.emit(index);
  }

  setRequired(columnName: string) {
    this.leaveRegulationBalanceForm.controls[columnName].setValidators([Validators.required])
    this.leaveRegulationBalanceForm.controls[columnName].updateValueAndValidity();
  }
  removeRequired(columnName: string) {
    this.leaveRegulationBalanceForm.controls[columnName].clearValidators()
    this.leaveRegulationBalanceForm.controls[columnName].updateValueAndValidity();
  }

  clearJobDegreesArray() {
    let length = (this.leaveRegulationBalanceForm.get('leaveRegulationBalanceJobDegrees') as FormArray).length;

    for (let i = 0; i < length; i++) {
      this.removeItem(0);
    }
  }
  onCheckChange(event,value) {
    if (!event.checked) {
      if(value=='isRemainingDaysTransfared')
      {
        this.leaveRegulationBalanceForm.patchValue({
          numberOfRemainingDaysTransfared: 0
        });
      }
      if(value=='hasNumberOfTimesPerYear')
      {
      this.leaveRegulationBalanceForm.patchValue({
        timesPerYear: 0
      });
    }
    }
  }
}

export class JobDegreeValidators {
  static shouldBeUnique(control: AbstractControl) {
    let jobDegrees = control.value as any[];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let test = JobDegreeValidationService._selectedJobDegreeId as any[];

        if (test.filter(e => e.jobDegreeId == jobDegrees).length > 1) {
          resolve({ shouldBeUnique: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });

  }
}

interface newObject {
  name;
  value;
}
