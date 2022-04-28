import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Nationality } from '../../../../../models/Nationality';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { NationalitiesService } from '../Services/nationalities.services';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.scss']
})


export class NationalityComponent extends BaseEditComponent implements OnInit {
  model: Nationality = {};
  id: string;
  url = 'Nationalities/GetAllPaged';
  get Service(): NationalitiesService { return Shell.Injector.get(NationalitiesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<NationalityComponent>,
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
      nationalityFl: [this.model.nationalityFl, [Validators.required,this.removeSpaces]],
      nationalitySl: [this.model.nationalitySl,this.removeSpaces],
    });
  }

  ngOnInit() {
  }

}
