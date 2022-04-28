import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Religion } from '../../../../../models/Religion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/shared';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { ReligionsService } from '../Services/religions.services';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-Religion',
  templateUrl: './Religion.component.html',
  styleUrls: ['./Religion.component.scss']
})



export class ReligionComponent extends BaseEditComponent implements OnInit {
  model: Religion = {};
  id: string;
  url = 'Religions/GetAllPaged';
  get Service(): ReligionsService { return Shell.Injector.get(ReligionsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ReligionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
   
      id: [this.model.id],
      code: [this.model.code, [Validators.maxLength(10)]],
      descriptionFl: [this.model.descriptionFl, [Validators.required,this.removeSpaces]],
      descriptionSl: [this.model.descriptionSl,this.removeSpaces],
    });
  }

  ngOnInit() {
  }

}
