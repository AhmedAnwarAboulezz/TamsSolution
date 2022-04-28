
import { NativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { Inject, Optional } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

export const MOMENT_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD HH:mm:ss',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  },
};



export class CustomDateAdapter extends NativeDateAdapter {
  subscription: any;
  constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
    super(dateLocale, new Platform());
  
  }

  format(date: Date, displayFormat?: string | Object): string {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let result = moment.utc({ year, month, day }).locale(this.locale);
    let formattedDate = super.format(date, displayFormat);
    return formattedDate;
  }
}
