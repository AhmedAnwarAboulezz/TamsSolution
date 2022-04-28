import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { EmployeePermissionsService } from '../employee-permissions/services/employee-permissions.service';
import { MatDialog } from '@angular/material';
import { Shell } from 'src/app/component/shell';
import { ActivatedRoute } from '@angular/router';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-employee-permissions-dashboard',
  templateUrl: './employee-permissions-dashboard.component.html',
  styleUrls: ['./employee-permissions-dashboard.component.scss']
})

export class EmployeePermissionsDashboardComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeePermissionsService { return Shell.Injector.get(EmployeePermissionsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeePermissions.employeePermissions',
    componentName: 'EmployeePermissionsDashboardComponent'
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
      field: 'field.partialPermission',
      dropdownFilterName: 'PartialPermissionTypeId',
      header: 'employeePermissions.permissionType',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      isfield:true
    },
    {
      field: 'startDate',
      printField:'startDateStr',
      header: 'employeePermissions.permissionDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: false
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
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: false
    }
    ,
    {
      isDelete: false
    }
  ];
  ngOnInit(): void {
      this.PartialPermissionTypes();
  } 
  PartialPermissionTypes(): void {
    this.Service.getPartialPermissionTypes().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
  }
}