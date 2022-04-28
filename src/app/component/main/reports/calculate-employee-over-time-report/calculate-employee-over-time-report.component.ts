import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-calculate-employee-over-time-report',
  templateUrl: './calculate-employee-over-time-report.component.html',
  styleUrls: ['./calculate-employee-over-time-report.component.scss']
})

export class CalculateEmployeeOverTimeReportComponent implements OnInit {

  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.bicharts
     = this.option.weekend = this.option.restDay = this.option.holiday = false;

  }

}
