import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { SyncLogsExceptionsService } from './services/sync-logs-exceptions.service';
import { SyncLogsExceptionComponent } from './sync-logs-exception/sync-logs-exception.component';

@Component({
  selector: 'app-sync-logs-exceptions',
  templateUrl: './sync-logs-exceptions.component.html',
  styleUrls: ['./sync-logs-exceptions.component.scss']
})
export class SyncLogsExceptionsComponent  extends BaseListComponent implements OnInit {

  get Service(): SyncLogsExceptionsService { return Shell.Injector.get(SyncLogsExceptionsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);    
  }
  syncLogsExceptionTypes:any ={};
  tableData = {
    name: 'syncLogsExceptions.syncLogsException',
    componentName: 'SyncLogsExceptionsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'field.syncLogsExceptionTypename',
      header: 'syncLogsExceptions.syncLogsExceptionTypename',
      selector: true,
      print: true,
      sort: true,
      dropdownFilterName: 'syncLogsExceptionTypeId',
      filterMode: 'dropdown',
      sortName:'syncLogsExceptionTypeId',
      isfield:true
    },
    {
      field: 'syncLogsExceptionName',
      header: 'syncLogsExceptions.syncLogsExceptionName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
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
    this. getLookups();
  }
  addEvent(model: any) {
    super.add(SyncLogsExceptionComponent, model);
  }
  getLookups(){
    this.Service.getSyncLogsExceptionTypes().subscribe(res=>
      this.columns[0].filterDropdown=res
     // this.syncLogsExceptionTypes=res
      );
  }
}
