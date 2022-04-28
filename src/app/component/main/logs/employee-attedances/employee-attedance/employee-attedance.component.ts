import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeAttendanceService } from '../services/employeeAttendance.service';
import { Shell } from 'src/app/component/shell';
import { EmployeeAttendanceLog } from 'src/app/models/employeeAttendanceLog';
import * as moment from 'moment';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';
import { LogTypeEnum } from 'src/app/enums/LogType';
import { EmployeesService } from '../../../user-management/employees/services/employees.service';
import { AttendanceSearch, AttendanceSearchImage } from 'src/app/models/attendanceSearch';

@Component({
  selector: 'app-employee-attedance',
  templateUrl: './employee-attedance.component.html',
  styleUrls: ['./employee-attedance.component.scss']
})

export class EmployeeAttedanceComponent extends BaseEditComponent implements OnInit {
  model: EmployeeAttendanceLog = {};
  id: string;
  url = 'EmployeeAttedanceLogs/GetAllPaged';
  logTypes: any;
  remarks: any;
  searchValues: any;
  emplyeeDefaultImage: string = './assets/img/man.png';
  movementImage: string = './assets/img/man.png';
  logTypeEnum = LogTypeEnum;
  isViewDetils = false;

  search: AttendanceSearchImage = {};
  currentCulture = this.localize.currentLang == 'ar' ? 'ar-EG' : 'en-US';
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }
  get Service(): EmployeeAttendanceService { return Shell.Injector.get(EmployeeAttendanceService); }
  get EmployeeService(): EmployeesService { return Shell.Injector.get(EmployeesService); }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeAttedanceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);

    if (this.data) {
      this.model = this.data.model;
      this.isViewDetils = this.data.isViewDetils;
      this.searchValues = this.data.searchValues;
      this.isNew = false;
    }
    console.log( this.model)
    this.getLookups();
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      employeeNameFl: [this.model.employeeNameFl, Validators.required],
      employeeNameSl: [this.model.employeeNameSl],
      employeeNumber: [this.model.employeeNumber],
      terminalSn: [this.model.terminalSn],
      terminalIp: [this.model.terminalIp],
      timeEntryStr:[moment.parseZone(new Date(this.model.timeEntry), this.currentCulture).format('DD-MM-YYYY HH:mm:ss'), Validators.required],
      timeEntry: [this.model.timeEntry],
      logTypeId: [this.model.logTypeId, Validators.required],
      remarkId: [this.model.remarkId, Validators.required],
      lastModfied: [this.model.lastModfied, Validators.required],
      imagePath:[this.model.imagePath]
    });
  }

  ngOnInit() {

  }

  getLookups() {
    this.Service.getLookup().subscribe(data => {
     
      this.logTypes = data[0];
      this.remarks = data[1];
    });
    this.search = {
      employeeId: this.data.model.employeeId,
      employeeNumber: this.data.model.employeeNumber,
      startDate: this.model.timeEntry,
      remarkId: this.model.remarkId,
      logTypeId: this.model.logTypeId,
      id: this.model.id
    };

    this.Service.getActionImage(this.search).subscribe(data => {
      
      // let checkImage = data.employeeImage != null ? data.employeeImage.split('data:')[0] : 'default';
      // this.emplyeeDefaultImage = (data.employeeImage && checkImage == '') ? data.employeeImage : './assets/img/man.png';
      this.movementImage = data != "" ? data :'./assets/img/man.png';
    });
    this.EmployeeService.getEmployeeImage(this.model.employeeId).subscribe(response => {
      
      if(response != null && response != ""){
        this.emplyeeDefaultImage = response;
      }
    });
  }

  onEditSave(employeeAttendance: any) {

    this.Service.putReq('Update', employeeAttendance).subscribe((result: any) => {
      if (result != null) {
        this.Alert.showError(this.localize.translate.instant('Message.UpdateError'));
        return false;
      }
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable('EmployeeAttedanceLogs/GetAllPaged', this.searchValues);
      this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      this.dialogRef.close();
    }, error => {
      this.Alert.showError(this.getErrorMessage(error));
    });
  }

}
