import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-allowances-report',
  templateUrl: './employee-allowances-report.component.html',
  styleUrls: ['./employee-allowances-report.component.scss']
})
export class EmployeeAllowancesReportComponent implements OnInit {

  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = false;
    this.option.allowanceType =true;

  }
}
