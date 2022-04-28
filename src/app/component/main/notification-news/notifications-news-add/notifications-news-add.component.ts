import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { from, Observable } from 'rxjs';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { Shell } from 'src/app/component/shell';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { EmployeeDuty } from 'src/app/models/employeeDuty';
import { DutyTypesEnum } from 'src/app/enums/DutyTypesEnum';
import { NotificationService } from '../Services/notification.service';
import { NotificationDto } from 'src/app/models/notificationDto';

@Component({
  selector: 'app-notifications-news-add',
  templateUrl: './notifications-news-add.component.html',
  styleUrls: ['./notifications-news-add.component.scss']
})

export class NotificationsNewsAddComponent extends BaseEditWithListComponent implements OnInit {
  pageIds: any[] = [];
  model: NotificationDto;
  advanceSearch: advancedSearch;
  employeedata: any;
  id: string;
  checkedList: any[] = [];
  dataList: NotificationDto[] = [];
  dutyTypesEnum = DutyTypesEnum;
  checkedAllDisable = false;
  notificationTypes: any[] = [];
  periorities: any[] = [];
  methodType: any[] = [];
  showTable = false;

  showLoader = false;
  componentName = 'EmployeeDuty';
  url = 'Notifications/GetAllPagged';
  displayedColumns = {};
  queryRequest2:LoadOptions = { offset: 1, limit: 50, sortDirection: 'ascending', sortField: 'id', filter:{} };
  get Service(): NotificationService { return Shell.Injector.get(NotificationService); }

  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);    
    return from(result);
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<NotificationsNewsAddComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    super(dialogRef);
    this.lookups();
    if (this.localize.currentLang == 'Fl') {
      this.displayedColumns = {
        employeeNumber: this.localize.translate.instant('secondGrid.employeeNumber'),
         employeeNameFl: this.localize.translate.instant('secondGrid.employeeName'), 
         civilId: this.localize.translate.instant('secondGrid.civilId'), 
         employeeLocationFl: this.localize.translate.instant('secondGrid.location'), 
         employeeGenderFl: this.localize.translate.instant('secondGrid.gender'), 
          employeeAdministrationFl : this.localize.translate.instant('secondGrid.administration'), 
          employeeJobFl: this.localize.translate.instant('secondGrid.job'),
          employeeTeamFl:this.localize.translate.instant('secondGrid.team')
      };
    } else {
      this.displayedColumns = {
        employeeNumber: this.localize.translate.instant('secondGrid.employeeNumber'),
        employeeNameSl: this.localize.translate.instant('secondGrid.employeeName'), 
        civilId: this.localize.translate.instant('secondGrid.civilId'), 
        employeeLocationSl: this.localize.translate.instant('secondGrid.location'), 
        employeeGenderSl: this.localize.translate.instant('secondGrid.gender'), 
         employeeAdministrationSl : this.localize.translate.instant('secondGrid.administration'), 
         employeeJobSl: this.localize.translate.instant('secondGrid.job'),
         employeeTeamSl:this.localize.translate.instant('secondGrid.team')
      };
    }
   
    this.advanceSearch = new advancedSearch();
    this.advanceSearch.typeProcess = 'Add';
    this.model = new NotificationDto();
    this.form = fb.group({
      id: [this.model.id],
      messageEn: [this.model.messageEn, Validators.required],
      messageAr: [this.model.messageAr, Validators.required],
      notificationTypeId: [this.model.notificationTypeId, Validators.required],
      periority: [this.model.periority, Validators.required],
      url: [this.model.url]
    });
  }


  async resultOfEmployee(queryRequest:any)
  {
    this.showLoader = true;
    const responce : any = await this.Service.postQueryParamsReq('EmployeeDuties/Fill', this.advanceSearch, queryRequest).toPromise();
    if (responce.list.length == 0) {
      this.checkedAllDisable = true;
    }
    if (responce.list.length > 0) {
      this.checkedAllDisable = false;
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
    this.emitTable(this.queryRequest2);  
  }
  async emitTable(queryRequest: any) {
    const responce : any = await this.Service.postQueryParamsReq('EmployeeDuties/Fill', this.advanceSearch, queryRequest).toPromise();
    this.loadPagedData();
  }

  onCheckboxChange(event) {
    this.checkedList = event;

  }

  fillDataList(checkedListIds: any[]) {
    this.dataList = [];
    checkedListIds.forEach(obj => {
      let empDuty = new NotificationDto();
      empDuty.employeeId = obj;
      empDuty.messageAr = this.form.value.messageAr;
      empDuty.messageEn = this.form.value.messageEn;
      empDuty.notificationTypeId = this.form.value.notificationTypeId;
      empDuty.url = this.form.value.url;
      empDuty.periority = this.form.value.periority;
      empDuty.isSeen = false;
      empDuty.createDate = new Date();
      this.dataList.push(empDuty);
    });

  }

  fillSearchResult() {
    //this.showTable = true;
    this.loadTableData();
  }


  onAddSave(event) {
    console.log("Result => ", event);
    
    let type = event.buttonType;
    if(this.showTable == false){
      let empDuty = new NotificationDto();
      empDuty.messageAr = this.form.value.messageAr;
      empDuty.messageEn = this.form.value.messageEn;
      empDuty.notificationTypeId = this.form.value.notificationTypeId;
      empDuty.url = this.form.value.url;
      empDuty.periority = this.form.value.periority;
      empDuty.isSeen = false;
      empDuty.createDate = new Date();
      this.Service.addNotificationsForAllEmployees(empDuty).subscribe(responce => {
        if (type == 'SaveClose') { this.saveAndClose(); } else { this.saveAndReload(); }
        this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
      }, error => {
        this.Alert.showError(this.getErrorMessage(error));
      }
      );
    }
    else{
      if (this.checkedList == null || this.checkedList.length == 0) {
        this.Alert.showError(this.localize.translate.instant('Message.selectEmployeeFirst'));
      } 
      else {
        
        this.fillDataList(this.checkedList);
        this.Service.addNotifications(this.dataList).subscribe(responce => {
          if (type == 'SaveClose') { this.saveAndClose(); } else { this.saveAndReload(); }
          this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
        }, error => {
          this.Alert.showError(this.getErrorMessage(error));
        }
        );
      }
    }
    
    
  }

  lookups(): void {
    this.notificationTypes = [
      // { nameFl:"Workflow", nameSl:"موافقات", id:1},
      { nameEn:"News", nameAr:"أخبار", id:2},
      { nameEn:"HR", nameAr:"موارد بشرية", id:3}
    ];
    this.periorities = [
      { nameEn:"High", nameAr:"أولية", id:1},
      { nameEn:"Low", nameAr:"أقل أهمية", id:2}
    ];

    this.methodType = [
      {
        id: "0", nameEn:"All Employees",nameAr:"كل الموظفين"
      },
      {
        id: "1", nameEn:"Employees From Advanced Search",nameAr:"بحث الموظفين المتقدم"
      }
    ];
  }
 
}

