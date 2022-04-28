import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-overtime-report',
  templateUrl: './employee-overtime-report.component.html',
  styleUrls: ['./employee-overtime-report.component.scss']
})
export class EmployeeOverTimeOrdersReportComponent implements OnInit {
  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = this.option.bicharts= this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = false;

  }

}
