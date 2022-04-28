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
  selector: 'app-employee-today-latein-dashboard',
  templateUrl: './employee-today-latein-dashboard.component.html',
  styleUrls: ['./employee-today-latein-dashboard.component.scss']
})

export class EmployeeTodayLateinDashboardComponent extends BaseListComponent implements OnInit {
  get Service(): EmployeeLogsService { return Shell.Injector.get(EmployeeLogsService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeDashboard.lateinEmployees',
    componentName: 'EmployeeTodayLateinDashboardComponent'
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
      filterMode: 'timeFromDate',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'signOut',
      printField: 'SignOutStr',
      header: 'employeeDashboard.signOut',
      filterMode: 'timeFromDate',
      selector: true,
      print: true,
      sort: true
    },

    {
      field: 'actualIn',
      printField: 'actualInStr',
      header: 'employeeDashboard.actualIn',
      filterMode: 'timeFromDate',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'lateIn',
      header: 'employeeDashboard.lateIn',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'actualLateIn',
      header: 'employeeDashboard.actualLateIn',
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
