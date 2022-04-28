import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EmployeeLogComponent } from './employee-log/employee-log.component';
import { EmployeeLogsService } from './services/employee-logs.service';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { DialogService } from 'primeng/api';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { LogTypeEnum } from 'src/app/enums/LogType';

@Component({
  selector: 'app-employee-logs',
  templateUrl: './employee-logs.component.html',
  styleUrls: ['./employee-logs.component.scss']
})
export class EmployeeLogsComponent extends BaseListComponent implements OnInit {
  logTypeEnum = LogTypeEnum;
  get Service(): EmployeeLogsService { return Shell.Injector.get(EmployeeLogsService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeLogManual.employeeLogManual',
    componentName: 'EmployeeLogsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeeLogManual.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
    },

    {
      field: 'field.employeeName',
      header: 'employeeLogManual.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true

    },
    {
      field: 'civilId',
      header: 'employeeLogManual.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.logTypeName',
      header: 'employeeLogManual.logType',
      dropdownFilterName: 'logTypeId',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: true,
      sortName:'field.logTypeField',
      isfield:true
    },
    {
      field: 'logDate',
      printField: 'logDateStr',
      header: 'employeeLogManual.logDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'logTime',
      header: 'employeeLogManual.logTime',
      filterMode: 'time',
      selector: true,
      print: true,
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
    this.getlogtype();
  }

  addEvent(model: any) {
    super.add(EmployeeLogComponent, model);
  }
  getlogtype() {
    this.Service.getLogtypes().subscribe(data => {
      this.columns[3].filterDropdown = data;
    });
  }
}
