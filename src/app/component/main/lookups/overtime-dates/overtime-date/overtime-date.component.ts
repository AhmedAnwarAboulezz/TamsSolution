import { OverTimeType } from './../../../../../enums/OverTimeType';
import { Component, OnInit, Inject, Optional, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { OvertimeDate, OverTimeSettings, OverTimeLeaveTypes } from '../../../../../models/OvertimeDate';
import { MAT_DIALOG_DATA, MatDialogRef, MatCalendar, MatDatepicker, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { OvertimeDatesService } from '../Services/overtime-dates.services';
import { Shell } from 'src/app/component/shell';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { formatDate } from '@angular/common';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
//import moment, { default as _rollupMoment, Moment } from 'moment';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { Leavestype } from 'src/app/models/Leavestype';


const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-overtime-date',
  templateUrl: './overtime-date.component.html',
  styleUrls: ['./overtime-date.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OvertimeDateComponent extends BaseEditComponent implements OnInit {
  @ViewChild(MatDatepicker, null) matDatepicker: MatDatepickerModule;
  header = DatePickerHeader;
  model: OvertimeDate = {};
  leavesTypes: Leavestype[];

 // selectedDate = (new Date());
  isDefault = false;
  overtimeTypes = [];
  initialOvertimeSettings = [
    { overTimeTypeId: OverTimeType.Morning, rate: 0, startTime: '00:00', endTime: '00:00' , overTimeLeaveTypesIds: []},
    { overTimeTypeId: OverTimeType.Night, rate: 0, startTime: '12:00', endTime: '12:00' , overTimeLeaveTypesIds: []},
    { overTimeTypeId: OverTimeType.Weekend, rate: 0, startTime: '00:00', endTime: '00:00' , overTimeLeaveTypesIds: []},
    { overTimeTypeId: OverTimeType.Holiday, rate: 0, startTime: '00:00', endTime: '00:00' , overTimeLeaveTypesIds: [] },
  ];
  isViewDetils = false;
  id: string;
  leaveType:any[] = [];
  leaveIds:any;
  url = 'OverTimeDates/GetAllPaged';
  get Service(): OvertimeDatesService { return Shell.Injector.get(OvertimeDatesService); }
  constructor(

    public fb: FormBuilder,
    public dialogRef: MatDialogRef<OvertimeDateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);

  //   this.Service.getLeaveTypes().subscribe(data => {
  //     this.leavesTypes = data;
  //  });

    if (this.localize.lang == 'en') {
      this.overtimeTypes = ['Morning', 'Night', 'Weekend', 'Holiday/Leave'];
    } else {
      this.overtimeTypes = ['الصبــاح', 'المســـاء', 'نهايـة الاسبــوع', 'عطلة رسمية/أجازة'];
    }
    this.leavesTypes = data.leaveType;
    if (this.data.data) {

      this.model = this.data.data;
      this.isDefault = this.model.isDefault;
      this.isNew = false;
      
      this.leaveType = (this.data.data.overTimeSettings != null && this.data.data.overTimeSettings.length != 0) ? this.data.data.overTimeSettings.filter(x=> x.overTimeTypeId.toString() ==  OverTimeType.Holiday)[0].overTimeLeaveTypes : [];
      this.leaveIds = this.leaveType.map(a=> a.leaveTypeId);


      this.isViewDetils = data.isViewDetils;
      if (this.isViewDetils) {
        this.model = this.data.data;
      }
    }

    this.form = this.resetForm(this.model);
    console.log("this is form", this.form);
    

  }

  ngOnInit() {

  }
  getFormArray(list): FormArray {

    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    }
    for (let item of list) {

      array.push(this.fb.group(item));
    }
    return array;
  }
  resetForm(model: OvertimeDate): any {
    let result = this.fb.group({
      id: [model.id],     
      startDate: new FormControl(this.SetDate(moment(model.startDate), 1), Validators.required),
      endDate: new FormControl(this.SetDate(moment(model.endDate), 2), Validators.required),

      notes: [model.notes],
      isDefault: [this.isDefault],
      //overTimeLeaveTypes: [this.leaveType], 
      overTimeSettings: model.overTimeSettings && model.overTimeSettings.length > 0 ?
        this.getFormArray(model.overTimeSettings) : this.getFormArray(this.initialOvertimeSettings),
    });
    const controlArray = <FormArray> result.get('overTimeSettings');
    controlArray.controls[3].get('overTimeLeaveTypesIds').setValue(this.leaveIds);
    return result;
  }

  onClose(event) {
    let NewForm = event.form;
    if (NewForm.overTimeLeaveTypes != null) {
      NewForm.overTimeLeaveTypes = NewForm.overTimeLeaveTypes.filter(e => e != 0);
    }
    let NewModel = new OvertimeDate();
    let ResultDto = this.MapFormAndDto(NewForm, NewModel);
     let output = {
      buttonType: event.buttonType,
      form: ResultDto
     }
    this.leaveIds=[]
    this.isDefault = false;

    this.close(output, this.resetForm(new OvertimeDate()));
  }





  MapFormAndDto(NewForm, NewModel:OvertimeDate) {
    
    NewModel.id = NewForm.id;
    NewModel.startDate = NewForm.startDate;
    NewModel.endDate = NewForm.endDate;
    NewModel.isDefault = NewForm.isDefault;
    NewModel.notes = NewForm.notes;
    NewModel.overTimeSettings = NewForm.overTimeSettings;
    let test = NewModel.overTimeSettings[3];
    let overTimeTypes: OverTimeLeaveTypes[] = [];
    console.log(test.overTimeLeaveTypesIds )
    if(test.overTimeLeaveTypesIds != null )
    {
      test.overTimeLeaveTypesIds= test.overTimeLeaveTypesIds.filter(x=>x!=0);
      test.overTimeLeaveTypesIds.forEach((item) => {
          let leavetype = new OverTimeLeaveTypes();
          leavetype.id = null;
          leavetype.leaveTypeId = item;
          leavetype.overTimeSettingsId = test.id;
          overTimeTypes.push(leavetype);
        });
        test.overTimeLeaveTypes = overTimeTypes;
    }

    return NewModel;
  }














  toggleAllSelection(selected) {
    
    const controlArray = <FormArray>  this.form.get('overTimeSettings');
    if(this.isViewDetils)
    {
     return;
    }
   

    if (selected) {
    controlArray.controls[3].get('overTimeLeaveTypesIds').setValue([...this.leavesTypes.map(item => item.id), 0]);
    } else {
    controlArray.controls[3].get('overTimeLeaveTypesIds').setValue([]);
    }
  }
  toggleUnSelectAll(selected)
  {
    
    const controlArray = <FormArray>  this.form.get('overTimeSettings');
    var selectedItems= controlArray.controls[3].get('overTimeLeaveTypesIds').value.filter(e => e != 0);
    controlArray.controls[3].get('overTimeLeaveTypesIds').setValue(selectedItems);

  }

  chosenYearHandler(normalizedYear: Moment, type) {
    const ctrlValue = type === 1 ? this.form.controls.startDate.value : this.form.controls.endDate.value;
    ctrlValue.year(normalizedYear.year());
    if (type === 1) {
      this.form.controls.startDate.setValue(ctrlValue);
    } else if (type === 2) {
      this.form.controls.endDate.setValue(ctrlValue);
    }
  }
  monthCalc(normalizedMonth: Moment, type) {
    const ctrlValue = type === 1 ? this.form.controls.startDate.value : this.form.controls.endDate.value;
    ctrlValue.month(normalizedMonth.month());
    if (type === 1) {
      ctrlValue.date(1);
      this.form.controls.startDate.setValue(ctrlValue);
    } else if (type === 2) {
      ctrlValue.date(new Date(ctrlValue.year(), ctrlValue.month() + 1, 0).getDate());
      this.form.controls.endDate.setValue(ctrlValue);
    }
  }
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, type) {
    this.monthCalc(normalizedMonth, type);
    datepicker.close();
  }
  customeEndHandler(input) {
    let value = input.target.value.split('/');
    const ctrlValue = this.form.controls.endDate.value;
    let month = value[0];
    let year = value[1];
    let date = moment.parseZone(new Date(year, month, 0).getDate());
    ctrlValue.date(date);
    console.log(this.form.controls.endDate);
  }
  SetDate(date, type) {
    if (type === 1) {
      date.date(1);
    } else if (type === 2) {
      date.date(new Date(date.year(), date.month() + 1, 0).getDate());
    }
    return date;
  }
}

