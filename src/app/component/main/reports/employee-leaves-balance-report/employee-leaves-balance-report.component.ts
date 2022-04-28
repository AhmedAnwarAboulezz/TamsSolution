import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-leaves-balance-report',
  templateUrl: './employee-leaves-balance-report.component.html',
  styleUrls: ['./employee-leaves-balance-report.component.scss']
})
export class EmployeeLeavesBalanceReportComponent implements OnInit {

  option = new OptionControls();

  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = this.option.date = false;
    this.option.year = true;
    this.option.leavetype =true;

  }

}
