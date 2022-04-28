import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Employee } from 'src/app/models/employee';
import { EmployeeProfile } from 'src/app/models/EmployeeProfile';
import { Observable, from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BaseListComponent } from 'src/app/core/table-details/core/base-list-component';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { Result } from 'src/app/core/table-details/models/Result';
import { APIs } from 'src/app/services/APIs';
import 'rxjs/add/operator/toPromise';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import * as moment from 'moment';
import { Shell } from 'src/app/component/shell';
import { EmployeesService } from '../services/employees.service';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent extends BaseListComponent implements OnInit {
  header = DatePickerHeader;
  administrativeLevels: any[];
  locations: any[];
  contractTypes: any[];
  jobs: any[];
  jobDegrees: any[];
  result: Result;
  form: FormGroup;
  employee: Employee;
  employeeImage = './assets/img/man.png';
  profileId = 0;
  employeeProfiles: EmployeeProfile[];
  employeeProfile: any = {};
  mainurl = 'Employees/GetAllPaged';

  empCurrentAdmin?: any;

  displayedColumns = {};
  displayedTempColumns = {};
  withoutCurrentAdmin=true;
  columnsTypes = { startDate: 'Date', endDate: 'Date' };
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }
  EmployeeServices(): EmployeesService { return Shell.Injector.get(EmployeesService); }

  // implememnt mainLoader here in every component to get the inital data of the datatable
  mainLoader(x: LoadOptions): Observable<any> {

    x.filter = this.filter;
    let body = { employeeId: this.employee.id, employeeProfile: this.profileId };
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfTable(queryRequest,body);
    return from(result);    
  }

  async resultOfTable(queryRequest:any, body:any)
  {
    const employeeProfiles : any = await this.Service.post(this.APIs.init('EmployeeProfiles', queryRequest).GetAll, body).toPromise();
      console.log(employeeProfiles.list)
      if (this.profileId == 0) {
        let list = employeeProfiles.list.filter(e => e.endDate == null)[0];
        if (this.translate.currentLang == 'en') {
          
          this.empCurrentAdmin = list == null ? '' : list.nameFl;
        } else {
          this.empCurrentAdmin = list == null ? '' : list.nameSl;
        }
      }
    return employeeProfiles;
  }


  get localizetr(): LocalizationService { return Shell.Injector.get(LocalizationService); }

  constructor(
    private fb: FormBuilder,
    public APIs: APIs,
    public dialogRef: MatDialogRef<EmployeeProfileComponent>,
    public dialog: MatDialog,
    public translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) employee: Employee
  ) {
    super('EmployeesComponent', '');
    if (this.localize.currentLang == 'Fl') {
      this.displayedColumns = {
        nameFl: this.localize.translate.instant('secondGrid.name'), 
        startDate: this.localize.translate.instant('secondGrid.startDate'), 
        endDate: this.localize.translate.instant('secondGrid.endDate')
      };
      this.displayedTempColumns = {
        currentAdminLeveNameFl: this.localize.translate.instant('secondGrid.mainAdmin'),
        nameFl: this.localize.translate.instant('secondGrid.name'), 
        startDate: this.localize.translate.instant('secondGrid.startDate'), 
        endDate: this.localize.translate.instant('secondGrid.endDate')
      };
    } 
    else {
      this.displayedColumns = {
        nameSl: this.localize.translate.instant('secondGrid.name'), 
        startDate: this.localize.translate.instant('secondGrid.startDate'), 
        endDate: this.localize.translate.instant('secondGrid.endDate')
      };
      this.displayedTempColumns = {
        currentAdminLeveNameSl: this.localize.translate.instant('secondGrid.mainAdmin'),
        nameSl: this.localize.translate.instant('secondGrid.name'), 
        startDate: this.localize.translate.instant('secondGrid.startDate'), 
        endDate: this.localize.translate.instant('secondGrid.endDate')
      };
    }
    
    this.employee = employee; 
    this.fillFormGroup();
    this.fillDropdown();
    this.EmployeeServices().getEmployeeImage(this.employee.id).subscribe(response => {
      if (response != null && response != "") {
        this.employeeImage = response;
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  ngOnInit() {

  }

  loadTable(){
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable(this.mainurl);
  }

  fillDropdown() {
    this.getContractTypes();
    this.getJobDegrees();
    this.getJobs();
    this.getLocations();
  }

  async wordTranslate() {
    let words;
    await this.Service.currentLang$.subscribe(() => {
      this.translate.get(`HOME.columnName.employeeProfiles`).subscribe((text: string) => words = text);
    });
    return words;
  }

  validateDate(startDate, endDate): boolean {
    let momentSDate = moment.parseZone(startDate);
    let momentEDate = moment.parseZone(endDate);
    let validateResult = true;
    if (momentSDate > momentEDate && endDate != null) {
      validateResult = false;
      this.Alert.showError(this.localize.translate.instant('Message.startDateLessThanEndDate'));
    }
    return validateResult;
  }
  onSave() {
    let data = this.form.value;
    let validateResult = this.validateDate(data.startDate, data.endDate);
    if (validateResult) {
      data.employeeId = this.employee.id;
      data.EmployeeProfile = this.profileId;
      if (data.id) {
        this.update(data);
      } else {
        this.addNew(data);
      }
      this.form.reset();
      this.scrollToBottom();
    }

  }

  edit(event) {
    super.editCall(`${this.APIs.init('EmployeeProfiles', event.id).Get}/${this.employee.id}/${this.profileId}`).subscribe(data => {
      this.getData(data);
      this.scrollToTop();
    });
  }

  addNew(employeeProfile: EmployeeProfile) {
    this.Service.post(this.APIs.init('EmployeeProfiles').Add, employeeProfile)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
      });
  }

  update(employeeProfile: EmployeeProfile) {
    this.Service.put(this.APIs.init('EmployeeProfiles').Update, employeeProfile)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
        this.roles.canAdd = this.canAddTemp;
      });
  }

  getData(employeeProfile: EmployeeProfile) {
    this.employeeProfile = employeeProfile;
    this.fillFormGroup();
  }

  delete(id): void {
    this.Service.delete(this.APIs.init(`EmployeeProfiles/delete/${id}/${this.employee.id}/${this.profileId}`).customEndPoint)
      .subscribe(async () => {
        let data: any = await this.loadPagedData();

        if (data) {
          this.Alert.showSuccess(this.localize.translate.instant('Message.DeleteSuccess'));
        }
      }, error => {
        //this.Alert.showError(error);
      });
  }

  fillFormGroup() {
    this.form = this.fb.group({
      id: [this.employeeProfile.id],
      detailId: [this.employeeProfile.detailId, Validators.required],
      startDate: [this.employeeProfile.startDate, Validators.required],
      endDate: [this.employeeProfile.endDate],
      currentAdminLeveNameFl: [this.employeeProfile.currentAdminLeveNameFl],
    });
  }


  changtab() {   
    
    this.loadPagedData();
    this.form.reset();
  }
  getLocations() {
    this.Service.getList(this.APIs.init('locations').GetAllForSelect)
      .subscribe(locations => {
        this.locations = locations;
      });
  }

  getContractTypes() {
    this.Service.getList(this.APIs.init('contractTypes').GetAllForSelect)
      .subscribe(contractTypes => {
        this.contractTypes = contractTypes;
      });
  }

  getJobs() {
    this.Service.getList(this.APIs.init('jobs').GetAllForSelect)
      .subscribe(jobs => {
        this.jobs = jobs;
      });
  }

  getJobDegrees() {
    this.Service.getList(this.APIs.init('jobDegrees').GetAllForSelect)
      .subscribe(jobDegrees => {
        this.jobDegrees = jobDegrees;
      });
  }

}
