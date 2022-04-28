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
import { ApproveOvertimeEmployeesComponent } from '../approve-overtime-employees/approve-overtime-employees.component';

@Component({
  selector: 'app-approve-overtime-grid',
  templateUrl: './approve-overtime-grid.component.html',
  styleUrls: ['./approve-overtime-grid.component.scss']
})


export class ApproveOvertimeGridComponent extends BaseListComponent implements OnInit {
  get Service(): OvertimeService { return Shell.Injector.get(OvertimeService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'approveOvertimes.approveOvertime',
    componentName: 'ApproveOvertimeComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'descriptionFl',
      header: 'approveOvertimes.description',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'descriptionSl',
      header: 'approveOvertimes.description',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    
    {
      field: 'field.employeeName' ,
      header: 'approveOvertimes.requestedBy',
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
      sort: true
    },
    {
      field: 'year',
      header: 'approveOvertimes.year',
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
      name: 'approveOvertimes.approveEmployeesForOverTime',
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
    super.add(ApproveOvertimeAddComponent, model,"900px"); 
  }

  viewDetail(model: any) {
    super.openViewDetail(ApproveOvertimeEmployeesComponent,model);
  }

}