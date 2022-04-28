import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmployeeLog } from 'src/app/models/EmployeeLog';
import { EmployeeLogsService } from '../services/employee-logs.service';
import { Shell } from 'src/app/component/shell';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { LogTypeEnum } from 'src/app/enums/LogType';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-employee-log',
  templateUrl: './employee-log.component.html',
  styleUrls: ['./employee-log.component.scss']
})
export class EmployeeLogComponent extends BaseEditComponent implements OnInit {
  logTypeEnum = LogTypeEnum;
  logTypes: any;
  model: EmployeeLog = {};
  id: string;
  header = DatePickerHeader;

  url = 'EmployeeLogs/GetAllPaged';
  get Service(): EmployeeLogsService { return Shell.Injector.get(EmployeeLogsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeLogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getLookups();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
    }
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      logDate: [this.model.logDate, Validators.required],
      logTime: [this.model.logTime, Validators.required],
      logTypeId: [this.model.logTypeId, Validators.required],
    });
  }

  getLookups() {
    this.Service.getLookup().subscribe(data => {
        this.logTypes = data[0]

      });
  }
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }
}
