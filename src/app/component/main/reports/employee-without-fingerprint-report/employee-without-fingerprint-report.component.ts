import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-without-fingerprint-report',
  templateUrl: './employee-without-fingerprint-report.component.html',
  styleUrls: ['./employee-without-fingerprint-report.component.scss']
})
export class EmployeeWithoutFingerprintReportComponent implements OnInit {

  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = this.option.bicharts = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = false;
    this.option.allowanceType =false;

  }

}
