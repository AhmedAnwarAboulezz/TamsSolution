import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { PenaltieTypesService } from '../services/penaltietypes.services';

@Component({
  selector: 'app-penaltie-type',
  templateUrl: './penaltie-type.component.html',
  styleUrls: ['./penaltie-type.component.scss']
})

export class PenaltieTypeComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  id: string;
  url = 'PenaltiesTypes/GetAllPaged';
  get Service(): PenaltieTypesService { return Shell.Injector.get(PenaltieTypesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<PenaltieTypeComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
   
      id: [this.model.id],
      penaltiesTypeFl: [this.model.penaltiesTypeFl, [Validators.required,this.removeSpaces]],
      penaltiesTypeSl: [this.model.penaltiesTypeSl,this.removeSpaces],
    });
  }

  ngOnInit() {
  }

}
