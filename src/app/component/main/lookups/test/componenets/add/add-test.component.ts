import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { TestService } from '../../services/test.service';
import { Shell } from 'src/app/component/shell';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add.test.component.scss'],
})
export class AddTestComponent extends BaseEditComponent {
  model: Country = {};
  id: string;
  url = 'countries/GetAllPaged';



  get Service(): TestService { return Shell.Injector.get(TestService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTestComponent>,
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
      nameFl: [this.model.nameFl, Validators.required],
      nameSl: [this.model.nameSl, Validators.required]
    });
  }

}
