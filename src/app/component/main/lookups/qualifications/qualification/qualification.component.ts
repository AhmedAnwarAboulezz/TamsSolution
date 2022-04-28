import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Qualification } from '../../../../../models/Qualification';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { QualificationsService } from '../Services/qualifications.services';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss']
})



export class QualificationComponent extends BaseEditComponent implements OnInit {
  model: Qualification = {};
  id: string;
  url = 'Qualifications/GetAllPaged';
  get Service(): QualificationsService { return Shell.Injector.get(QualificationsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<QualificationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({     
      id: [this.model.id],
       qualificationTypeFl: [this.model.qualificationTypeFl, [Validators.required,this.removeSpaces]],
       qualificationTypeSl: [this.model.qualificationTypeSl,this.removeSpaces],
    });
  }

  ngOnInit() {
  }

}