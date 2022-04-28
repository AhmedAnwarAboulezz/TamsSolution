import { FullDayPermissionComponent } from './fullDayPermission/fullDayPermission.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { FullDayPermissionsService } from './Services/fullDayPermissions.services';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-fullDayPermissions',
  templateUrl: './fullDayPermissions.component.html',
  styleUrls: ['./fullDayPermissions.component.scss']
})

export class FullDayPermissionsComponent extends BaseListComponent implements OnInit {

  get Service(): FullDayPermissionsService { return Shell.Injector.get(FullDayPermissionsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'fullDayPermissions.fullDayPermissions',
   
    componentName: 'FullDayPermissionsComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'fullDayPermissions.code',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'fullDayPermissionFL',
      header: 'fullDayPermissions.fulldayPermissionFL',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'fullDayPermissionSL',
      header: 'fullDayPermissions.fulldayPermissionSL',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang

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
  ngOnInit(): void {
  }
  addEvent(model: any) {
    super.add(FullDayPermissionComponent,model);
  }
}