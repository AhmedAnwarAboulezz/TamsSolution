import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { AuditService } from '../../../audits/all-audits/services/audits.service';
import { EmployeeEvaluateService } from '../services/employeeEvaluate.service';

@Component({
  selector: 'app-previous-evaluation-details',
  templateUrl: './previous-evaluation-details.component.html',
  styleUrls: ['./previous-evaluation-details.component.scss']
})

export class PreviousEvaluationDetailsComponent extends BaseEditComponent implements OnInit {
  model: any[] = [];
  mainmodel: any = {};

  get Service(): EmployeeEvaluateService { return Shell.Injector.get(EmployeeEvaluateService); }

  constructor(
    public dialogRef: MatDialogRef<PreviousEvaluationDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    super(dialogRef);
    if (this.data) {
      debugger;
      this.model = this.data.list;
      this.mainmodel = this.data.data;
      this.isNew = false;
    }
  }
  
  ngOnInit() {
  }

}