import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-attendance-with-break',
  templateUrl: './employee-attendance-with-break.component.html',
  styleUrls: ['./employee-attendance-with-break.component.scss']
})
export class EmployeeAttendanceWithBreakComponent implements OnInit {
  option = new OptionControls();

  constructor() { }

  ngOnInit() {
    this.option.exemptionSign = true;

  }

}
