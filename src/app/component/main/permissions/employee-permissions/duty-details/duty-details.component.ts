import { Component, OnInit, Optional, Inject } from '@angular/core';
import { EmployeePermissionsService } from '../services/employee-permissions.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { DutyDate } from 'src/app/models/dutyDate';
import * as moment from 'moment';

@Component({
  selector: 'app-duty-details',
  templateUrl: './duty-details.component.html',
  styleUrls: ['./duty-details.component.scss']
})

export class DutyDetailsComponent extends BaseEditComponent implements OnInit {
  model: DutyDate = {};
  emplyeeDuty:any;
  isRestDay:string = "";
  isWeekEnd:string = "";

  get Service(): EmployeePermissionsService { return Shell.Injector.get(EmployeePermissionsService); }

  constructor(
    public dialogRef: MatDialogRef<DutyDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);    
    
    if (this.data) {
      this.model = this.data;
      this.emplyeeDuty = this.data;
      this.isNew = false;
     this.emplyeeDuty.dutyStartDate = this.data.dutyStartDate.includes('T') ? moment(this.data.dutyStartDate).format("DD/MM/YYYY") : this.data.dutyStartDate;
      this.emplyeeDuty.dutyEndDate = this.data.dutyEndDate.includes('T') ? moment(this.data.dutyEndDate).format("DD/MM/YYYY") : this.data.dutyEndDate;

      this.isRestDay = (this.localize.lang == "ar" && this.data.isRestDay) ?  "نعم" : (this.localize.lang == "ar" && !this.data.isRestDay) ? "لا" : (this.localize.lang != "ar" && !this.data.isRestDay) ? "No" : "Yes";
      this.isWeekEnd = (this.localize.lang == "ar" && this.data.isWeekEnd) ?  "نعم" : (this.localize.lang == "ar" && !this.data.isWeekEnd) ? "لا" : (this.localize.lang != "ar" && !this.data.isWeekEnd) ? "No" : "Yes";

    }
  }
  
  ngOnInit() {
  }

}
