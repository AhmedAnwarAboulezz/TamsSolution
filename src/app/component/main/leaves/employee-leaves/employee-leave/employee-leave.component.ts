import { EmployeeLeave } from 'src/app/models/employeeLeave';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { SalaryLeave } from 'src/app/models/salaryLeave';
import { LeaveRegulation } from 'src/app/models/LeaveRegulation';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepicker } from '@angular/material';

import { BaseComponent } from 'src/app/component/BaseComponent';
import { retry } from 'rxjs/operators';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { EmployeeLeavesService } from '../services/employee-leaves.service';
import { Shell } from 'src/app/component/shell';
import * as moment from 'moment';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { Moment } from 'moment';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.scss']
})

export class EmployeeLeaveComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;

  model: EmployeeLeave = {};
  salaryleave: SalaryLeave[];
  leaveregulation: any[];
  filePath: string;
  selectedFile = '';
  serviceName = 'Leaves';
  modeselect: string;
  showUnpaidstartdate = false;
  showsalary =false;
  clore = false;
  daysNumberVal: any = '';
  balanceVal: any = '';
  actualDayVal: any = '';
  paidDaysVal: any = '';
  unPaidDaysVal: any = '';
  leftBalanceVal: any = '';

  balanceValCast='';
  leftBalanceCast='';

  isUnpaidLeaveValue: boolean;

  id: string;
  default: string;
  url = 'EmployeeLeaves/GetAllPaged';
  get Service(): EmployeeLeavesService { return Shell.Injector.get(EmployeeLeavesService); }
  downloadFileUrl: string = this.Service.serverUrl + 'EmployeeLeaves/GetFileByName/' + this.model.fileName;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeLeaveComponent>,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getSalaryLeave();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
      this.isUnpaidLeaveValue = this.data.isUnpaidLeave;
      this.filePath = this.model.fileName != null ? this.model.fileName.split('-')[0] : null;
    } 

      this.default = '10000000-1000-1000-1000-100000000000';

    

    this.selectedFile = this.model.fileName;

    this.form = this.resetForm(this.model);
    // if (this.default) {
    //   this.form.controls['salaryId'].setValue(this.default, { onlySelf: true });
    // }
    if (this.data) {
      this.onchangeUnpaidLeave(this.model.isUnpaidLeave);
    }

    this.onEmployeeChange(true);
  }
  resetForm( model: EmployeeLeave ):any{
    let resetForm = this.fb.group({    
      id: [model.id],
      employeeId: [model.employeeId, Validators.required],
      startDate: [model.startDate, Validators.required],
      endDate: [model.endDate, Validators.required],
      leaveRegulationId: [model.leaveRegulationId, Validators.required],
      dayNumber: [model.dayNumber],
      actualDay: [model.actualDay,Validators.min(1)],
      payedDay: [model.payedDay],
      unPayedDay: [model.unPayedDay],
      balance: [model.balance],
      leftBalance: [model.leftBalance, Validators.min(0)],
      salaryId: [model.salaryId],
      unPayedStartDate: [model.unPayedStartDate],
      isUnpaidLeave: [model.isUnpaidLeave ? model.isUnpaidLeave : false],
      fileName: [''],
      filePath: [''],
      workflowStatusId: [model.workflowStatusId]

    });
    return resetForm;

  }

  ngOnInit() {
    // this.calculateValues();
    // this.modeselect = 'un defined';
  }

  calculateValues(init?: boolean) {
    let a = moment.parseZone(this.form.value.endDate);
    let b = moment.parseZone(this.form.value.startDate);
    this.daysNumberVal = (this.form.value.startDate == null || this.form.value.endDate == null || a < b) ? 0 : a.diff(b, 'days') + 1;

    if (this.form.value.leaveRegulationId && this.form.value.employeeId && this.form.value.startDate && this.form.value.endDate) {
      this.form.controls['fileName'].clearValidators();
      this.form.controls['fileName'].updateValueAndValidity();
      this.showsalary = false;
      if(init){
        this.form.controls['salaryId'].setValue(this.model.salaryId);
      }
      else{
        this.form.controls['salaryId'].setValue(null);
      }



      let leaveRequire = this.leaveregulation.filter(a => a.isSelected == true && a.id == this.form.value.leaveRegulationId);
      if (leaveRequire.length != 0 && (this.selectedFile == null || this.selectedFile == '')) {
        this.form.controls['fileName'].setValidators([Validators.required]);
        this.form.controls['fileName'].updateValueAndValidity();
      }
      let salaryRequire = this.leaveregulation.filter(a => a.isFinancialRelated == true && a.id == this.form.value.leaveRegulationId);
      if (salaryRequire.length != 0) {
        this.showsalary = true;
        let newValue =  this.form.value.salaryId != null ? this.form.value.salaryId :this.default;
        this.form.controls['salaryId'].setValue(newValue);
      }
      this.Service.getAvailableBalance(this.form.value.leaveRegulationId,
        this.form.value.employeeId, this.form.value.id, this.form.value.startDate, this.form.value.endDate).subscribe(result => {
          this.balanceVal = result;
          this.balanceValCast = this.getCasted(result);
          if (this.balanceVal < 0) {
            this.balanceVal = 0;
          }
          this.Service.getActualDays(this.form.value.employeeId,
            this.form.value.leaveRegulationId, this.form.value.startDate, this.form.value.endDate)
            .subscribe(result => {

              this.actualDayVal = result;
              this.leftBalanceVal = this.balanceVal - this.actualDayVal;
              this.leftBalanceCast = this.getCasted(this.leftBalanceVal);

              if (this.leftBalanceVal <= 0) {
                this.paidDaysVal = Math.floor(this.balanceVal);
                this.unPaidDaysVal = this.actualDayVal -  this.paidDaysVal;
              }
              if (this.leftBalanceVal > 0) {
                this.paidDaysVal = this.actualDayVal;
                this.unPaidDaysVal = 0;
              }
              this.form.controls['dayNumber'].setValue(this.daysNumberVal);
              this.form.controls['balance'].setValue(this.balanceVal);
              this.form.controls['actualDay'].setValue(this.actualDayVal);
              this.form.controls['payedDay'].setValue(this.paidDaysVal);
              this.form.controls['unPayedDay'].setValue(this.unPaidDaysVal);
              this.form.controls['leftBalance'].setValue(this.leftBalanceVal);


              let leaveIds = this.form.value.leaveRegulationId;
              let leftbalanceNo = this.form.value.leftBalance;
              let aloowedLeaved = this.leaveregulation.filter(a => a.isAllowed == true).map(a => a.id);
              if (aloowedLeaved.includes(leaveIds) && leftbalanceNo < 0) {

                this.showUnpaidstartdate = true;
              } else {
                this.showUnpaidstartdate = false;
              }
              this.onchangeUnpaidLeave(this.showUnpaidstartdate);
            });
        });

    }

  }
  onchangeUnpaidLeave(event: any) {

    if (event && this.form.value.isUnpaidLeave == true) {
      
      this.form.controls['leftBalance'].setValue(0);
      let end = moment.parseZone(this.form.value.endDate);
      end.add(this.leftBalanceVal +1, 'days');
      this.form.controls['unPayedStartDate'].setValue(end);
    } else {
      this.form.controls['leftBalance'].setValue(this.leftBalanceVal);
      this.form.controls['unPayedStartDate'].setValue(null);
    }
    // this.form.controls['isUnpaidLeave'].setValue(event);

  }

  getSalaryLeave(): void {
    this.Service.getSalaryLeave()
      .subscribe(data => {
        this.salaryleave = data;
      });
  }

  onEmployeeChange(init?: boolean) {
    let empId = this.form.value.employeeId;
    if (empId != null) {
      this.Service.getLeaveRegulationByEmpId(empId)
        .subscribe(data => {
          this.leaveregulation = data;
          this.calculateValues(init);
          if(!this.isNew && !this.leaveregulation.map(a=>a.id).includes(this.form.value.leaveRegulationId))
          {
            this.form.controls['leaveRegulationId'].setValue(null);
          }
          // this.modeselect = 'un defined';
        });
    } else {
      this.leaveregulation = null;
    }
    if (this.model.employeeId != empId) {
      this.form.controls['leaveRegulationId'].setValue(null);
    }

  }

  onCloseConfirmation(event) {

    //this.dialogRef.close(this.form.value);
    event.form = this.form.value;
    this.close(event, this.resetForm(new EmployeeLeave()));
    if (event.buttonType === 'Save') {
      this.isNew = true;
      this.showUnpaidstartdate=false;
      this.showsalary=false;
      this.filePath='';
    }
  }

  onSelectedFilesChanged(inputFile: any) {
    try {

      const file: File = inputFile.files[0];
      if (file.size > 2000000) {
        this.Alert.showError(this.localize.translate.instant('Message.maxFileSize'));
        inputFile.value = null;
      } else {
        this.form.value.filePath = file.name;
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          let val = event.target.result;
          this.form.value.fileName = val;

        });
        reader.readAsDataURL(file);
      }
    } catch (error) {
    }
  }

  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }
  setEndDate() {
    let startDate = this.form.value.startDate;
    let endDate = this.form.value.endDate;
    if(startDate > endDate) {
      let start = moment.parseZone(startDate);
      this.form.controls['endDate'].setValue(start);
    }
    this.calculateValues();
    
  }

  getCasted(result: any){
   if(result.toString().includes('.')){
     let ttt = result.toString().split('.');
     return ttt[0] + '.' +ttt[1].substring(0,2);
   }
   return result;
  }
}
