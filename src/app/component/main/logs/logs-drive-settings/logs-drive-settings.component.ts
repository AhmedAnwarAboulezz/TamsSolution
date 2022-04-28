import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { LogsDriveSettingComponent } from './logs-drive-setting/logs-drive-setting.component';
import { LogsDriveSettingsService } from './services/logs-drive-settings.service';

@Component({
  selector: 'app-logs-drive-settings',
  templateUrl: './logs-drive-settings.component.html',
  styleUrls: ['./logs-drive-settings.component.scss']
})
export class LogsDriveSettingsComponent extends BaseListComponent implements OnInit {

  get Service():  LogsDriveSettingsService { return Shell.Injector.get(LogsDriveSettingsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);    
  }
  syncLogsExceptionTypes:any ={};
  tableData = {
    name: 'logsDriveSetting.logsDriveSetting',
    componentName: 'LogsDriveSettingsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'sheetLink',
      header: 'logsDriveSetting.sheetLink',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
    },
    {
      field: 'lastSync',
      printField: 'lastSyncStr',
      header: 'logsDriveSetting.lastSync',
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    }
   
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      isView: false
    }
    ,
    {
      isDelete: true
    }
  ];

  ngOnInit() {
  }
  addEvent(model: any) {
    super.add(LogsDriveSettingComponent, model);
  }


}
