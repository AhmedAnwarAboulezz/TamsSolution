import { Component, OnInit, Optional, Inject } from '@angular/core';
import { HolidayDate } from '../../../../../models/HolidayDate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { Holiday } from 'src/app/models/Holiday';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { HolidayDatesService } from '../Services/holidayDates.services';
import { Shell } from 'src/app/component/shell';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-holiday-date',
  templateUrl: './holidayDate.component.html',
  styleUrls: ['./holidayDate.component.scss']
})
export class HolidayDateComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;

  model: HolidayDate = {};
  id: string;
  url = 'HolidayDates/GetAllPaged';
  get Service(): HolidayDatesService { return Shell.Injector.get(HolidayDatesService); }
  form: FormGroup;
  countries: Country[];
  holidays: Holiday[];

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<HolidayDateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    super(dialogRef);
    this.getLookups();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      holidayId: [this.model.holidayId, Validators.required],
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate, Validators.required],
      countryId: [this.model.countryId, Validators.required],
      note: [this.model.note],
    });
  }

  ngOnInit() {

  }

  getLookups(): void {
    this.Service.getLookup()
      .subscribe(data => {
        this.countries = data[0];
        this.holidays = data[1];
      });
  }

}
