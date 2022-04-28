import { WeekDays } from './../../enums/WeekDays';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { WeekDay } from 'src/app/models/weekday';
import { WeekDayService } from './services/weekDay.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from 'src/app/component/shell';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-week-days',
  templateUrl: './week-days.component.html',
  styleUrls: ['./week-days.component.scss']
})
export class WeekDaysComponent implements OnInit, OnChanges {

  daysOfWeek: day[] = [];

  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() initialList = [];
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }

 

  constructor(translate: TranslateService) {
    for (let item of Object.keys(WeekDays)) {
      let result;
      translate.get(`weekday.${item}`).subscribe((text: string) => result = text);
      this.daysOfWeek.push({ name: result, value: WeekDays[item], isChecked: false, disabled: true });
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    // don't call calculateDates in the first time the component loads
    if (!changes['initialList']) {
      this.calculateDates();
    }
  }

  resetData() {
    
    this.initialList == [];
    for (let item of this.daysOfWeek) {
      item.isChecked = false;
    }
  }

  fillDaysOfWeekWithInitialList() {
    if (!this.initialList) {
      return;
    }
    this.calculateDates();
    for (let item of this.daysOfWeek.filter(e=>e['isChecked'] == true)) {
      item.isChecked = false;
      if (this.initialList.filter(e => e['weekdayId'] == item.value).length > 0) {
        item.isChecked = true;
      }
    }
  }

  ngOnInit() {
    if (!this.initialList) {
      this.calculateDates();
    } else {
      this.fillDaysOfWeekWithInitialList();
    }
  }

  getWeekDays() {

    return this.daysOfWeek;
  }

  

  onChange(i, checked) {
    this.daysOfWeek[i].isChecked = checked;
  }

  calculateDates() {
    if (!this.startDate || !this.endDate) {
      return;
    }
    try {
      var start = moment.parseZone(this.startDate);
      var end = moment.parseZone(this.endDate);
      var startDay = start.day();
      var endDay = end.day();
      var duration = moment.duration(end.diff(start));
      var differenceDays = duration.asDays();
      if (differenceDays >= 7) {
        this.daysOfWeek.forEach(item => {
          item.isChecked = true;
          item.disabled = false;
        });
      } else {
        if (startDay > endDay) {
          this.daysOfWeek.forEach(item => {
            item.isChecked = true;
            item.disabled = false;
          });
          for (let i = endDay + 1; i < startDay; i++) {
            this.daysOfWeek[i].isChecked = false;
            this.daysOfWeek[i].disabled = true;
          }
        } else {
          this.daysOfWeek.forEach(item => {
            item.isChecked = false;
            item.disabled = true;
          });
          for (let i = startDay; i <= endDay; i++) {
            this.daysOfWeek[i].isChecked = true;
            this.daysOfWeek[i].disabled = false;
          }
        }

      }

    } catch (e) {
    }
  }

}

interface day {
  name;
  value;
  isChecked;
  disabled;
}
