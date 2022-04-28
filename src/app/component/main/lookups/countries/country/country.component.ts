import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { CountriesService } from '../Services/countries.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent extends BaseEditComponent implements OnInit {
  model: Country = {};
  id: string;
  url = 'countries/GetAllPaged';
  treeUrl = 'assets/data/files-lazy.json';

  get Service(): CountriesService { return Shell.Injector.get(CountriesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CountryComponent>,
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
      nameFl: [this.model.nameFl, [Validators.required, this.removeSpaces]],
      nameSl: [this.model.nameSl],
      treeValueMulti: [''],
      treeValueSingle: ['c1390664-f82a-4b73-aaea-08d7a57ac88b']
    });
  }

  ngOnInit() {
  }
  
}
