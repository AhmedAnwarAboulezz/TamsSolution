
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepicker } from '@angular/material';
import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsermangmentsService } from '../services/usermangments.service';
import { Shell } from 'src/app/component/shell';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { UserMangment } from 'src/app/models/UserMangment';
import { Group } from 'src/app/models/group';
import { Employee } from 'src/app/models/employee';
import { AdministrativeLevel } from 'src/app/models/administrativeLevel';
import { UserNameTypeEnum } from 'src/app/enums/UserNameTypeEnum';
import { Location } from 'src/app/models/location';
import { toUnicode } from 'punycode';
import { TreeComponent } from 'src/app/shared/components/tree/components/tree/tree.component';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-usermangment',
  templateUrl: './usermangment.component.html',
  styleUrls: ['./usermangment.component.scss']
})
export class UsermangmentComponent extends BaseEditComponent implements OnInit {
  @ViewChild(TreeComponent, null) tree: TreeComponent;
  header = DatePickerHeader;
  model: UserMangment = {};
  TypeUserNames: any[];
  TypePasswords: string[] = ['CivilId'];
  id: string;
  url = 'usermangments/GetAllPaged';
  locations: Location[];
  groups: Group[];
  employees: Employee[];
  administartives: AdministrativeLevel[];
  hide = true;
  Radio = true;
  namedisable = true;
  passdisable = false;
  endOfContractDate: any;
  isendOfContractDate = false;
  employee?: any;

  get Service(): UsermangmentsService { return Shell.Injector.get(UsermangmentsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<UsermangmentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.localize.lang == 'en') {
      this.TypeUserNames = [{ id: UserNameTypeEnum.CivilId, name: 'CivilId' },
      { id: UserNameTypeEnum.EmployeeNumber, name: 'Emp No.' },
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
      this.Radio = false;
    }
    this.getLookups();

    if (this.model.userLocation !== undefined &&
      this.model.userLocation.some(e => typeof e === 'object')) {
      this.model.userLocation = this.model.userLocation.map(({ locationId }: any) => (locationId));
    }

    if (this.model.userGroup !== undefined &&
      this.model.userGroup.some(e => typeof e === 'object')) {
      this.model.userGroup = this.model.userGroup.map(({ groupId }: any) => (groupId));
    }
    if (this.model.userAdminstrative !== undefined &&
      this.model.userAdminstrative.some(e => typeof e === 'object')) {
      this.model.userAdminstrative = this.model.userAdminstrative.map(({ adminstrativeId }: any) => (adminstrativeId));
    }

    this.form = this.resetForm(this.model);
   
    if (this.model.id) {
      if (this.model.isEndOfContract) {
        this.isendOfContractDate = true;
      } else {
        this.isendOfContractDate = false;
      }
    }
  }

  onItemChange(value) {
    
    console.log(this.employee)
    if (value == UserNameTypeEnum.CivilId) {
      this.form.controls['username'].setValue(this.employee.civilId);
      this.namedisable = true;
    } else if (value == UserNameTypeEnum.EmployeeNumber) {
      this.form.controls['username'].setValue(this.employee.employeeNumber);
      this.namedisable = true;
    } else if (value == UserNameTypeEnum.Other) {
      this.form.controls['username'].setValue(this.form.value.id != null ? this.form.value.username : null);
      this.namedisable = false;
    }
  }

  onItemChangePassWord(value) {
    if (value) {
      this.form.controls['password'].setValue(this.employee.civilId);
      this.passdisable = true;
    } else {
      this.form.controls['password'].setValue(null);
      this.passdisable = false;
    }
  }
  getLookups() {
    this.Service.getLookup().subscribe((data: any) => {
      this.groups = data[0];
      this.locations = data[1];
    });
  }

  onCloseConfirmation(event: any) {
    const test = this.form.value.userAdminstrative;
    if (this.form.value.userAdminstrative.some(e => typeof e === 'object')) {
      this.form.value.userAdminstrative = test.map(
        (e: any) => ({ adminstrativeId: e.data, userId: this.form.value.id }));
    } else {
      this.form.value.userAdminstrative = test.map(
        (e: any) => ({ adminstrativeId: e, userId: this.form.value.id }));
    }
    this.form.value.userLocation =
    this.form.value.userLocation.map((e: any) => ({ locationId: e, userId: this.form.value.id })).filter(q => q.locationId != 0);
    this.form.value.userGroup =
    this.form.value.userGroup.map((e: any) => ({ groupId: e, userId: this.form.value.id })).filter(q => q.groupId != 0);
    event.form = this.form.value;
    this.close(event, this.resetForm(new UserMangment()));
    if (event.buttonType === 'Save') {
      this.isNew = true;
      this.tree.loadData([], true);
    }
  }
  onEmployeeChange(event: any) {
    
    if (event) {
      this.employee = event;
      console.log( this.employee);
      this.endOfContractDate = event.endDate;
    } else {
      this.employee = null;
      this.endOfContractDate = false;
    }
    this.form.controls['username'].setValue('');
    this.form.controls['password'].setValue('');
    this.form.controls['isActive'].setValue(true);
    this.form.controls['isCivilId'].setValue(false);
    this.form.controls['isEndOfContract'].setValue(false);
    this.form.controls['userNameTypeId'].setValue('');
    this.onEndOfContractChange(false);
    this.Radio = false;

  }

  onEndOfContractChange(event: any) {
    if (event) {
      this.form.controls['expireDate'].setValue(this.endOfContractDate);
      this.isendOfContractDate = true;
    } else {
      this.form.controls['expireDate'].setValue('');
      this.isendOfContractDate = false;
    }
  }

  getEmployeeData(event: any) {
    if (event && this.form.value.id) {
      this.employee = event;
      this.endOfContractDate = event.endDate;
      this.onItemChange(this.model.userNameTypeId);
      this.onItemChangePassWord(this.model.isCivilId);
    } 
    // else {
    //   this.employee = null;
    //   this.endOfContractDate = null;
    // }
  }

  resetForm(model: UserMangment): any {
    let resetForm = this.fb.group({
      id: [model.id],
      employeeId: [model.employeeId, Validators.required],
      username: [model.username, Validators.required],
      password: [model.password],
      userAdminstrative: [model.userAdminstrative, Validators.required],
      userLocation: [model.userLocation, Validators.required],
      userGroup: [model.userGroup, Validators.required],
      expireDate: [model.expireDate],
      isEndOfContract: [model.isEndOfContract != null ? model.isEndOfContract : false],
      isActive: [model.isActive != null ? model.isActive : true],
      isCivilId: [model.isCivilId != null ? model.isCivilId : false],
      userNameTypeId: [model.userNameTypeId, Validators.required]
    });
     
    
    if(model.id){
      resetForm.controls['password'].clearValidators();
      resetForm.controls['password'].updateValueAndValidity();
    }
    else{
      resetForm.controls['password'].setValidators([Validators.required]);
      resetForm.controls['password'].updateValueAndValidity();
    }
    return resetForm;
  }


  toggleAllSelection(selected, isGroup) {

    if (selected && isGroup) {
      this.form.controls.userGroup
        .patchValue([...this.groups.map(item => item.id), 0]);
    } else if (selected && !isGroup) {
      this.form.controls.userLocation
        .patchValue([...this.locations.map(item => item.id), 0]);

    } else {
      if (isGroup) { this.form.controls.userGroup.patchValue([]); } else { this.form.controls.userLocation.patchValue([]); }
    }
  }
  toggleUnSelectAll(selected, isGroup)
  {
    if (isGroup) { 
      var selectedItems= this.form.controls.userGroup.value.filter(e => e != 0);
      this.form.controls.userGroup.patchValue(selectedItems);
    } 
    else
     { 
       var selectedItems= this.form.controls.userLocation.value.filter(e => e != 0);
       this.form.controls.userLocation.patchValue(selectedItems);
     }

    var selectedItems= this.form.controls.lateRegulationContractTypes.value.filter(e => e != 0);
    this.form.controls.lateRegulationContractTypes.patchValue(selectedItems);

  }

  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }

 
}
