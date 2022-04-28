import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-on-service-report',
  templateUrl: './employee-on-service-report.component.html',
  styleUrls: ['./employee-on-service-report.component.scss']
})
export class EmployeeOnServiceReportComponent implements OnInit {

  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = false;
    this.option.employee = false;
    this.option.date = false;
    this.option.weekend = false;
    this.option.restDay = false;
    this.option.holiday = false;
    this.option.serviceStatus = true;
    this.option.duty = false;
    this.option.showoption=false;

  }
}
