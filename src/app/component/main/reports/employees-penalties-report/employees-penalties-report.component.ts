import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employees-penalties-report',
  templateUrl: './employees-penalties-report.component.html',
  styleUrls: ['./employees-penalties-report.component.scss']
})
export class EmployeesPenaltiesReportComponent implements OnInit {


  option = new OptionControls();

  constructor() { }

  ngOnInit() {
    this.option.status = this.option.duty = this.option.weekend = this.option.restDay = this.option.holiday = this.option.date = false;
    this.option.date =  true;
    this.option.bicharts =false;
  }

}
