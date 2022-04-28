import { Component, OnInit, Inject, Optional } from '@angular/core';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { overtimeEmployeesService } from '../Services/overtimeEmployees.service';
import { Shell } from 'src/app/component/shell';
import { Observable, from } from 'rxjs';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OverTimeOrder, OverTimeEmployee } from 'src/app/models/overTimeOrder';
import * as moment from 'moment';

@Component({
  selector: 'app-overtime-employee-orders',
  templateUrl: './overtime-employee-orders.component.html',
  styleUrls: ['./overtime-employee-orders.component.scss']
})

export class OvertimeEmployeeOrdersComponent extends BaseEditWithListComponent implements OnInit {
  showLoader = false;
  pageIds: any[] = [];
  model: OverTimeOrder;
  advanceSearch: advancedSearch;
  employeedata: any;
  id: string;
  checkedItem = false;
  checkedList: any[] = [];
  dataList: OverTimeEmployee[] = [];
  detailsTable = false;
  componentName = 'OverTimeOrders';
  url = 'OverTimeOrders/GetAllPaged';

  overTimeStartDate;
  overTimeEndDate;
  selectedIndex = 1;

  checkedAll: boolean;
  checkedAllDisable = false;
  displayedColumns = {};
  queryRequest2: LoadOptions = { offset: 1, limit: 50, sortDirection: 'ascending', sortField: 'id' , filter:{}};
  get Service(): overtimeEmployeesService { return Shell.Injector.get(overtimeEmployeesService); }
  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);
    return from(result);
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<OvertimeEmployeeOrdersComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.localize.currentLang == 'Fl') {
      this.displayedColumns = {
        employeeNumber: this.localize.translate.instant('secondGrid.employeeNumber'),
         employeeNameFl: this.localize.translate.instant('secondGrid.employeeName'), 
         civilId: this.localize.translate.instant('secondGrid.civilId'), 
         employeeLocationFl: this.localize.translate.instant('secondGrid.location'), 
         employeeGenderFl: this.localize.translate.instant('secondGrid.gender'), 
          employeeAdministrationFl : this.localize.translate.instant('secondGrid.administration'), 
          employeeJobFl: this.localize.translate.instant('secondGrid.job')
      };
    } else {
      this.displayedColumns = {
        employeeNumber: this.localize.translate.instant('secondGrid.employeeNumber'),
        employeeNameSl: this.localize.translate.instant('secondGrid.employeeName'), 
        civilId: this.localize.translate.instant('secondGrid.civilId'), 
        employeeLocationSl: this.localize.translate.instant('secondGrid.location'), 
        employeeGenderSl: this.localize.translate.instant('secondGrid.gender'), 
         employeeAdministrationSl : this.localize.translate.instant('secondGrid.administration'), 
         employeeJobSl: this.localize.translate.instant('secondGrid.job')
      };
    }
    
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.overTimeStartDate = moment(this.model.startDate).format('DD/MM/YYYY');
    this.overTimeEndDate = moment(this.model.endDate).format('DD/MM/YYYY');
    this.advanceSearch = new advancedSearch();
    this.advanceSearch.overTimeOrderId.push(this.model.id);
    this.form = fb.group({
      id: [this.model.id]
    });
  }

  async resultOfEmployee(queryRequest:any)
  {
    this.showLoader = true;
    const responce : any = await this.Service.postQueryParamsReq('OverTimeOrderDetails/Fill', this.advanceSearch, queryRequest).toPromise();;
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
    this.showLoader = true;
    this.checkedList = [];
    this.advanceSearch.typeProcess = 'Add';
    this.emitTable(this.queryRequest2);    
  }


  async emitTable(queryRequest: any) {
    const responce : any = await this.Service.postQueryParamsReq('OverTimeOrderDetails/Fill', this.advanceSearch, queryRequest).toPromise();
    this.loadPagedData();
  }

  edit() {
    this.checkedList = [];
    this.advanceSearch.typeProcess = 'edit';
    this.loadTableData();
  }
  add() {
    this.checkedList = [];
    this.advanceSearch.typeProcess = 'Add';
    this.loadTableData();
  }

  onCheckboxChange(event) {
    this.checkedList = event;
  }

  fillDataList(checkedListIds: any[], functionType?: string) {
    this.dataList = [];
    checkedListIds.forEach(obj => {
      let overtimeEmp = new OverTimeEmployee();
      overtimeEmp.employeeId = obj;
      overtimeEmp.overTimeOrderId = this.model.id;
      overtimeEmp.functionType = functionType;
      this.dataList.push(overtimeEmp);
    });

  }
  fillSearchResult() {
    this.loadTableData();
  }

  onAddSave(event) {
    let type = event.buttonType;
    this.fillDataList(this.checkedList);
    this.Service.postReq('Add', this.dataList)
      .subscribe(responce => {
        if (type == 'SaveClose') { this.saveAndClose(); } else { this.saveAndReload(); }
      this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));

      });
  }
  onUpdateSave(event) {

    let type = event.buttonType;
    if (this.checkedList.length == 0) {
      this.checkedList = this.pageIds;
      this.fillDataList(this.checkedList, 'RemoveAll');
    } else {
      this.fillDataList(this.checkedList);
    }
    this.Service.postReq('Update', this.dataList)
      .subscribe(responce => {
        if (type == 'SaveClose') { this.saveAndClose(); } else { this.saveAndReload(); }
      this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      });
  }

  changeIndex(value: any) {
    if (value == 0) {
      this.edit();
    }
    if (value == 1) {
      this.add();
    }
  }

}
