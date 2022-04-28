import { Component, OnInit, Optional, Inject } from '@angular/core';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { Observable, from } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepicker } from '@angular/material';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { EmployeeDuty } from 'src/app/models/employeeDuty';
import { EmployeeDutiesService } from '../Services/employeeDuties.service';
import { Shell } from 'src/app/component/shell';
import { DutyTypesEnum } from 'src/app/enums/DutyTypesEnum';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-add-employee-duty',
  templateUrl: './add-employee-duty.component.html',
  styleUrls: ['./add-employee-duty.component.scss']
})

export class AddEmployeeDutyComponent extends BaseEditWithListComponent implements OnInit {
  pageIds: any[] = [];
  disabledIds: any[] = [];
  disabledDetailIds: any[] = [];
  model: EmployeeDuty;
  advanceSearch: advancedSearch;
  employeedata: any;
  id: string;
  checkedList: any[] = [];
  dataList: EmployeeDuty[] = [];
  dutytypes: any;
  dutyTypesEnum = DutyTypesEnum;
  allDutiesById: any;
  selectDutyType = false;
  checkedAllDisable = false;
  header = DatePickerHeader;

  showLoader = false;
  componentName = 'EmployeeDuty';
  url = 'EmployeeDuties/GetAllPaged';
  displayedColumns = {};
  queryRequest2: LoadOptions = { offset: 1, limit: 50, sortDirection: 'ascending', sortField: 'id', filter: {} };
  get Service(): EmployeeDutiesService { return Shell.Injector.get(EmployeeDutiesService); }

  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);

    return from(result);
    // return this.Service.postQueryParamsReq('EmployeeDuties/Fill', this.advanceSearch, queryRequest);
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeDutyComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    super(dialogRef);
    this.lookups();
    if (this.localize.currentLang == 'Fl') {
      this.displayedColumns = {
        employeeNumber: this.localize.translate.instant('secondGrid.EmployeeNumber'), employeeNameFl
          : this.localize.translate.instant('secondGrid.EmployeeName'), 
          civilId: this.localize.translate.instant('secondGrid.CivilId'), employeeLocationFl
          : this.localize.translate.instant('secondGrid.Location'), 
          employeeGenderFl: this.localize.translate.instant('secondGrid.Gender'), employeeAdministrationFl
          : this.localize.translate.instant('secondGrid.Administration'), 
          employeeJobFl: this.localize.translate.instant('secondGrid.Job'), 
          employeeTeamFl: this.localize.translate.instant('secondGrid.Team')
      };
    } else {
      this.displayedColumns = {
        employeeNumber: this.localize.translate.instant('secondGrid.EmployeeNumber'),
        employeeNameSl: this.localize.translate.instant('secondGrid.EmployeeName'), 
        civilId: this.localize.translate.instant('secondGrid.CivilId'),
        employeeLocationSl: this.localize.translate.instant('secondGrid.Location'), 
        employeeGenderSl: this.localize.translate.instant('secondGrid.Gender'),
        employeeAdministrationSl: this.localize.translate.instant('secondGrid.Administration'), 
        employeeJobSl: this.localize.translate.instant('secondGrid.Job'),
        employeeTeamSl: this.localize.translate.instant('secondGrid.Team')
      };
    }
    this.advanceSearch = new advancedSearch();
    this.advanceSearch.typeProcess = 'Add';
    this.model = new EmployeeDuty();
    this.form = fb.group({
      id: [this.model.id],
      dutyTypeId: [this.model.dutyTypeId, Validators.required],
      dutyId: [this.model.dutyId, Validators.required],
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate, Validators.required]
    });
    //this.emitTable(this.queryRequest2);
  }


  async resultOfEmployee(queryRequest: any) {
    this.showLoader = true;
    const responce: any = await this.Service.postQueryParamsReq('EmployeeDuties/Fill', this.advanceSearch, queryRequest).toPromise();

    if (responce.list.length == 0) {
      this.checkedAllDisable = true;
    }
    if (responce.list.length > 0) {
      this.checkedAllDisable = false;
    }
    this.pageIds = responce.list.map(element => element.id);
    let dateFilter = { startDate: this.form.value.startDate, endDate: this.form.value.endDate };
    let employeesDate = { empIds: this.pageIds, dateFilter };

    const employeesResponce: any = await this.Service.postQueryParamsReq('EmployeeDuties/GetEmployeeStartDate', employeesDate).toPromise();

    const dutyResponce: any = await this.Service.postQueryParamsReq('EmployeeDuties/GetDutiesByEmployeesIds', employeesDate).toPromise();
    if (employeesResponce.length == 0 && dutyResponce.length == 0) {
      this.disabledIds = [];
    }
    if (employeesResponce.length > 0) {
      this.disabledIds = this.disabledIds.concat(employeesResponce);
    }
    if (dutyResponce.length > 0) {
      let empIds = dutyResponce.map(a => a.employeeId).filter((thing, i, arr) => arr.findIndex(t => t === thing) === i);
      this.disabledIds = this.disabledIds.concat(empIds);

    }



    // this.disabledIds = dutyResponce.length > 0 ?
    // dutyResponce.map(a => a.employeeId).filter((thing, i, arr) => arr.findIndex(t => t === thing) === i) : [];


    this.checkedList = this.checkedList.filter((item) => {
      if (this.disabledIds.includes(item)) {
        return false;
      }
      return true;
    });
    this.showLoader = false;
    return responce;
  }
  loadTableData() {
    this.dataTable.dataService = (d: any) => this.mainLoader(d);
    this.dataTable.reload.emit();
  }

  ngOnInit() {
  }


  onDutyTypeChange(DutyId: any) {
    this.form.controls.dutyId.setValue(null);
    this.Service.getAllDutiesById(DutyId).subscribe((res: any) => {
      this.allDutiesById = res;
      this.selectDutyType = true;
    });
  }

  onCheckboxChange(event) {
    this.checkedList = event;

  }

  fillDataList(checkedListIds: any[]) {
    this.dataList = [];
    checkedListIds.forEach(obj => {
      let empDuty = new EmployeeDuty();
      empDuty.employeeId = obj;
      empDuty.dutyId = this.form.value.dutyId;
      empDuty.dutyTypeId = this.form.value.dutyTypeId;
      empDuty.startDate = this.form.value.startDate;
      empDuty.endDate = this.form.value.endDate;
      this.dataList.push(empDuty);
    });

  }

  fillSearchResult() {
    this.startEndDateChange();
  }

  startEndDateChange() {
    if (this.form.value.startDate != null && this.form.value.endDate != null && this.form.value.startDate <= this.form.value.endDate) {
      this.loadTableData();
    }
    else if (this.form.value.startDate == null && this.form.value.endDate == null) {
      this.Alert.showError('You Should Select Start And End Date First');
    }
    else if (this.form.value.startDate != null && this.form.value.endDate != null && this.form.value.startDate > this.form.value.endDate) {
      this.Alert.showError('please select Start Date less than or equal End Date');
    }
  }

  onAddSave(event) {
    let type = event.buttonType;
    if (this.checkedList == null || this.checkedList.length == 0) {
      this.Alert.showError(this.localize.translate.instant('Message.selectEmployeeFirst'));
    } else {
      this.fillDataList(this.checkedList);
      this.Service.postReq('Add', this.dataList).subscribe(responce => {
        if (type == 'SaveClose') { this.saveAndClose(); } else { this.saveAndReload(); }
        this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
      }, error => {
        this.Alert.showError(this.getErrorMessage(error));
      }
      );
    }
  }

  lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {
      this.dutytypes = data[0].filter(element => element.id != this.dutyTypesEnum.FixedPeriodDuty);
    });
  }

}
