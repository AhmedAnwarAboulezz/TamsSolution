import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-permissions-report',
  templateUrl: './employee-permissions-report.component.html',
  styleUrls: ['./employee-permissions-report.component.scss']
})
export class EmployeePermissionsReportComponent implements OnInit {
  option = new OptionControls();

  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = this.option.date = false;
    this.option.month = this.option.year = true;
    this.option.partialPermissionType =true;

  }

}
