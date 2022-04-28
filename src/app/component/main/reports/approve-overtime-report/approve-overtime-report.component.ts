import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-approve-overtime-report',
  templateUrl: './approve-overtime-report.component.html',
  styleUrls: ['./approve-overtime-report.component.scss']
})
export class ApproveOvertimeReportComponent implements OnInit {

  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = false;
    this.option.month = true;
    this.option.year = true;
    this.option.requestedBy = true;
    this.option.date = false;
  }


}
