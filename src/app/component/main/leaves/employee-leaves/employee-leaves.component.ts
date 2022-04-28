
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DialogService } from 'primeng/api';
import { EmployeeLeavesService } from './services/employee-leaves.service';
import { EmployeeLeaveComponent } from './employee-leave/employee-leave.component';

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.scss'],
  providers: [DialogService]
})
export class EmployeeLeavesComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeeLeavesService { return Shell.Injector.get(EmployeeLeavesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeLeaves.title',
    componentName: 'EmployeeLeavesComponent'
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
    // {
    //   field: 'leftBalance',
    //   header: 'employeeLeaves.leftBalance',
    //   filterMode: 'number',
    //   selector: true,
    //   print: true,
    //   sort: true
    // },
    {
      field: 'fileName',
      header: 'Files',
      filterMode: 'file',
      serviceName:'Leaves',
      selector: true,
      print: false,
      sort: false
    },
    {
      field: 'workflowStatusId',
      header: 'teams.isWorkflow',
      filterMode: 'check',
      selector: true,
      print:true,
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
    super.add(EmployeeLeaveComponent,model);
  }
  leaveRegulation(): void {
    this.Service.getLeaveRegulation().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
    this.columns[8].filterDropdown = [
      {id: true, nameFl:"Active",nameSl:"فعال"},
      {id: false, nameFl:"Not Active",nameSl:"غير فعال"}
     ];
  }
}
