import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-un-known-user-report',
  templateUrl: './un-known-user-report.component.html',
  styleUrls: ['./un-known-user-report.component.scss']
})


export class UnKnownUserReportComponent implements OnInit {
  option = new OptionControls();

  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = false;
    this.option.month = false;
    this.option.year = false;
    this.option.date = true;
    this.option.bicharts = false;
    this.option.ownPage = false;
    this.option.employee=false;  
    this.option.showoption=false;
    this.option.adminstrativeLevels=false;
    this.option.location=false;
    this.option.job=false;
    this.option.contract=false;
    this.option.qualifcation=false;
    this.option.groupby=false;
    this.option.nationality=false;
    this.option.logType = true;
    this.option.terminals = true;
    

  }

}