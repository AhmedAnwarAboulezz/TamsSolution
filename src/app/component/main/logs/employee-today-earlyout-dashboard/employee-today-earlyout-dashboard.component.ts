import { Component, OnInit } from '@angular/core';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/api';
import { EmployeeLogsService } from '../employee-logs/services/employee-logs.service';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-employee-today-earlyout-dashboard',
  templateUrl: './employee-today-earlyout-dashboard.component.html',
  styleUrls: ['./employee-today-earlyout-dashboard.component.scss']
})

export class EmployeeTodayEarlyoutDashboardComponent extends BaseListComponent implements OnInit {
  get Service(): EmployeeLogsService { return Shell.Injector.get(EmployeeLogsService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeDashboard.earlyoutEmployees',
    componentName: 'EmployeeTodayEarlyoutDashboardComponent'
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
      printField: 'signInStr',
      header: 'employeeDashboard.signIn',
      filterMode: 'timeFromDate',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'signOut',
      printField: 'signOutStr',
      header: 'employeeDashboard.signOut',
      filterMode: 'timeFromDate',
      selector: true,
      print: true,
      sort: true
    },

    {
      field: 'actualOut',
      printField: 'actualOutStr',
      header: 'employeeDashboard.actualOut',
      filterMode: 'timeFromDate',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'earlyOut',
      header: 'employeeDashboard.earlyOut',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'actualEarlyOut',
      header: 'employeeDashboard.actualEarlyOut',
      filterMode: 'number',
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