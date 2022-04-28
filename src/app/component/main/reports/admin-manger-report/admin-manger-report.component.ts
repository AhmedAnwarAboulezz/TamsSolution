import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-admin-manger-report',
  templateUrl: './admin-manger-report.component.html',
  styleUrls: ['./admin-manger-report.component.scss']
})
export class AdminMangerComponent implements OnInit {

  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.status = 
    this.option.duty = this.option.weekend = 
    this.option.restDay =this.option.job =this.option.contract =
    this.option.month = this.option.qualifcation= this.option.groupby= this.option.bicharts =
     this.option.year = this.option.holiday =this.option.location = false;

   

  }

}
