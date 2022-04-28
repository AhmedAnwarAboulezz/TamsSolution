import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { AuditService } from '../../audits/all-audits/services/audits.service';

@Component({
  selector: 'app-notifications-news-view',
  templateUrl: './notifications-news-view.component.html',
  styleUrls: ['./notifications-news-view.component.scss']
})



export class NotificationsNewsViewComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  mainModel:any = {};
  get Service(): AuditService { return Shell.Injector.get(AuditService); }

  constructor(
    public dialogRef: MatDialogRef<NotificationsNewsViewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    super(dialogRef);
    if (this.data) {
      this.model = this.data.details;
      this.mainModel = this.data.main;
      this.isNew = false;
    }
  }
  
  ngOnInit() {
  }

}
