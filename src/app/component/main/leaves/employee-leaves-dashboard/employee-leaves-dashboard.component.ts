import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { EmployeeLeavesService } from '../employee-leaves/services/employee-leaves.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-employee-leaves-dashboard',
  templateUrl: './employee-leaves-dashboard.component.html',
  styleUrls: ['./employee-leaves-dashboard.component.scss']
})


export class EmployeeLeavesDashboardComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeeLeavesService { return Shell.Injector.get(EmployeeLeavesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
    this.leaveRegulation();
  }

  tableData = {
    name: 'employeeLeaves.title',
    componentName: 'EmployeeLeavesDashboardComponent'
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
      isfield:true
    },
    {
      field: 'actualDay',
      header: 'employeeLeaves.period',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'startDate',
      printField:'startDateStr',
      header: 'employeeLeaves.startDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField:'endDateStr',
      header: 'employeeLeaves.endDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'balance',
      header: 'employeeLeaves.balance',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
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

  }

  
  leaveRegulation(): void {
    this.Service.getLeaveRegulation().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
  }
}
