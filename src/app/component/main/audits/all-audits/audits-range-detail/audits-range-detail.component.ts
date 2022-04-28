import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuditService } from '../services/audits.service';


@Component({
  selector: 'app-audits-range-detail',
  templateUrl: './audits-range-detail.component.html',
  styleUrls: ['./audits-range-detail.component.scss']
})


export class AuditsRangeDetailComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  mainModel:any = {};
  get Service(): AuditService { return Shell.Injector.get(AuditService); }
  constructor(
    public dialogRef: MatDialogRef<AuditsRangeDetailComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    super(dialogRef);
    if (this.data) {
      this.model = this.data.auditDetail;
      this.mainModel = this.data.audit;
      this.isNew = false;
    }
  }
  
  ngOnInit() {
  }

}
