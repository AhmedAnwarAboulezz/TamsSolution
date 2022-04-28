import { RotatedDuty } from './../../../../../models/rotatedDuty';
import { DayType } from './../../../../../models/dayType';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { DailyRotatedSchedule } from 'src/app/models/dailyRotatedSchedule';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { DailyRotatedSchedulesService } from '../services/DayType/daily-rotated-schedules.service';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DayTypeEnum } from 'src/app/enums/DayTypeEnum';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-daily-rotated-schedule',
  templateUrl: './daily-rotated-schedule.component.html',
  styleUrls: ['./daily-rotated-schedule.component.scss']
})
export class DailyRotatedScheduleComponent extends BaseEditComponent implements OnInit {
  keys = Object.keys;
  dayTypeEnum = DayTypeEnum;
  days: string[];
  months: string[];
  year: number;
  currentYearNo: number;
  isCollapsed: boolean;
  scheduleArray = [];
  templateDaysArray: number[] = [];
  dayTypes: DayType[];
  rotatedDuties: RotatedDuty[];
  model: DailyRotatedSchedule = {};
  id: string;
  url = 'dailyRotatedSchedules/GetAllPaged';
  header = DatePickerHeader;

  dailyRotatedSchedulearray:any;

  isChanged = false;
  get Service(): DailyRotatedSchedulesService { return Shell.Injector.get(DailyRotatedSchedulesService); }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DailyRotatedScheduleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.lookups();

    if (this.localize.lang == 'en') {
      this.days = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
        '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
      ];
      this.months = [
        'January', 'Febuary', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
    } else {
      this.days = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
        '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
      ];
      this.months = [
        'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو',
        'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسيمبر',
      ];
    }

    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isChanged = true;
    }
   
    this.form = fb.group({
      id: [this.model.id],
      code: [this.model.code],
      groupDescriptionFl: [this.model.groupDescriptionFl, Validators.required],
      groupDescriptionSl: [this.model.groupDescriptionSl],
      note: [this.model.note],
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate, Validators.required],
      tempelateDay: [this.model.tempelateDay, Validators.required],
      dailyRotatedScheduleDetail: this.getFormArray(this.model.dailyRotatedScheduleDetail)
    });  
    
    for (let i = 1; i <= this.model.tempelateDay; i++) {
      this.templateDaysArray.push(i);
    }

    let validationIndexes = ['groupDescriptionFl', 'groupDescriptionSl','code'];
    validationIndexes.forEach((element, i) => {
       this.form.controls[element].setValidators([this.isExistValidator(this.form.controls[element], i),this.removeSpaces]);
    });
  }

  ngOnInit() {
    if (this.data) {
      this.apply();
    }
  }

  onTemplateDaysChange() {
    
    this.isChanged = false;
    let value = this.form.value.tempelateDay;
    let formStartdate = this.form.value.startDate;
    let formEnddate = this.form.value.endDate;
    if (value == null || formStartdate == null || formEnddate == null) {
      this.Alert.showError(this.localize.translate.instant('Message.orderSelect'));
      return false;
    }
    let daydifference = formEnddate.diff(formStartdate, 'days')+1;

    if(value <= 0|| value > daydifference){
      this.form.controls['tempelateDay'].setValue(null);
      return;
    }



    let array = this.form.get('dailyRotatedScheduleDetail') as FormArray;

    
    
  
    if (this.form.value.dailyRotatedScheduleDetail.length == 0) {
      this.templateDaysArray = [];
      let startDate = this.form.value.startDate as Date;
      if (startDate) {
        for (let i = 1; i <= value; i++) {
          this.templateDaysArray.push(i);
          array.push(this.fb.group({ dayDate: startDate, dayTypeId: '', rotatedDutyId: '' }));
          startDate = moment(startDate, 'DD-MM-YYYY').add(1, 'days').toDate();
        }
      }
    } else if (this.form.value.dailyRotatedScheduleDetail.length > this.form.value.tempelateDay) {
      let dailyLength = this.form.value.dailyRotatedScheduleDetail.length;
      for (let i = dailyLength - 1; i >= value; i--) {
        this.templateDaysArray.splice(i);
        array.removeAt(i);
      }
    } else {
      let dailyLength = this.form.value.dailyRotatedScheduleDetail.length;
      let startDate = this.form.value.dailyRotatedScheduleDetail[dailyLength - 1].dayDate as Date;
      for (let i = dailyLength + 1; i <= value; i++) {
        this.templateDaysArray.push(i);
        startDate = moment(startDate, 'DD-MM-YYYY').add(1, 'days').toDate();
        array.push(this.fb.group({ dayDate: startDate, dayTypeId: '', rotatedDutyId: '' }));
      }
    }

    this.isChanged = true;
  }

  onDayTypeIdChange(dayTypeId, index) {
    const controlArray = <FormArray>this.form.get('dailyRotatedScheduleDetail');
    if (dayTypeId == this.dayTypeEnum['RestDay']) {
      controlArray.controls[index].get('rotatedDutyId').setValue(null);
      controlArray.controls[index].get('rotatedDutyId').clearValidators();
    } else {
      controlArray.controls[index].get('rotatedDutyId').setValidators([Validators.required]);
    }
    controlArray.controls[index].get('rotatedDutyId').updateValueAndValidity();
  }

  apply() {
    let data = this.form.value;
    let yearno =
      data.startDate.toString().includes('T0') ? data.startDate.toString().split('-')[0] : data.startDate.toString().split(' ')[3];
    this.year = +yearno;
    this.currentYearNo = +yearno;
   

    this.ChangeYear('');
    this.Service.apply(data).subscribe((result: any) => {
      this.scheduleArray = result;
    }, error => {
      this.Alert.showError(this.getErrorMessage(error));
    });
    this.isCollapsed = true;
  }

  ChangeYear(method) {
    if (method == '+') {
      this.year = this.year + 1;
    } else if (method == '-') {
      this.year = this.year - 1;
    } else {
      this.year = this.year;
    }
  }
  getFormArray(list): FormArray {
    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    } else {
      for (var i = 0; i < this.model.tempelateDay; i++) {
        array.push(this.fb.group(list[i]));
      }
    }
    return array;
  }

  lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {
      this.dayTypes = data[0];
      this.rotatedDuties = data[1];
    });
  }

  onAddSave(event) {
    let result = { form: this.form.value, buttonType: event };
    if (event == 'Save') {
      this.templateDaysArray = [];
      let array = this.form.get('dailyRotatedScheduleDetail') as FormArray;
      array.clear();
      this.isCollapsed = false;

    }
    this.close(result);
  }

  public isExistValidator(control: AbstractControl, type: any) : ValidatorFn
  {    
    return (group: FormGroup): ValidationErrors => {
       if(control.value != null && control.value){
         const values = (): DailyRotatedSchedule => ({
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
