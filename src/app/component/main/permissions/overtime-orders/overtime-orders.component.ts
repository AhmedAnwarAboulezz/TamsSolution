import { Component, OnInit } from '@angular/core';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { OvertimeService } from './Services/overtime.service';
import { OvertimeOrderComponent } from './overtime-order/overtime-order.component';
import { OvertimeEmployeeOrdersComponent } from './overtime-employee-orders/overtime-employee-orders.component';

@Component({
  selector: 'app-overtime-orders',
  templateUrl: './overtime-orders.component.html',
  styleUrls: ['./overtime-orders.component.scss']
})

export class OvertimeOrdersComponent extends BaseListComponent implements OnInit {

  get Service(): OvertimeService { return Shell.Injector.get(OvertimeService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'overTimeOrders.overtimeOrders',
    componentName: 'OvertimeOrdersComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'decisionNumber',
      header: 'overTimeOrders.decisionNumber',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'overTimeOrders.startDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },

    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'overTimeOrders.endDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'startTime',
      header: 'overTimeOrders.startTime',
      filterMode: 'time',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endTime',
      header: 'overTimeOrders.endTime',
      filterMode: 'time',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName' ,
      header: 'overTimeOrders.requestedBy',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'minimumOvertime',
      header: 'overTimeOrders.minimumOvertime',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },

    {
      field: 'isMustSignOverTime',
      header: 'overTimeOrders.isMustSignOverTime',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'fileName',
      header: 'overTimeDates.Files',
      filterMode: 'file',
      serviceName:'Permissions',
      selector: true,
      print: false,
      sort: false
    },
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      name: 'overTimeOrders.assignEmployeeToOverTime',
      icon: 'person_pin',
      isView: true
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

  addEvent(model: any) {
    super.add(OvertimeOrderComponent, model,"900px"); 
  }

  viewDetail(model: any) {
    super.openViewDetail(OvertimeEmployeeOrdersComponent,model);
  }
}
