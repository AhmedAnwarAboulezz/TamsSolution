import { Component, OnInit, Inject, Optional } from '@angular/core';
import { PreviousLeaveBalance } from '../../../../../models/previousLeaveBalance';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Employee } from 'src/app/models/employee';
import { LeaveRegulation } from 'src/app/models/LeaveRegulation';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { PreviousLeavesBalancesService } from '../services/previous-leaves-balances.service';
import { Shell } from 'src/app/component/shell';
import { LeaveRegulationBalance } from 'src/app/models/LeaveRegulationBalance';
import { TouchSequence } from 'selenium-webdriver';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-previous-leave-balance',
  templateUrl: './previous-leave-balance.component.html',
  styleUrls: ['./previous-leave-balance.component.scss']
})

export class PreviousLeaveBalanceComponent extends BaseEditComponent implements OnInit {
  employees: Employee[];
  leaves: LeaveRegulation[];
  leaveRegulationbalance: LeaveRegulationBalance;
  model: PreviousLeaveBalance = {};
  years = [];
  id: string;
  url = 'PreviousLeavesBalances/GetAllPaged';
  maxBalance = 0;
  get Service(): PreviousLeavesBalancesService { return Shell.Injector.get(PreviousLeavesBalancesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<PreviousLeaveBalanceComponent>,
    public loaderService: LoaderService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
    }
    this.form = fb.group({

      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      leaveId: [this.model.leaveId, Validators.required],
      previousBalance: [this.model.previousBalance, [Validators.required]],
      year: [this.model.year, Validators.required],
    });
    this.onEmployeeChange();

    let year = new Date().getFullYear();
    for (let i = year - 10; i <= year; i++) {
      this.years.push(i);
    }
    if (this.data) {
      this.Service.getLeaveRegulationById(this.form.value.leaveId)
      .subscribe(res => {
        this.leaveRegulationbalance = res;
        this.maxBalance = this.leaveRegulationbalance.numberOfRemainingDaysTransfared;
        this.form.get('previousBalance').setValidators(Validators.max(this.maxBalance));

      });
    }
  }
  onEmployeeChange() {

    let empId = this.form.value.employeeId;
    if (empId != null) {
      this.Service.getLeaveRegulation(empId)
        .subscribe(data => {
          this.leaves = data;
        });
    } else {
      this.leaves = null;
    }
    if (this.model.employeeId != empId) {
      this.form.controls['leaveId'].setValue(null);
    }

  }
  onLeaveChange() {
    this.Service.getLeaveRegulationById(this.form.value.leaveId)
      .subscribe(data => {
        this.leaveRegulationbalance = data;
        //this.form.controls['previousBalance'].setValue(this.leaveRegulationbalance.numberOfRemainingDaysTransfared);
        this.maxBalance = this.leaveRegulationbalance.numberOfRemainingDaysTransfared;
        this.form.get('previousBalance').setValidators(Validators.max(this.maxBalance));

      });

  }
  
  ngOnInit() {
  }

  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }

  autoCalculate(){
        // let search = {
    //    year:this.form.value.year,
    //    employeeId:this.form.value.employeeId,
    //    leaveId:this.form.value.leaveId
    // }
    this.loaderService.show();
    this.Service.AutoCalcPerYearLeaveEmployee(this.form.value).subscribe(data => {      
      this.loaderService.hide();
      this.form.controls['previousBalance'].setValue(data);
    }, error => {
      this.loaderService.hide();
      this.Alert.showError(error.error);
      ;
    }); 

  }
  
}
