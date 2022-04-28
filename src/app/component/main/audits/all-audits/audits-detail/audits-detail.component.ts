import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Shell } from 'src/app/component/shell';
import { AuditService } from '../services/audits.service';

@Component({
  selector: 'app-audits-detail',
  templateUrl: './audits-detail.component.html',
  styleUrls: ['./audits-detail.component.scss']
})


export class AuditsDetailComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  mainModel:any = {};
  get Service(): AuditService { return Shell.Injector.get(AuditService); }

  constructor(
    public dialogRef: MatDialogRef<AuditsDetailComponent>,
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
