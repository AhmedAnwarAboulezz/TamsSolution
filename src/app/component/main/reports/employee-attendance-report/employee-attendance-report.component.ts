import { Component, OnInit } from '@angular/core';
import { Shell } from 'src/app/component/shell';
import { EmployeeAttendanceReportService } from './services/employee-attendance-report.service';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-attendance-report',
  templateUrl: './employee-attendance-report.component.html',
  styleUrls: ['./employee-attendance-report.component.scss']
})
export class EmployeeAttendanceReportComponent implements OnInit {
  option = new OptionControls();
  constructor() {
    
   }
  get Service(): EmployeeAttendanceReportService { return Shell.Injector.get(EmployeeAttendanceReportService); }

  ngOnInit() {
    this.option.exemptionSign = true;
  }
}
