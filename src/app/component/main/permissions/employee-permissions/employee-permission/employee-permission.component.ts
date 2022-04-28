import { Component, OnInit, Inject, Optional, ElementRef } from '@angular/core';
import { EmployeePermission } from 'src/app//models/employeepermission';
import { Employee } from 'src/app/models/employee';
import { PartialPermissionType } from 'src/app/models/PartialPermissionType';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, DialogPosition } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { PermissionTime } from 'src/app/models/PermissionTime';
import { PermissionBalance } from 'src/app/models/PermissionBalance';
import { PermissionBalanceParam } from 'src/app/models/PermissionBalanceParam';
import { PermissionTimeEnum } from 'src/app/enums/PermissionTimeEnum';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { EmployeePermissionsService } from '../services/employee-permissions.service';
import { Shell } from 'src/app/component/shell';
import { DutyTimeEmployee } from 'src/app/models/dutyTimeEmployee';
import { Time } from '@angular/common';
import * as moment from 'moment';
import { DutyTypesEnum } from 'src/app/enums/DutyTypesEnum';
import { DutyDetailsComponent } from '../duty-details/duty-details.component';
import { LogDetailsComponent } from '../log-details/log-details.component';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { debug } from 'console';

@Component({
  selector: 'app-employee-permission',
  templateUrl: './employee-permission.component.html',
  styleUrls: ['./employee-permission.component.scss']
})

export class EmployeePermissionComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;
  model: EmployeePermission = {};
  Employees: Employee[];
  PartialPermissionTypes: PartialPermissionType[];
  PermissionTimes: PermissionTime[];
  employeeIdAfterSelect;
  partialPermissionIdAfterSelect;
  permissionTimeIdAfterSelect;
  permissionDateAfterSelect;
  selectedFile: string;
  PermissionBalance: PermissionBalance;
  permissionBalanceParam: PermissionBalanceParam;
  startTimeMin: Time;
  endTimeMin: Time;
  startTimeDisable = true;
  endTimeDisable = true;
  PermissionTypeDisable = true;
  editFirstOne: boolean;
  logInTime: Time;
  logOutTime: Time;
  emplyeeDutyData: any;
  allPermissionTimes: PermissionTime[];
  hourlyDuty = false;

  permissionTimeDisabled = false;

  hasLogs = false;
  logInTimes: string[] = [];
  logOutTimes: string[] = [];

  logInTimeString: string;
  logOutTimeString: string;
  serviceName = 'Permissions';
  filePath: string;

  id: string;
  url = 'EmployeePermissions/GetAllPaged';
  get Service(): EmployeePermissionsService { return Shell.Injector.get(EmployeePermissionsService); }

  get MatDialog(): MatDialog { return Shell.Injector.get(MatDialog); }

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeePermissionComponent>,
    public dialog: MatDialog,
    public elRef: ElementRef,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super(dialogRef);
    if (this.data) {
      
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
      this.filePath = this.model.fileName != null ? this.model.fileName.split('-')[0] : null;

    }

    this.getLookups();
    this.employeeIdAfterSelect = this.model.employeeId;
    this.permissionDateAfterSelect = this.model.startDate;
    this.partialPermissionIdAfterSelect = this.model.partialPermissionTypeId;
    this.permissionTimeIdAfterSelect = this.model.permissionTimeId;
    this.selectedFile = this.model.fileName;

    if (!this.isNew) {
      console.log('Test0', this.model);

      this.editFirstOne = false;
      this.PermissionBalance = new PermissionBalance();
      this.onChangePermissionTime(this.model.permissionTimeId);
    }

    this.matIconRegistry.addSvgIcon(
      'alarm',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/alarm.svg'));

    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      startDate: [this.model.startDate, Validators.required],
      partialPermissionTypeId: [this.model.partialPermissionTypeId, Validators.required],
      permissionTimeId: [this.model.permissionTimeId, Validators.required],
      startTime: [this.model.startTime, Validators.required],
      endTime: [this.model.endTime, Validators.required],
      permissionDuration: [this.model.permissionDuration],
      totalAllowances: [this.model.totalAllowances],
      fileName: [''],
      filePath: [''],
      workflowStatusId: [this.model.workflowStatusId]


    });
    this.CallPermissionBalance();
    this.onEmployeeChange();
  }

  protected openDialog(dialog: any, data: any, maxWidth: any, maxHeight?: any, position?: any): void {
    const dialogRef = this.dialog.open(dialog, {
      maxHeight,
      maxWidth,
      data,
      panelClass: 'my-dialog',
      position,
      direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr')
    });

    dialogRef.afterClosed().subscribe(result => {
      if (dialog == LogDetailsComponent && result.event != null) {
        if (result.event == 'saveIn') {
          this.form.controls.startTime.setValue(result.logOutTime);
        } else if (result.event == 'saveOut') {
          this.form.controls.endTime.setValue(result.logInTime);
        } else if (result.event == 'saveInOut') {
          this.form.controls.startTime.setValue(result.logOutTime);
          this.form.controls.endTime.setValue(result.logInTime);
        }
        this.CallTimeChanged();
      }
    });
  }

  getPosition() {

    let permssionType;
    let logstimes;

    if (PermissionTimeEnum.StartDuty == this.form.value.permissionTimeId) {
      permssionType = 'saveOut';
    } else if (PermissionTimeEnum.EndDuty == this.form.value.permissionTimeId) {
      permssionType = 'saveIn';
    } else if (PermissionTimeEnum.DuringDuty == this.form.value.permissionTimeId) {
      permssionType = 'saveInOut';
    } else {
      return;
    }
    logstimes = { logIn: this.logInTimes, logOut: this.logOutTimes, permissionTime: permssionType };
    this.openDialog(LogDetailsComponent, logstimes, '400px');

  }

  showDutyDetails() {

    const rectTop = this.elRef.nativeElement.getBoundingClientRect().top + 10;
    const rectRight = this.elRef.nativeElement.getBoundingClientRect().left + 4;
    let NewTop = rectTop + 'px';
    let NewLeft = rectRight + 'px';
    let dialogPos: DialogPosition;
    if (this.localize.lang === 'ar') {
      dialogPos = { top: NewTop, left: NewLeft };
    } else {
      dialogPos = { top: NewTop, right: NewLeft };
    }
    this.openDialog(DutyDetailsComponent, this.emplyeeDutyData, '800px', '230px', dialogPos);
  }

  onSelectedFilesChanged(inputFile: any) {
    try {
      const file: File = inputFile.files[0];
      if (file.size > 2000000) {
        this.Alert.showError(this.localize.translate.instant('Message.maxFileSize'));
        inputFile.value = null;
      } else {
        this.form.value.filePath = file.name;
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          this.form.value.fileName = event.target.result;
        });
        reader.readAsDataURL(file);
      }
    } catch (error) {
    }

  }
  CalculatePermission() {
    this.ReSetValues();
    if (this.employeeIdAfterSelect && this.permissionDateAfterSelect && this.partialPermissionIdAfterSelect) {
      this.CallPermissionBalance();

    } else {
    }

  }

  onChangeTemperoryData() {
    this.CalculatePermission();
  }

  onChangePermissionTime(newValue) {
    console.log('Test1', newValue);

    if (newValue != null) {
      this.permissionTimeIdAfterSelect = newValue;
      this.GetPermissionPalance();
    }
  }

  onStartTimeChange() {
    this.CallTimeChanged();
  }

  onEndTimeChange() {
    this.CallTimeChanged();
  }

  CallTimeChanged() {
    let stime = this.form.get('startTime').value;
    let etime = this.form.get('endTime').value;
    if (stime != '' && etime != '') {
      let defaultDate = new Date().toDateString();
      let actuallyStartTime = new Date(` ${defaultDate} ${stime}`);
      let actuallyEndTime = new Date(` ${defaultDate} ${etime}`);
      let diff = 0;
      if (actuallyEndTime > actuallyStartTime) {
        diff = actuallyEndTime.getTime() - actuallyStartTime.getTime();
      } else {
        diff = (24 * 60 * 60 * 1000) - (actuallyStartTime.getTime() - actuallyEndTime.getTime());
      }
      this.form.controls.permissionDuration.setValue(Math.floor(diff / 1000 / 60));
    }
  }

  CheckTimeChanges() {
    console.log('Test2 Time', this.permissionTimeIdAfterSelect);
    console.log('Test3 Time', this.editFirstOne);

    if (!this.isNew && !this.editFirstOne) {
      this.editFirstOne = true;
      if (PermissionTimeEnum.StartDuty == this.permissionTimeIdAfterSelect) {
        this.startTimeDisable = true;
        this.endTimeDisable = false;
      }
      if (PermissionTimeEnum.EndDuty == this.permissionTimeIdAfterSelect) {
        this.endTimeDisable = true;
        this.startTimeDisable = false;
      }
      if (PermissionTimeEnum.DuringDuty == this.permissionTimeIdAfterSelect) {
        this.endTimeDisable = false;
        this.startTimeDisable = false;
      }
    } else {
      if (PermissionTimeEnum.StartDuty == this.permissionTimeIdAfterSelect) {
        this.startTimeDisable = true;
        this.endTimeDisable = false;
        let newEndTime = moment(this.startTimeMin, 'HH:mm:ss').add(this.PermissionBalance.maxPeriod, 'minutes').format('HH:mm:ss');
        this.form.controls.startTime.setValue(this.startTimeMin);
        this.form.controls.endTime.setValue(newEndTime);
        this.form.controls.permissionDuration.setValue(this.PermissionBalance.maxPeriod);
      }
      if (PermissionTimeEnum.EndDuty == this.permissionTimeIdAfterSelect) {
        this.endTimeDisable = true;
        this.startTimeDisable = false;
        let newStartTime = moment(this.endTimeMin, 'HH:mm:ss').subtract(this.PermissionBalance.maxPeriod, 'minutes').format('HH:mm:ss');
        this.form.controls.endTime.setValue(this.endTimeMin);
        this.form.controls.startTime.setValue(newStartTime);
        this.form.controls.permissionDuration.setValue(this.PermissionBalance.maxPeriod);
      }
      if (PermissionTimeEnum.DuringDuty == this.permissionTimeIdAfterSelect) {
        this.endTimeDisable = false;
        this.startTimeDisable = false;
        this.form.controls.endTime.setValue('');
        this.form.controls.startTime.setValue('');
        this.form.controls.permissionDuration.setValue('');
      }
    }

  }

  GetPermissionPalance() {
    this.permissionBalanceParam = new PermissionBalanceParam();
    this.permissionBalanceParam.employeeId = this.employeeIdAfterSelect;
    this.permissionBalanceParam.permissionTimeId = this.permissionTimeIdAfterSelect;
    this.permissionBalanceParam.permissionTypeId = this.partialPermissionIdAfterSelect;
    this.permissionBalanceParam.startDate = this.permissionDateAfterSelect;
    let promise: any = new Promise((resolve) => {
      this.Service.getPermissionBalance(this.permissionBalanceParam).subscribe(permissionBalance => {
        console.log('per', permissionBalance);

        if (!this.isNew) {
          permissionBalance.remainingBalance = permissionBalance.remainingBalance + this.form.get('permissionDuration').value;
        } else {
          permissionBalance.remainingTime = permissionBalance.remainingTime - 1;
        }
        resolve(this.PermissionBalance = permissionBalance);
        this.SetEmployeeTotalAllowance();
        this.CheckTimeChanges();
      });
    });
    return promise;
  }

  CallPermissionBalance() {
    if (this.employeeIdAfterSelect != null &&
      this.permissionDateAfterSelect != null &&
      this.partialPermissionIdAfterSelect != null) {
      let dutyTimeEmployee = new DutyTimeEmployee();
      dutyTimeEmployee.EmployeeId = this.employeeIdAfterSelect;
      dutyTimeEmployee.DayDate = this.permissionDateAfterSelect;
      this.Service.getEmployeeDutyTime(dutyTimeEmployee).subscribe(Result => {
        this.hourlyDuty = false;
        this.emplyeeDutyData = Result;
        this.permissionTimeDisabled = false;
        this.startTimeMin = Result.timeDetails[0].startTime;
        this.endTimeMin = Result.timeDetails[0].endTime;

        this.SetEmployeeTotalAllowance();
      }, error => {
        this.emplyeeDutyData = null;
        this.startTimeMin = null;
        this.endTimeMin = null;
        this.permissionTimeDisabled = true;
        this.Alert.showError(this.getErrorMessage(error));
        this.SetEmployeeTotalAllowance();
      });

      this.Service.getEmployeeLogs(dutyTimeEmployee).subscribe(result => {
        if (result.logInTimes.length != 0 || result.logOutTimes.length != 0) {
          this.hasLogs = true;
        } else {
          this.hasLogs = false;
        }
        this.logInTimes = this.formateTimeList(result.logInTimes);
        this.logOutTimes = this.formateTimeList(result.logOutTimes);
      }, () => {
        this.logInTimes = null;
        this.logOutTimes = null;
        this.hasLogs = false;
      });
    }

  }
  formateTimeList(allTimes: Time[]): string[] {
    let formattedtimes: string[] = [];
    allTimes.forEach(element => {
      let newtime: string;
      let timeSplit = element.toString().split('.')[0].split(':');
      newtime = timeSplit[0] + ':' + timeSplit[1] + ':00';
      formattedtimes.push(newtime);
    });
    return formattedtimes;
  }
  ReSetValues() {
    this.employeeIdAfterSelect = this.form.value.employeeId;
    this.permissionDateAfterSelect = this.form.value.startDate;
    this.partialPermissionIdAfterSelect = this.form.value.partialPermissionTypeId;
    this.permissionBalanceParam = new PermissionBalanceParam();
    this.PermissionBalance = new PermissionBalance();
    this.permissionTimeIdAfterSelect = null;
    this.form.controls.permissionTimeId.setValue(null);
    this.form.controls.startTime.setValue(null);
    this.form.controls.endTime.setValue(null);
    this.form.controls.permissionDuration.setValue(null);
    this.form.controls.totalAllowances.setValue(null);
    this.isDisable = false;
  }
  getLookups(): void {
    this.Service.getLookup()
      .subscribe(data => {
        this.PermissionTimes = data[1];
      });
  }

  ngOnInit() {
  }
  ValidateForm(): boolean {

    if (this.emplyeeDutyData.isWeekEnd || this.emplyeeDutyData.isHoliday  ) {
      this.Alert.showError(this.localize.translate.instant('Message.inValidDaySelected'));
      return false;
    }
    let dutystarttime = moment(this.startTimeMin, 'HH:mm:ss');
    let dutyendtime = moment(this.endTimeMin, 'HH:mm:ss');
    let formstarttime = moment(this.form.get('startTime').value, 'HH:mm:ss');
    let formendtime = moment(this.form.get('endTime').value, 'HH:mm:ss');
    let formdurationtime = this.form.get('permissionDuration').value;

    if (this.emplyeeDutyData.dutyTypeId == DutyTypesEnum.Hourly) {
      let dateInPeriod = false;
      this.emplyeeDutyData.timeDetails.forEach(item => {
        let oldStartTime = moment(item.startTime, 'HH:mm:ss');
        let oldEndTime = moment(item.endTime, 'HH:mm:ss');
        if (formstarttime >= oldStartTime && formendtime <= oldEndTime) {
          dateInPeriod = true;
        }
      });
      if (!dateInPeriod) {
        this.Alert.showError(this.localize.translate.instant('Message.inValidDaySelected'));
        return false;
      }
    } else {
      if (dutyendtime >= dutystarttime) {
        if (formstarttime < dutystarttime || formendtime > dutyendtime || formstarttime > formendtime) {
          this.Alert.showError(this.localize.translate.instant('Message.inValidtimesSelected'));
          return false;
        }
      }

    }

    if (this.PermissionBalance.remainingTime < 0 && this.PermissionBalance.numberOfTime !== 0 ) {
      this.Alert.showError(this.localize.translate.instant('Message.noPermissionavalible'));
      return false;
    }
    
    if ((formdurationtime > this.PermissionBalance.maxPeriod && this.PermissionBalance.maxPeriod !== 0 && this.PermissionBalance.balance !== 0) || (formdurationtime > this.PermissionBalance.remainingBalance && this.PermissionBalance.balance !== 0)) {
      this.Alert.showError(this.localize.translate.instant('Message.inValidpermissionDuration'));
      return false;
    }
    return true;
  }

  onAddSave(event) {
    if (this.ValidateForm()) {
      event.form.startDate = moment.parseZone(event.form.startDate);
      this.close(event);
    }
  }

  SetEmployeeTotalAllowance() {
    let totalAllowances;
    if (this.PermissionBalance.useDutyAllowance) {
      if (this.permissionTimeIdAfterSelect == PermissionTimeEnum.StartDuty) {
        totalAllowances = this.PermissionBalance.totalallowances + (this.emplyeeDutyData.allowanceIn === null ?
         0 : this.emplyeeDutyData.allowanceIn);
      } else if (this.permissionTimeIdAfterSelect == PermissionTimeEnum.EndDuty) {
        totalAllowances = this.PermissionBalance.totalallowances + (this.emplyeeDutyData.allowanceOut === null ?
          0 : this.emplyeeDutyData.allowanceOut);
      } else {
        totalAllowances = this.PermissionBalance.totalallowances;
      }
    } else {
      totalAllowances = this.PermissionBalance.totalallowances;
    }

    this.form.controls.totalAllowances.setValue(totalAllowances);
  }

  onEmployeeChange() {
    let empId = this.form.value.employeeId;
    if (empId != null) {
      this.Service.getPartialPermissionsByEmpId(empId)
        .subscribe(data => {
          this.PartialPermissionTypes = data;
          if(!this.isNew && !this.PartialPermissionTypes.map(a=>a.id).includes(this.form.value.partialPermissionTypeId))
          {
            this.form.controls['partialPermissionTypeId'].setValue(null);
          }
        });
    } else {
      this.PartialPermissionTypes = null;
    }
    if (this.model.employeeId != empId) {
      this.form.controls.partialPermissionTypeId.setValue(null);
    }
  }

}
