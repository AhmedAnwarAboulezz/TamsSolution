import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { SyncLogsExceptionsService } from '../services/sync-logs-exceptions.service';

@Component({
  selector: 'app-sync-logs-exception',
  templateUrl: './sync-logs-exception.component.html',
  styleUrls: ['./sync-logs-exception.component.scss']
})
export class SyncLogsExceptionComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  id: string;
  url = 'SyncLogsExceptions/GetAllPaged';
  syncLogsExceptionTypes:any ={};
  triggerTypes:any ={};
  get Service(): SyncLogsExceptionsService { return Shell.Injector.get(SyncLogsExceptionsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<SyncLogsExceptionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      syncLogsExceptionTypeId: [this.model.syncLogsExceptionTypeId, [Validators.required]],
      syncLogsExceptionName: [this.model.syncLogsExceptionName, [Validators.required, this.removeSpaces]],
    });
  }
  ngOnInit() {
    this.getLookups()
  }
  getLookups(){
    this.Service.getLokkups().subscribe(res=>{
     this.syncLogsExceptionTypes=res[0]
     this.triggerTypes=res[1]
    } );
      
  }

 
}
