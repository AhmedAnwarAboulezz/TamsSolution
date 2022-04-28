import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-leaves-report',
  templateUrl: './employee-leaves-report.component.html',
  styleUrls: ['./employee-leaves-report.component.scss']
})
export class EmployeeLeavesReportComponent implements OnInit {

  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = false;
    this.option.leavetype =true;
    this.option.unPaidLeave=true;

  }

}
