import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { LeaveInServiceStartBalanceComponent } from './leave-in-service-start-balance/leave-in-service-start-balance.component';
import { LeaveInServiceStartBalancesService } from './service/leaveInServiceStartBalances.service';

@Component({
  selector: 'app-leave-in-service-start-balances',
  templateUrl: './leave-in-service-start-balances.component.html',
  styleUrls: ['./leave-in-service-start-balances.component.scss']
})


export class LeaveInServiceStartBalancesComponent extends BaseListComponent implements OnInit {

  get Service(): LeaveInServiceStartBalancesService { return Shell.Injector.get(LeaveInServiceStartBalancesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'LeaveInServiceStartBalance.title',
    componentName: 'LeaveInServiceStartBalancesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeeLeaves.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName',
      header: 'employeeLeaves.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'civilId',
      header: 'employeeLeaves.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
   
    {
      field: 'field.leaveName',
      dropdownFilterName: 'LeaveRegulationId',
      header: 'employeeLeaves.leaveType',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true,
      isfield:true
    },
    {
      field: 'numberOfTimesInService',
      header: 'LeaveInServiceStartBalance.numberOfTimesInService',
      filterMode: 'number',
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
    this.leaveRegulation();

  }

  addEvent(model: any) {
    super.add(LeaveInServiceStartBalanceComponent,model);
  }
  leaveRegulation(): void {
    this.Service.getLeaveRegulation().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
  }
}
