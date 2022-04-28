import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Holiday } from '../../../../../models/Holiday';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { holidaysService } from '../Services/holidays.services';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})


export class HolidayComponent extends BaseEditComponent implements OnInit {
  model: Holiday = {};
  id: string;
  url = 'Holidays/GetAllPaged';
  get Service(): holidaysService { return Shell.Injector.get(holidaysService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<HolidayComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
   
      id: [this.model.id],
      code: [this.model.code],
      publicHolidayNameFl: [this.model.publicHolidayNameFl, [Validators.required,this.removeSpaces]],
      publicHolidayNameSl: [this.model.publicHolidayNameSl,this.removeSpaces],
    });
  }

  ngOnInit() {
  }

}
