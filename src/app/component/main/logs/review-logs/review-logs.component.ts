import { Component, OnInit } from '@angular/core';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { HttpService } from 'src/app/services/http/http.service';
import { ReviewLogsService } from './services/review-logs.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { ReviewLogComponent } from './review-log/review-log.component';

@Component({
  selector: 'app-review-logs',
  templateUrl: './review-logs.component.html',
  styleUrls: ['./review-logs.component.scss']
})
export class ReviewLogsComponent extends BaseListComponent implements  OnInit {
  get Service(): ReviewLogsService { return Shell.Injector.get(ReviewLogsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);    
  }
  
  tableData = {
    name: 'ReviewLogsComponent',
    componentName: 'ReviewLogsComponent'
  };

  ngOnInit() {
    this.getlogtype();

  }
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeeattendance.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
     },
     {
      field: 'field.employeeName',
      header: 'employeeattendance.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
     },
     {
      field: 'civilId',
      header: 'employeeattendance.civilId',
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
      field: 'timeEntry',
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
      sort: false
    },
  
  

  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: false
    },
    {
      isView: true
    }
    ,
    {
      isDelete: false
    }
  ];
  viewDetail(model: any) {
    
    super.add(ReviewLogComponent, model);
  }
  getlogtype() {
    this.Service.getLogtypes().subscribe(data => {
      this.columns[3].filterDropdown = data;
    });
  }

}
