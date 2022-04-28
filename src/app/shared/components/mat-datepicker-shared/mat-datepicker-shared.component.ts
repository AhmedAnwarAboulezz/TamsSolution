import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { DatePickerHeader } from '../datepicker-header.component';
import { MatDatepicker } from '@angular/material';
import moment, { Moment } from 'moment';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from 'src/app/component/shell';
import { FormGroup, ControlContainer, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mat-datepicker-shared',
  templateUrl: './mat-datepicker-shared.component.html',
  styleUrls: ['./mat-datepicker-shared.component.scss']
})
export class MatDatepickerSharedComponent implements OnInit {
  @Input() lblName: String;
  @Input() required: boolean=false;
  @Input() title: String;
  @Input() matDatepicker: String;
  @Input() isViewDetils: boolean=false;
  @Input() isChanged: boolean=false;
  @Input() validform: boolean=false;
  @Input() isDefault: boolean=false;
  @Input() inputDisabled: boolean=false;
  @Input() inputreadonly: boolean=false;
  @Input() namecontrol: String;
  @Input() parentForm: any;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  @Input() appearance: String="outline";
  @Output() event: EventEmitter<any> = new EventEmitter<any>();

  init:boolean = false;
  header = DatePickerHeader;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }

  constructor() {     
  }

  ngOnInit() {
    this.init = true;
  }
  onDateChange()
  {
    this.event.emit();
  }  
  
  onOpen(datepicker: MatDatepicker<Moment>) {
    var matCalendar = document.getElementsByClassName("mat-calendar")[0];
    var button = document.createElement("mat-button");
    button.style.color = 'white';
    button.style.backgroundColor = '#3f51b5';
    button.className = "mat-button";
    button.style.bottom = '5px';
    button.style.position = 'absolute';
    button.style.left = '120px';
    button.style.height = '20px';
    button.style.padding = '0';
    button.style.border = '0';
    button.style.textAlign = 'center';
    button.style.lineHeight = '20px';

    button.addEventListener("click", function(){
      
      const today = moment().utcOffset(0);
      today.set({hour:0,minute:0,second:0,millisecond:0})
      today.toISOString()
      today.format()
      datepicker.select(today);
      datepicker.close();
    }, false);
    
    var today="Today";
    if (this.localize.lang != 'en') {
      today="الـيــــوم";
    }
    
    var text = document.createTextNode(today);


    button.appendChild(text);

    matCalendar.appendChild(button);
  }
}
