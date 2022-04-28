import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { LogTypeEnum } from 'src/app/enums/LogType';
import { EmployeeAttendanceLog } from 'src/app/models/employeeAttendanceLog';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';
import { EmployeesService } from '../../../user-management/employees/services/employees.service';
import { EmployeeAttendanceService } from '../../employee-attedances/services/employeeAttendance.service';
import * as moment from 'moment';


@Component({
  selector: 'app-absence-logs',
  templateUrl: './absence-logs.component.html',
  styleUrls: ['./absence-logs.component.scss']
})

export class AbsenceLogsComponent extends BaseEditComponent implements OnInit {
  model: EmployeeAttendanceLog[] = [];
  id: string;
  url = 'Reports/GetEmployeeAbsence';
  logTypes: any;
  remarks: any;
  searchValues: any;
  emplyeeDefaultImage: string = './assets/img/man.png';
  movementImage: string;
  logTypeEnum = LogTypeEnum;
  isViewDetils = false;
  stagesArray:any;
  templateDaysArray: number[] = [];
  imageArray: string[] = [];

  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }
  get Service(): EmployeeAttendanceService { return Shell.Injector.get(EmployeeAttendanceService); }
  get EmployeeService(): EmployeesService { return Shell.Injector.get(EmployeesService); }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AbsenceLogsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);


    if (this.data) {
      
      this.model = this.data.model;
      this.isViewDetils = this.data.isViewDetils;
      this.searchValues = this.data.searchValues;
      this.isNew = false;
      this.imageArray = this.data.model.map(element => element.actionImage);
    }
    console.log( this.model);
    console.log("imageArray", this.imageArray);
    this.getLookups();
    this.form = fb.group({
      employeeAttedanceLogs: this.getFormArray(this.model)
    });
    this.stagesArray = this.form.get('employeeAttedanceLogs') as FormArray; 
    for (let i = 1; i <= this.model.length; i++) {
      this.templateDaysArray.push(i);
    }
  }

  getFormArray(list): FormArray {
    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    } else {
      for (var i = 0; i < this.model.length; i++) {
        array.push(this.fb.group(list[i]));
      }
    }
    return array;
  }


  ngOnInit() {

  }

  getLookups() {
    this.Service.getLookup().subscribe(data => {     
      this.logTypes = data[0];
      this.remarks = data[1];
    });
  }

  onEditSave(employeeAttendance: any) {


    console.log("result", employeeAttendance);
    
    this.Service.putReq('UpdateList', employeeAttendance).subscribe((result: any) => {
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable('Reports/GetEmployeeAbsence', this.searchValues);
      this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      this.dialogRef.close();
    }, error => {
      this.Alert.showError(this.getErrorMessage(error));
    });
  }

  makePresent(){
    const controlArray = <FormArray> this.form.get('employeeAttedanceLogs');
    controlArray.controls[0].get('logTypeId').setValue(LogTypeEnum.IN);
    controlArray.controls[this.model.length - 1].get('logTypeId').setValue(LogTypeEnum.OUT);
  }

}
