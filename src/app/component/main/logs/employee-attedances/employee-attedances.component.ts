import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { DialogService } from 'primeng/api';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { Result } from 'src/app/core/table-details/models/Result';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AttendanceSearch } from 'src/app/models/attendanceSearch';
import { EmployeeAttendanceService } from './services/employeeAttendance.service';
import { throwIfEmpty } from 'rxjs/operators';
import * as moment from 'moment';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { EmployeeAttedanceComponent } from './employee-attedance/employee-attedance.component';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { AdvancedSearchComponent } from 'src/app/shared/components/advanced-search/advanced-search.component';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-employee-attedances',
  templateUrl: './employee-attedances.component.html',
  styleUrls: ['./employee-attedances.component.scss']
})

export class EmployeeAttedancesComponent implements OnInit {
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  header = DatePickerHeader;

  @ViewChild(AdvancedSearchComponent, null) advancedSearchComp: AdvancedSearchComponent;
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }

  get Service(): EmployeeAttendanceService { return Shell.Injector.get(EmployeeAttendanceService); }
  employeeLogs: Result;
  model: AttendanceSearch = {};
  advanceSearch: advancedSearch;
  form: FormGroup;
  logTypes: any;
  remarks: any;
  searchResult = true;
  locations: any;
  jobs: any;
  terminalips: any;

  constructor(public fb: FormBuilder
  ) {
    this.getLookups();
    let todayDate = new Date();
    this.advanceSearch = new advancedSearch();
    this.advanceSearch.typeProcess = 'Add';
    this.form = fb.group({
      employeeId: [this.model.employeeId],
      startDate: [todayDate],
      endDate: [todayDate],
      logTypeId: [this.model.logTypeId],
      remarkId: [this.model.remarkId],
      employeeStatusId: [this.model.employeeStatusId],
      terminalSerial: [this.model.terminalSerial],
      terminalIp: [this.model.terminalIp],
      adminstrationId: [],
      locationId: [],
      jobId: [],

    });

  }

  ngOnInit(): void {
    this.getLookups();
  }

  oninputChanges() {
  }
  searchToggle() {


    
    this.form.value.adminstrationId =
    this.form.value.adminstrationId != null ? this.form.value.adminstrationId.map(element => element.data) : null;
    if (this.form.value.remarkId != null) {
      this.form.value.remarkId = this.form.value.remarkId.filter(e => e != 0);
    }
    this.reloadGridComponant();
  }

  reloadGridComponant() {
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable('EmployeeAttedanceLogs/GetAllPaged', this.form.value);
  }

  toggleAllSelection(selected) {
    if (selected) {
      this.form.controls.remarkId
        .patchValue([...this.remarks.map(item => item.id), 0]);
    } else {
      this.form.controls.remarkId.patchValue([]);
    }

  }
  toggleUnSelectAll(selected)
  {
    var selectedItems= this.form.controls.remarkId.value.filter(e => e != 0);
    this.form.controls.remarkId.patchValue(selectedItems);

  }
  getLookups() {
    this.Service.getLookup().subscribe(data => {
      this.logTypes = data[0];
      this.remarks = data[1];
    });
    this.Service.getLocations().subscribe(data => {
      this.locations = data;
    });
    this.Service.getJobs().subscribe(data => {
      this.jobs = data;
    });
    this.Service.getTerminalIp().subscribe(data => {
      this.terminalips = data;
    });
  }

  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }

}
