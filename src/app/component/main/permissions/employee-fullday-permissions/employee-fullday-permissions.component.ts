import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DialogService } from 'primeng/api';
import { EmployeeFulldayPermissionsService } from './services/employee-fulldayPermissions.service';
import { EmployeeFulldayPermissionComponent } from './employee-fullday-permission/employee-fullday-permission.component';

@Component({
  selector: 'app-employee-fullday-permissions',
  templateUrl: './employee-fullday-permissions.component.html',
  styleUrls: ['./employee-fullday-permissions.component.scss'],
  providers: [DialogService]
})
export class EmployeeFulldayPermissionsComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeeFulldayPermissionsService { return Shell.Injector.get(EmployeeFulldayPermissionsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeFulldayPermissions.title',
    componentName: 'EmployeeFulldayPermissionsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeeFulldayPermissions.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName',
      header: 'employeeFulldayPermissions.employeeNameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'civilId',
      header: 'employeePermissions.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    
    
    {
      field: 'field.employeeFullDay',
      dropdownFilterName: 'FullDayId',
      header: 'employeeFulldayPermissions.fulldayPermissionName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true,
      isfield:true
    },
    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'employeeAlowances.startDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'employeeAlowances.endDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.weekdays',
      dropdownFilterName: 'WeekdayId',
      header: 'employeeAlowances.daysFl',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      isfield:true
    },
    {
      field: 'fileName',
      header: 'Files',
      filterMode: 'file',
      serviceName:'Permissions',
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
this.Lookups();
  }

  addEvent(model: any) {
    super.add(EmployeeFulldayPermissionComponent,model,"1000px");
  }
  Lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {      
      this.columns[3].filterDropdown = data[0];
      this.columns[6].filterDropdown = data[1];


    });
  }

}
