
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Location } from '../../../../../models/location';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { LocationsService } from '../Services/locations';
import { Shell } from 'src/app/component/shell';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent extends BaseEditComponent implements OnInit {

  countries: Country[];

  model: Location = {};
  id: string;
  url = 'Locations/GetAllPaged';
  get Service(): LocationsService { return Shell.Injector.get(LocationsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<LocationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.lookups();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      code: [this.model.code],
      locationFL: [this.model.locationFL, [Validators.required,this.removeSpaces]],
      locationSL: [this.model.locationSL,this.removeSpaces],
      description: [this.model.description],

      countryId: [this.model.countryId, Validators.required]
    });
  }
  ngOnInit() {
    
  }
  lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {
     this.countries = data;
    });
  }
}




 


