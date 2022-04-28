import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';

import { UserInqury } from 'src/app/models/userInqury';
import { Employee } from 'src/app/models/employee';
import { UserInquiriesService } from '../services/userinqury.service';
import { Shell } from 'src/app/component/shell';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserNameTypeEnum } from 'src/app/enums/UserNameTypeEnum';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-edit-userinquiry',
  templateUrl: './edit-userinquiry.component.html',
  styleUrls: ['./edit-userinquiry.component.scss']
})

export class EditUserinquiryComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;
  model: UserInqury = {};
  TypeUserNames: any[];
  TypePasswords: string[] = ['CivilId'];
  id: string;
  url = 'UserInquiries/GetAllPaged';
  employees: Employee[];
  isEmployeeEdit = false;
  hide = true;
  Radio = true;
  namedisable = true;
  passdisable = false;
  endOfContractDate: any;
  isendOfContractDate = false;
  employee?: any;
  get Service(): UserInquiriesService { return Shell.Injector.get(UserInquiriesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserinquiryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.localize.lang == 'en') {
      this.TypeUserNames = [{ id: UserNameTypeEnum.CivilId, name: 'CivilId' },
      { id: UserNameTypeEnum.EmployeeNumber, name: 'Employee No.' },
      { id: UserNameTypeEnum.Other, name: 'Other' }];
    } else {
      this.TypeUserNames = [{ id: UserNameTypeEnum.CivilId, name: 'الرقم المدني' },
      { id: UserNameTypeEnum.EmployeeNumber, name: 'رقم الموظف' },
      { id: UserNameTypeEnum.Other, name: 'آخرى' }];
    }
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
    }

    if (this.model.id) {
      this.isEmployeeEdit = true;
      this.Radio = false;
    }

    this.form = fb.group({

      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      username: [this.model.username, Validators.required],
      password: [this.model.password],
      expireDate: [this.model.expireDate],
      isEndOfContract: [this.model.isEndOfContract],
      isActive: [this.model.isActive],
      isAuthorizeLogs: [this.model.isAuthorizeLogs],
      isCivilId: [this.model.isCivilId],
      userNameTypeId: [this.model.userNameTypeId, Validators.required]
    });
    if (!this.model.isEndOfContract) {
      this.form.controls.isEndOfContract.setValue(false);
    }
    if (!this.model.isActive) {
      this.form.controls.isActive.setValue(false);
    }
    if (!this.model.isAuthorizeLogs) {
      this.form.controls.isAuthorizeLogs.setValue(false);
    }
    if (!this.model.isCivilId) {
      this.form.controls.isCivilId.setValue(false);
    }
    if (this.model.id) {
      if (this.model.isEndOfContract) {
        this.isendOfContractDate = true;
      } else {
        this.isendOfContractDate = false;
      }
    }
  }

  onItemChange(value) {
    if (value == UserNameTypeEnum.CivilId) {
      // tslint:disable-next-line:no-string-literal
      this.form.controls['username'].setValue(this.employee.civilId);
      this.namedisable = true;
    } else if (value == UserNameTypeEnum.EmployeeNumber) {
      // tslint:disable-next-line:no-string-literal
      this.form.controls['username'].setValue(this.employee.employeeNumber);
      this.namedisable = true;
    } else if (value == UserNameTypeEnum.Other) {
      // tslint:disable-next-line:no-string-literal
      this.form.controls['username'].setValue(this.model.id != null ? this.model.username : null);
      this.namedisable = false;
    }
  }

  onItemChangePassWord(value) {
    if (value) {
      // tslint:disable-next-line:no-string-literal
      this.form.controls['password'].setValue(this.employee.civilId);
      this.passdisable = true;
    } else {
      // tslint:disable-next-line:no-string-literal
      this.form.controls['password'].setValue(null);
      this.passdisable = false;
    }
  }

  onEmployeeChange(event: any) {

    this.employee = event;
    this.endOfContractDate = event.endDate;
    // tslint:disable-next-line:no-string-literal
    this.form.controls['username'].setValue('');
    // tslint:disable-next-line:no-string-literal
    this.form.controls['password'].setValue('');
    // tslint:disable-next-line:no-string-literal
    this.form.controls['isActive'].setValue(false);
    // tslint:disable-next-line:no-string-literal
    this.form.controls['isCivilId'].setValue(false);
    // tslint:disable-next-line:no-string-literal
    this.form.controls['isEndOfContract'].setValue(false);
    // tslint:disable-next-line:no-string-literal
    this.form.controls['userNameTypeId'].setValue('');
    this.onEndOfContractChange(false);
    this.Radio = false;
  }

  onEndOfContractChange(event: any) {
    if (event) {
      // tslint:disable-next-line:no-string-literal
      this.form.controls['expireDate'].setValue(this.endOfContractDate);
      this.isendOfContractDate = true;
      this.form.controls['expireDate'].clearValidators();
      this.form.controls['expireDate'].updateValueAndValidity();
    } else {
      // tslint:disable-next-line:no-string-literal
      this.form.controls['expireDate'].setValue('');
      this.isendOfContractDate = false;
      this.form.controls['expireDate'].setValidators([Validators.required]);
      this.form.controls['expireDate'].updateValueAndValidity();
    }
  }
 
  getEmployeeData(event: any) {
    if (event && this.form.value.id) {
      this.employee = event;
      this.endOfContractDate = event.endDate;
      this.onItemChange(this.model.userNameTypeId);
      this.onItemChangePassWord(this.model.isCivilId);
    }
  //   else {
  //     this.employee = null;
  //     this.endOfContractDate = null;
  // }
}

 

  onAddSave(event) {
    let result = { form: this.form.value, buttonType: event };
    super.close(result);
  }
  
}
