import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { OvertimeEmployeeOrdersComponent } from '../../overtime-orders/overtime-employee-orders/overtime-employee-orders.component';
import { OvertimeService } from '../../overtime-orders/Services/overtime.service';
import { ApproveOvertimeAddComponent } from '../approve-overtime-add/approve-overtime-add.component';
import { ApproveOvertimeDetailUpdateComponent } from '../approve-overtime-detail-update/approve-overtime-detail-update.component';

@Component({
  selector: 'app-approve-overtime-details-grid',
  templateUrl: './approve-overtime-details-grid.component.html',
  styleUrls: ['./approve-overtime-details-grid.component.scss']
})


export class ApproveOvertimeDetailsGridComponent extends BaseListComponent implements OnInit {
  get Service(): OvertimeService { return Shell.Injector.get(OvertimeService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'approveOvertimes.approveEmployeesForOverTime',
    componentName: 'ApproveOvertimeComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'field.description',
      header: 'approveOvertimes.description',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'field.descriptionField',
      isfield:true
    },
    {
      field: 'field.employeeName' ,
      header: 'approveOvertimes.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'month',
      header: 'approveOvertimes.month',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true,
      sortName:'approveOverTime.month'
    },
    {
      field: 'year',
      header: 'approveOvertimes.year',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true,
      sortName:'approveOverTime.year'
    },
    {
      field: 'morningTime',
      header: 'approveOvertimes.morningTime',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'nightTime',
      header: 'approveOvertimes.nightTime',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'weekEndTime',
      header: 'approveOvertimes.weekEndTime',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'holidayTime',
      header: 'approveOvertimes.holidayTime',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'actualMorningTime',
      header: 'approveOvertimes.actualMorningTime',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'actualNightTime',
      header: 'approveOvertimes.actualNightTime',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'actualWeekEndTime',
      header: 'approveOvertimes.actualWeekEndTime',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'actualHolidayTime',
      header: 'approveOvertimes.actualHolidayTime',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'daysOfOvertime',
      header: 'approveOvertimes.daysOfOvertime',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
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
    super.add(ApproveOvertimeDetailUpdateComponent, model,"900px"); 
  }
}
