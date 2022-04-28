import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-fullday-permissions-report',
  templateUrl: './employee-fullday-permissions-report.component.html',
  styleUrls: ['./employee-fullday-permissions-report.component.scss']
})
export class EmployeeFulldayPermissionsReportComponent implements OnInit {
  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = false;
    this.option.fullDayPermissionType=true;
  }
}
