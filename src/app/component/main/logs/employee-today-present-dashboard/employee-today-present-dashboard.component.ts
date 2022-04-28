import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/api';
import { MatDialog } from '@angular/material';
import { EmployeeLogsService } from '../employee-logs/services/employee-logs.service';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-employee-today-present-dashboard',
  templateUrl: './employee-today-present-dashboard.component.html',
  styleUrls: ['./employee-today-present-dashboard.component.scss']
})

export class EmployeeTodayPresentDashboardComponent extends BaseListComponent implements OnInit {
  get Service(): EmployeeLogsService { return Shell.Injector.get(EmployeeLogsService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeDashboard.presentEmployees',
    componentName: 'EmployeeTodayPresentDashboardComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeeDashboard.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
    },

    {
      field: 'field.employeeName',
      header: 'employeeDashboard.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'civilId',
      header: 'employeeDashboard.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,

    },
  

    
    {
      field: 'signIn',
      printField: 'SignInStr',
      header: 'employeeDashboard.signIn',
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'signOut',
      printField: 'SignOutStr',
      header: 'employeeDashboard.signOut',
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    },

    {
      field: 'actualIn',
      printField: 'actualInStr',
      header: 'employeeDashboard.actualIn',
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'actualOut',
      printField: 'ActualOutStr',
      header: 'employeeDashboard.actualOut',
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    }
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
  ngOnInit(){
  }

  
}
