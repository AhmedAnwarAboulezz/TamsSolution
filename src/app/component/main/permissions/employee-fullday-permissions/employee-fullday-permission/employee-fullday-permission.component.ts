import { WeekDaysComponent } from './../../../../../core/week-days/week-days.component';
import { Component, OnInit, Inject, ViewChild, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmployeeFulldayPermission } from 'src/app/models/EmployeeFulldayPermission';
import { EmployeeAllowanceWeekday } from 'src/app/models/EmployeeAlowance';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { EmployeeFulldayPermissionsService } from '../services/employee-fulldayPermissions.service';
import { Shell } from 'src/app/component/shell';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import moment from 'moment';

@Component({
  selector: 'app-employee-fullday-permission',
  templateUrl: './employee-fullday-permission.component.html',
  styleUrls: ['./employee-fullday-permission.component.scss']
})

export class EmployeeFulldayPermissionComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;
  model: EmployeeFulldayPermission = {};
  id: string;
  selectedFile: string;
  fulldayPermissions: EmployeeFulldayPermission[];
  startDate = new Date();
  endDate = new Date();
  employeeFulldayPermissionWeekdays: EmployeeAllowanceWeekday[];
  weekDays;
  fullDayId;
  filePath: string;
  serviceName = 'Permissions';
  @ViewChild('weekdays', { static: false }) weekDaysComponent: WeekDaysComponent;

  url = 'EmployeeFullDayPermissions/GetAllPaged';
  get Service(): EmployeeFulldayPermissionsService { return Shell.Injector.get(EmployeeFulldayPermissionsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFulldayPermissionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getLookups();

    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
      this.filePath = this.model.fileName != null ? this.model.fileName.split('-')[0] : null;
    }
    this.fullDayId = this.model.fullDayId;
    this.startDate = this.model.startDate;
    this.endDate = this.model.endDate;
    this.selectedFile = this.model.fileName;
    this.form = this.resetForm(this.model);
    this.weekDays = this.model.fullDayPermissionWeekdays;
  }
  getFormArray(list): FormArray {
    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    }
    for (let item of list) {
      array.push(this.fb.group(item));
    }
    return array;
  }
  setSelectDays(){
    this.startDate =this.form.get('startDate').value
    this.endDate=this.form.get('endDate').value
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
    this.form.value.fullDayPermissionWeekdays = this.employeeFulldayPermissionWeekdays;
  }

  onAddSave(event) {
    let weekDays = this.weekDaysComponent.getWeekDays()
      .filter(e => e.isChecked == true)
      .map((day) => ({ weekdayId: day.value, fullDayPermissionId: this.model.id }));
    event.form.fullDayPermissionWeekdays = weekDays;
    if (weekDays.length == 0) {
      this.Alert.showError(this.localize.translate.instant('Message.selectDays'));
      return;
    }
    this.close(event, this.resetForm(new EmployeeFulldayPermission()));
    if (event.buttonType === 'Save') {
      this.isNew = true;
      this.weekDaysComponent.resetData();
      this.isDisable = false;
      this.selectedFile = null;
      this.filePath='';
    }
  }

  getLookups(): void {
    this.Service.getLookup()
      .subscribe(data => {
        this.fulldayPermissions = data[0];
      });
  }

  resetForm(model: EmployeeFulldayPermission): any {
    let resetForm = this.fb.group({
      id: [model.id],
      fullDayId: [model.fullDayId, Validators.required],
      employeeId: [model.employeeId, Validators.required],
      startDate: [model.startDate, Validators.required],
      endDate: [model.endDate, Validators.required],
      fileName: [''],
      comment:[model.comment],
      filePath: [''],
      fullDayPermissionWeekdays: this.getFormArray(model.fullDayPermissionWeekdays),
      workflowStatusId: [model.workflowStatusId]

    });
    return resetForm;
  }

  ngOnInit() {
  }
  setEndDate() {
    let startDate = this.form.value.startDate;
    if (startDate != null) {
      let start = moment.parseZone(startDate);
      this.form.controls['endDate'].setValue(start);
    }
  }
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }
  
}
