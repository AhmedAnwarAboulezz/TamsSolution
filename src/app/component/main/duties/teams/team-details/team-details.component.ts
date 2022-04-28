import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { Shell } from 'src/app/component/shell';
import { FormBuilder, Validators } from '@angular/forms';
import { Team } from 'src/app/models/team';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { TeamEmployeesService } from '../Services/teamEmployees.service';
import { TeamEmployee } from 'src/app/models/teamEmployee';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { Observable, from } from 'rxjs';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { MatDialogRef, MAT_DIALOG_DATA, MatTabGroup } from '@angular/material';
import { TeamComponent } from '../team/team.component';
import { Result } from 'src/app/core/table-details/models/Result';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent extends BaseEditWithListComponent implements OnInit {
  // @ViewChild(MatTabGroup, null) tabGroup: MatTabGroup;
  showLoader = false;
  pageIds: any[] = [];
  model: Team;
  advanceSearch: advancedSearch;
  employeedata: any;
  id: string;
  checkedItem = false;
  checkedList: any[] = [];
  dataList: TeamEmployee[] = [];
  detailsTable = false;
  componentName = 'Teams';
  url = 'Teams/GetAllPaged';
  checkedAll: boolean;
  checkedAllDisable = false;
  displayedColumns = {};
  selectedIndex = 0;
  queryRequest2:LoadOptions = { offset: 1, limit: 50, sortField: 'id', sortDirection: "", filter:{}};
  get Service(): TeamEmployeesService { return Shell.Injector.get(TeamEmployeesService); }

  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);
    return from(result);
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<TeamComponent>,
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
    this.advanceSearch = new advancedSearch();
    this.advanceSearch.teamId.push(this.model.id);
    this.form = fb.group({
      id: [this.model.id],
      code: [this.model.code],
      teamNameFl: [this.model.teamNameFl, Validators.required],
      teamNameSl: [this.model.teamNameSl],
    });
  }

  async resultOfEmployee(queryRequest:any)
  {
    this.showLoader = true;
    const responce : any = await this.Service.postQueryParamsReq('TeamEmployees/Fill', this.advanceSearch, queryRequest).toPromise();;
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
    this.initFunction();  
  }

  initFunction()
  {
    this.showLoader = true;
    this.checkedList = [];
    if (this.model.employeeNumber == 0) {
      this.selectedIndex = 1;
      this.advanceSearch.typeProcess = 'Add';
    }
    else{
      this.advanceSearch.typeProcess = 'edit';
    }   
    this.emitTable(this.queryRequest2);  
  }
  async emitTable(queryRequest: any) {
    const responce : any = await this.Service.postQueryParamsReq('TeamEmployees/Fill', this.advanceSearch, queryRequest).toPromise();
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
      let teamemp = new TeamEmployee();
      teamemp.employeeId = obj;
      teamemp.teamId = this.model.id;
      teamemp.functionType = functionType;
      this.dataList.push(teamemp);
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
        if (type == 'SaveClose') 
        { this.saveAndClose(); } 
        else
         { 
          this.checkedItem = true;
          this.saveAndReload();

         }
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
