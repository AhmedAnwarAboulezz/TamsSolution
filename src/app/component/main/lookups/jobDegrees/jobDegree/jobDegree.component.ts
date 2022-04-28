import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {JobDegree} from '../../../../../models/JobDegree';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { JobDegreesService } from '../Services/jobDegrees.services';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-jobDegree',
  templateUrl: './jobDegree.component.html',
  styleUrls: ['./jobDegree.component.scss']
})

export class JobDegreeComponent extends BaseEditComponent implements OnInit {
  model: JobDegree = {};
  id: string;
  url = 'JobDegrees/GetAllPaged';
  get Service(): JobDegreesService { return Shell.Injector.get(JobDegreesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<JobDegreeComponent>,
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
      jobDegreeFL: [this.model.jobDegreeFL, [Validators.required,this.removeSpaces]],
      jobDegreeSL: [this.model.jobDegreeSL,this.removeSpaces],
    });
  }

  ngOnInit() {
  }

}
