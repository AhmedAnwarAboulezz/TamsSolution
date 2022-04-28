import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { UserInqury } from 'src/app/models/userInqury';
import { UserInquiriesService } from '../services/userinqury.service';
import { Shell } from 'src/app/component/shell';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { from, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepicker } from '@angular/material';
import { UserNameTypeEnum } from 'src/app/enums/UserNameTypeEnum';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-add-userinquiry',
  templateUrl: './add-userinquiry.component.html',
  styleUrls: ['./add-userinquiry.component.scss']
})

export class AddUserinquiryComponent extends BaseEditWithListComponent implements OnInit {
  header = DatePickerHeader;
  pageIds: any[] = [];
  model: UserInqury;
  TypeUserNames: any[];
  advanceSearch: advancedSearch;
  employeedata: any;
  passdisable = false;
  id: string;
  checkedItem = false;
  checkedList: any[] = [];
  dataList: UserInqury[] = [];
  Radio;
  hide=true;
  checkedAll: boolean;
  checkedAllDisable = false;
  namedisable = true;
  showLoader = false;
  componentName = 'UserInquiriesComponent';
  url = 'UserInquiries/GetAllPaged';
  displayedColumns = {};
  queryRequest2 = { offset: 1, limit: 50, sortDirection: 'ascending', sortField: 'id' };
  get Service(): UserInquiriesService { return Shell.Injector.get(UserInquiriesService); }
  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);
    return from(result);
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserinquiryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    super(dialogRef);
    if (this.localize.lang == 'en') {
      this.TypeUserNames = [
        { id: UserNameTypeEnum.CivilId, name: 'CivilId', show: true },
        { id: UserNameTypeEnum.EmployeeNumber, name: 'Employee No.', show: true },
        { id: UserNameTypeEnum.Other, name: 'Other', show: true }

      ];
    } else {
      this.TypeUserNames = [{ id: UserNameTypeEnum.CivilId, name: 'الرقم المدني', show: true },
      { id: UserNameTypeEnum.EmployeeNumber, name: 'رقم الموظف', show: true },
      { id: UserNameTypeEnum.Other, name: 'آخرى', show: true }

      ];
    }
    if (this.localize.currentLang == 'Fl') {
      this.displayedColumns = {
        employeeNumber: this.localize.translate.instant('secondGrid.employeeNumber'),
         employeeNameFl: this.localize.translate.instant('secondGrid.employeeName'), 
         civilId: this.localize.translate.instant('secondGrid.civilId'), 
         employeeLocationFl: this.localize.translate.instant('secondGrid.location'), 
          employeeAdministrationFl : this.localize.translate.instant('secondGrid.administration'), 
          employeeJobFl: this.localize.translate.instant('secondGrid.job')
      };
    } else {
      this.displayedColumns = {
        employeeNumber: this.localize.translate.instant('secondGrid.employeeNumber'),
        employeeNameSl: this.localize.translate.instant('secondGrid.employeeName'), 
        civilId: this.localize.translate.instant('secondGrid.civilId'), 
        employeeLocationSl: this.localize.translate.instant('secondGrid.location'), 
         employeeAdministrationSl : this.localize.translate.instant('secondGrid.administration'), 
         employeeJobSl: this.localize.translate.instant('secondGrid.job')
      };
    // if (this.localize.lang == 'en') {
    //   this.displayedColumns = {
    //     employeeNumber: 'Employee Number',
    //      employeeNameFl: 'Employee Name', 
    //      civilId: 'Civil Id', 
    //      employeeLocationFl: 'Location', 
    //       employeeAdministrationFl : 'Administration', 
    //       employeeJobFl: 'Job'
    //   };
    // } else {
    //   this.displayedColumns = {
    //     employeeNumber: 'رقم الموظف',
    //     employeeNameSl: 'أسم الموظف', 
    //     civilId: 'الرقم المدنى',
    //     employeeLocationSl: 'الموقع',
    //     employeeAdministrationSl: 'الإدارة', 
    //     employeeJobSl: 'الوظيفة'
    //   };
    }
    this.advanceSearch = new advancedSearch();
    this.model = new UserInqury();
    this.form = this.resetForm(this.model);
    this.advanceSearch = new advancedSearch();
  }

  async resultOfEmployee(queryRequest:any)
  {
    this.showLoader = true;
    const responce : any = await this.Service.postQueryParamsReq('UserInquiries/ResultOfEmployee', this.advanceSearch, queryRequest).toPromise();;
    if (responce.list.length == 0) {
      this.checkedAllDisable = true;
    }
    if (responce.list.length > 0) {
      this.checkedAllDisable = false;
    }
    if (this.advanceSearch.typeProcess == 'Add') {
      this.checkedItem = false;
      this.checkedAll = false;
    } else if (this.advanceSearch.typeProcess == 'edit') {
      this.checkedItem = true;
      this.employeedata = responce.list;
      this.checkedList = responce.list.map(element => element.id);
      this.checkedAll = true;
    }
    this.pageIds = responce.list.map(element => element.id);
    this.showLoader = false;    
    return responce;
  }
  loadTableData()
  {
    this.dataTable.dataService = (d: any) => this.mainLoader(d);
    this.dataTable.reload.emit();
  }
  ngOnInit() {

  }
  ngAfterViewInit(){
    this.showLoader = true;
    this.checkedList = [];
    this.advanceSearch.typeProcess = 'Add';
    this.loadTableData();
    //this.emitTable(this.queryRequest2);    
  }


  // async emitTable(queryRequest: any) {
  //   
  //   const responce : any = await this.Service.postQueryParamsReq('UserInquiries/ResultOfEmployee', this.advanceSearch, queryRequest).toPromise();
  //   this.loadPagedData();
  // }

  onCheckboxChange(event) {
    this.checkedList = event;
    this.updateUserType();
  }

  updateUserType() {
    let usernaetype = this.form.controls.userNameTypeId.value;
    if (this.checkedList.length > 1) {
      if (usernaetype == UserNameTypeEnum.Other) {
        this.form.controls.userNameTypeId.setValue(null);
        this.form.controls.username.setValue(null);
      }
      this.TypeUserNames[2].show = false;
    } else {
      this.TypeUserNames[2].show = true;
    }
  }
  fillDataList(checkedListIds: any[]) {

    this.dataList = [];
    checkedListIds.forEach(obj => {
      let userinquiry = new UserInqury();
      userinquiry.employeeId = obj;
      userinquiry.username = this.form.value.username;
      userinquiry.password = this.form.value.password;
      userinquiry.expireDate = this.form.value.expireDate;
      userinquiry.isEndOfContract = this.form.value.isEndOfContract;
      userinquiry.isActive = this.form.value.isActive;
      userinquiry.isCivilId = this.form.value.isCivilId;
      userinquiry.isAuthorizeLogs = this.form.value.isAuthorizeLogs,
      userinquiry.userNameTypeId = this.form.value.userNameTypeId;
      this.dataList.push(userinquiry);
    });

  }

  fillSearchResult() {
    this.loadTableData();
  }

  onAddSave(event) {
    let type = event.buttonType;
    if (this.checkedList == null || this.checkedList.length == 0) {
      this.Alert.showError(this.localize.translate.instant('Message.selectEmployeeFirst'));
    } else {
      this.fillDataList(this.checkedList);
      this.Service.postReq('Add', this.dataList).subscribe(responce => {
        if (type == 'SaveClose') {
          this.saveAndClose();
        } else {
          this.form = this.resetForm(this.model);
          this.checkedList = [];
          this.saveAndReload();
        }
        this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
      }, error => {
        this.Alert.showError(this.getErrorMessage(error));
      }
      );
    }
  }

  onItemChangePassWord(value, colname) {
    if (value) {
      // tslint:disable-next-line:no-string-literal
      this.form.controls[colname].setValue(null);
      this.form.controls[colname].clearValidators();
      this.form.controls[colname].updateValueAndValidity();
    } else {
      // tslint:disable-next-line:no-string-literal
      this.form.controls[colname].setValidators([Validators.required]);
      this.form.controls[colname].updateValueAndValidity();
    }
  }

  onItemChange(value) {
    if (value == UserNameTypeEnum.CivilId) {
      this.form.controls['username'].setValue(null);
      this.namedisable = true;
    } else if (value == UserNameTypeEnum.EmployeeNumber) {
      this.form.controls['username'].setValue(null);
      this.namedisable = true;
    } else if (value == UserNameTypeEnum.Other) {
      this.namedisable = false;
    }
    let test = this.namedisable && this.TypeUserNames[2].show;
  }
  resetForm(model: UserInqury): any {
    let resetForm = this.fb.group({
      id: [model.id],
      username: [model.username],
      password: [model.password, Validators.required],
      expireDate: [model.expireDate],
      isEndOfContract: [model.isEndOfContract != null ? model.isEndOfContract : false],
      isActive: [model.isActive != null ? model.isActive : true],
      isCivilId: [model.isCivilId != null ? model.isCivilId : false],
      isAuthorizeLogs: [model.isAuthorizeLogs != null ? model.isAuthorizeLogs : false],
      userNameTypeId: [model.userNameTypeId, Validators.required]
    });
    return resetForm;
  }
 
}
