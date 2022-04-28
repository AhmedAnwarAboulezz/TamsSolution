
import {EmployeePermissionComponent } from './employee-permission/employee-permission.component';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { EmployeePermissionsService } from './services/employee-permissions.service';
import { DialogService } from 'primeng/api';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-employee-permissions',
  templateUrl: './employee-permissions.component.html',
  styleUrls: ['./employee-permissions.component.scss']
})
export class EmployeePermissionsComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeePermissionsService { return Shell.Injector.get(EmployeePermissionsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeePermissions.employeePermissions',
    componentName: 'EmployeePermissionsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeePermissions.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName',
      header: 'employeePermissions.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'civilId',
      header: 'employeePermissions.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    
    {
      //field: 'field.partialPermission',
      field: this.localize.currentLang == 'Fl' ? 'partialPermissionFL' :  'partialPermissionSL',
      dropdownFilterName: 'PartialPermissionTypeId',
      header: 'employeePermissions.permissionType',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true,
      //isfield:true
    },
    {
      field: 'startDate',
      printField:'startDateStr',
      header: 'employeePermissions.permissionDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'startTime',
      header: 'employeePermissions.startTime',
      filterMode: 'time',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endTime',
      header: 'employeePermissions.endTime',
      filterMode: 'time',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'fileName',
      header: 'Files',
      filterMode: 'file',
      serviceName:'Permissions',
      selector: true,
      print: false,
      sort: false
    },
    {
      field: 'workflowStatusId',
      header: 'teams.isWorkflow',
      filterMode: 'check',
      selector: true,
      print:true,
      sort: true
    },
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {
this.PartialPermissionTypes();
  }

  addEvent(model: any) {
    super.add(EmployeePermissionComponent,model);
  }
  PartialPermissionTypes(): void {
    this.Service.getPartialPermissionTypes().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
  }


}
