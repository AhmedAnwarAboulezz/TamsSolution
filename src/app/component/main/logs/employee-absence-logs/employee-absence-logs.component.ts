import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Shell } from 'src/app/component/shell';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { AttendanceSearch } from 'src/app/models/attendanceSearch';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { AdvancedSearchComponent } from 'src/app/shared/components/advanced-search/advanced-search.component';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { EmployeeAttendanceService } from '../employee-attedances/services/employeeAttendance.service';
import { AbsenceLogsComponent } from './absence-logs/absence-logs.component';
import { AutoSolveLogsComponent } from './auto-solve-logs/auto-solve-logs.component';

@Component({
  selector: 'app-employee-absence-logs',
  templateUrl: './employee-absence-logs.component.html',
  styleUrls: ['./employee-absence-logs.component.scss'],
})

export class EmployeeAbsenceLogsComponent implements OnInit {
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  header = DatePickerHeader;

  @ViewChild(AdvancedSearchComponent, null) advancedSearchComp: AdvancedSearchComponent;
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }

  get Service(): EmployeeAttendanceService { return Shell.Injector.get(EmployeeAttendanceService); }
  //employeeLogs: Result;
  model: AttendanceSearch = {};
  advancedSearch: advancedSearch;
  form: FormGroup;
  logTypes: any;
  remarks: any;
  locations: any;
  jobs: any;
  terminalips: any;
  statusList: any;



  constructor(public fb: FormBuilder,
    public dialog: MatDialog    
    ) {
    this.getLookups();
    let todayDate = new Date();
    this.advancedSearch = new advancedSearch();
    this.form = fb.group({
      employeeId: [this.model.employeeId],
      startDate: [todayDate],
      endDate: [todayDate],
      adminstrationId: [],
      locationId: [],
      jobId: [],
      statusId: []
    });

  }

  ngOnInit(): void {
  }

  oninputChanges() {
  }
  searchToggle() {    
    this.form.value.adminstrationId =
    this.form.value.adminstrationId != null ? this.form.value.adminstrationId.map(element => element.data) : null;
    this.reloadGridComponant();
  }

  reloadGridComponant() 
  {
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable('Reports/GetEmployeeAbsence', this.form.value);
  }

  getLookups() 
  {
    this.Service.getLocations().subscribe(data => {
      this.locations = data;
    });
    this.Service.getJobs().subscribe(data => {
      this.jobs = data;
    });
    this.Service.getStatus().subscribe(data => {
      this.statusList = data.filter(a=>a.id == 2 || a.id == 3 || a.id == 11);
    });
    
    // this.Service.getLookup().subscribe(data => {
    //   this.logTypes = data[0];
    //   this.remarks = data[1];
    // });
    // this.Service.getTerminalIp().subscribe(data => {
    //   this.terminalips = data;
    // });
  }

  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }


  openDetails(){
    // let maindata = {
    //    nameFl: this.form.value.dutyDescriptionFl, 
    //    nameSl: this.form.value.dutyDescriptionSl, 
    //    dutyTypeId: this.form.value.dutyTypeId
    // };

    let data = { searchValues: this.form.value , isPreviewOnly: false };
    this.openViewDetail(AutoSolveLogsComponent, data, '1300px');


  //   this.Service.getDutyByMainData(maindata).subscribe(res => {
  //     let data = { data: res, isViewDetils: false };
  //    this.openViewDetail(AutoSolveLogsComponent, data, '1300px');
  //  });
 }
 openViewDetail(dialog: any, data: any, width = '1100px') {
   this.openDialog(dialog, data, width);
 }
 protected openDialog(dialog: any, data: any, width: any, height?:any): void {
   this.dialog.open(dialog, {
     height,
     width,
     data,
     panelClass: 'my-dialog',
     direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr'),
     disableClose:true
   });
 }

}
