import { NgModule } from '@angular/core';

import {
  DateAdapter, MAT_DATE_FORMATS, MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE
} from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from './MomentUtcDateAdapter';
import { MOMENT_FORMATS, CustomDateAdapter } from './custom-date-adapter';

registerLocaleData(localeAr, 'ar-AR');
registerLocaleData(localeEn, 'en-GB');
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  
  ]
})
export class DatePickerModule { }
