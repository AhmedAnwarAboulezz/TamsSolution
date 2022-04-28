import { Component, OnInit, Optional, Inject, Host } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DutyDate } from 'src/app/models/dutyDate';
import { EmployeePermissionComponent } from '../employee-permission/employee-permission.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.scss']
})
export class LogDetailsComponent implements OnInit {
  model: any;
  hasData = false;
  logForm: any;
  permissionTime: any;

  logsDatesIn = ['12:00:00', '13:00:00', '13:33:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:33:00'];
  logsDatesOut = ['12:30:00', '18:33:00'];

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<LogDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.model = this.data;
      this.hasData = true;
      this.permissionTime = this.data.permissionTime;

    }
    this.logForm = fb.group({
      logInTime: [this.model.logIn[0]],
      logOutTime: [this.model.logOut[0]],
    });

  }

  ngOnInit() {

  }

  closedialog() {
    this.dialogRef.close(
      { event: this.permissionTime, logInTime: this.logForm.value.logInTime, logOutTime: this.logForm.value.logOutTime }
    );
  }

}
