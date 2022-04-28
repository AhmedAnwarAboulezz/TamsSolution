import { Component, OnInit, Optional, Inject } from '@angular/core';
import { hourlyDuty } from 'src/app/models/hourlyDuty';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HourlyDutiesService } from '../Services/hourly-duties.service';
import { Shell } from 'src/app/component/shell';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import arLocale from '@fullcalendar/core/locales/ar';
import enLocale from '@fullcalendar/core/locales/en-au';

var locales = [arLocale];

@Component({
  selector: 'app-hourly-duty',
  templateUrl: './hourly-duty.component.html',
  styleUrls: ['./hourly-duty.component.scss']
})
export class HourlyDutyComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;

  model: hourlyDuty = {};
  id: string;
  url = 'HoursRotateds/GetAllPaged';
  get Service(): HourlyDutiesService { return Shell.Injector.get(HourlyDutiesService); }
  collapsed = false;
  events: any[];
  options: any;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<HourlyDutyComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.collapsed = true;
    }
    this.form = fb.group({
      id: [this.model.id],
      code: [this.model.code, [Validators.required,this.removeSpaces]],
      groupDescriptionFl: [this.model.groupDescriptionFl, Validators.required],
      groupDescriptionSl: [this.model.groupDescriptionSl],
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate, Validators.required],
      startTime: [this.model.startTime, Validators.required],
      workingHours: [this.model.workingHours, Validators.required],
      restHours: [this.model.restHours, Validators.required],
      note: [this.model.note]
    });
    this.form.controls['workingHours'].setValidators(Validators.min(1));
    this.form.controls['restHours'].setValidators(Validators.min(1));
    
    let validationIndexes = ['groupDescriptionFl', 'groupDescriptionSl','code'];
    validationIndexes.forEach((element, i) => {
       this.form.controls[element].setValidators([this.isExistValidator(this.form.controls[element], i),this.removeSpaces]);
    });

  }

  ngOnInit() {
    
    console.log(new Date(this.form.value.startDate))
    this.options = {
      //locale: this.localize.lang == 'en' ? enLocale:arLocale  ,
      contentHeight: 1098,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: ((this.form.value === null || this.form.value.startDate === null) ? 
      new Date() : new Date(this.form.value.startDate)),
      titleFormat: {
        year: 'numeric', month: 'short', day: 'numeric'
            },
      columnHeaderFormat: {
        day: 'numeric', month: 'numeric',  year: 'numeric'
      },
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek,month,agendaDay',
      },

      allDaySlot: false,
      editable: false,
      defaultView: 'timeGridWeek',    
      buttonText: {
        today:this.localize.lang == 'en'? 'Today': 'اليوم',
      },
      
    };
    
    if (this.form.value.id != null) {
      this.Service.postReq('GetSchedual', this.form.value).subscribe(result => {
        this.events = result as any[];
      });
    }
  }
  Set(data) {
    if (!data.startDate.toString().split('-')[1]) {
      data.startDate = data.startDate.format('YYYY-MM-DDTHH:MM:SS.MS');
    }
    if (!data.endDate.toString().split('-')[1]) {
      data.endDate = data.endDate.format('YYYY-MM-DDTHH:MM:SS.MS');
    }
    this.Service.postReq('GetSchedual', data).subscribe(result => {
      this.collapsed = !this.collapsed;
      this.events = result as any[];
      this.options.defaultDate = new Date(this.form.value.startDate);
    });
  }
  ReSet() {
    this.events = [];
    this.form.reset();

    if (!this.isNew) {
      this.form.controls['id'].setValue(this.model.id);

    }
  }

  onAddSave(event) {
    this.events = [];
    this.collapsed = false;
    super.close(event);
  }

  public isExistValidator(control: AbstractControl, type: any) : ValidatorFn
  {    
    return (group: FormGroup): ValidationErrors => {
       if(control.value != null && control.value){
         const values = (): hourlyDuty => ({
          groupDescriptionFl: type == 0 ? control.value : null,
          groupDescriptionSl: type == 1 ? control.value :null,
          code: type == 2 ? control.value :null,
          id: this.form.value.id
         });         
        this.Service.isExist(values()).subscribe(data => {
            if (data) {
                control.setErrors({notEquivalent: true});
            } else {
                control.setErrors(null);
            }                     
        });
       }
       else{
        control.setErrors({required: true });
       }
       return;
 };
}
}
