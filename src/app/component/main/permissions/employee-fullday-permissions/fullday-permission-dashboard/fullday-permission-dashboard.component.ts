import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { EmployeeFulldayPermissionsService } from '../services/employee-fulldayPermissions.service';
import { Shell } from 'src/app/component/shell';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-fullday-permission-dashboard',
  templateUrl: './fullday-permission-dashboard.component.html',
  styleUrls: ['./fullday-permission-dashboard.component.scss']
})


export class FulldayPermissionDashboardComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeeFulldayPermissionsService { return Shell.Injector.get(EmployeeFulldayPermissionsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeFulldayPermissions.title',
    componentName: 'FulldayPermissionDashboardComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeeFulldayPermissions.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName',
      header: 'employeeFulldayPermissions.employeeNameFl',
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
      field: 'field.employeeFullDay',
      dropdownFilterName: 'FullDayId',
      header: 'employeeFulldayPermissions.fulldayPermissionName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      isfield:true
    },
    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'employeeAlowances.startDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'employeeAlowances.endDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.weekdays',
      header: 'employeeAlowances.daysFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
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
this.Lookups();
  }

  Lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {      
      this.columns[3].filterDropdown = data[0];
     

    });
  }

}
