import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { LogsDriveSettingsService } from '../services/logs-drive-settings.service';

@Component({
  selector: 'app-logs-drive-setting',
  templateUrl: './logs-drive-setting.component.html',
  styleUrls: ['./logs-drive-setting.component.scss']
})
export class LogsDriveSettingComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  id: string;
  url = 'LogsDriveSettings/GetAllPaged';
  syncLogsExceptionTypes:any ={};
  triggerTypes:any ={};
  get Service(): LogsDriveSettingsService { return Shell.Injector.get(LogsDriveSettingsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<LogsDriveSettingComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      sheetLink: [this.model.sheetLink, [Validators.required]],
    });
  }

  ngOnInit() {
  }

}
