import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employeebreakreport',
  templateUrl: './employeebreakreport.component.html',
  styleUrls: ['./employeebreakreport.component.scss']
})
export class EmployeebreakreportComponent implements OnInit {


  option = new OptionControls();
  constructor() { 
    this.option.bicharts=false;
  }

  ngOnInit() {


  }

}
