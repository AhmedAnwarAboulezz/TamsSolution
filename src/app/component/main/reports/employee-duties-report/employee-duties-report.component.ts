import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-duties-report',
  templateUrl: './employee-duties-report.component.html',
  styleUrls: ['./employee-duties-report.component.scss']
})
export class EmployeeDutiesReportComponent implements OnInit {

  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = false;

  }

}

