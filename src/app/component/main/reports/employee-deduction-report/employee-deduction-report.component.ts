import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-deduction-report',
  templateUrl: './employee-deduction-report.component.html',
  styleUrls: ['./employee-deduction-report.component.scss']
})

export class EmployeeDeductionReportComponent implements OnInit {
  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = false;
    this.option.month = true;
    this.option.year = true;
    this.option.date = false;
    this.option.bicharts = false;
    this.option.ownPage = false;
  
    this.option.showoption=false;

  }
}
