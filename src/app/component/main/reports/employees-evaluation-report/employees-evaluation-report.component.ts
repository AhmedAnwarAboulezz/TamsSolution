import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employees-evaluation-report',
  templateUrl: './employees-evaluation-report.component.html',
  styleUrls: ['./employees-evaluation-report.component.scss']
})
export class EmployeesEvaluationReportComponent implements OnInit {
  option = new OptionControls();

  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = false;
    this.option.month = false;
    this.option.year = true;
    this.option.date = false;
    this.option.bicharts = false;
    this.option.ownPage = false;
  
    this.option.showoption=false;
  }

}
