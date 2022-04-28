import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Job } from '../../../../../models/Job';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { JobsService } from '../Services/jobs.services';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})

export class JobComponent extends BaseEditComponent implements OnInit {
  model: Job = {};
  id: string;
  url = 'Jobs/GetAllPaged';
  get Service(): JobsService { return Shell.Injector.get(JobsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<JobComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA)  public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = this.resetForm(this.model);
  }

  onAddSave(event){
    this.close(event, this.resetForm(new Job()));
  }

  resetForm(model:Job): any{
    let resetForm = this.fb.group({   
      id: [model.id],
      code: [model.code],
      jobFL: [model.jobFL, [Validators.required,this.removeSpaces]],
      jobSL: [model.jobSL,this.removeSpaces],
      exemptionFromFingerprint: [model.exemptionFromFingerprint != null ? model.exemptionFromFingerprint : false],
      supervisoryJob: [model.supervisoryJob != null ? model.supervisoryJob : false],
    });
    return resetForm;
  }
  ngOnInit() {
  }

}
