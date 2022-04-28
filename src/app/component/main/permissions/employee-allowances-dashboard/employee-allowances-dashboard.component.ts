import { Component, OnInit } from '@angular/core';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { EmployeeAlowancesService } from '../employee-alowances/services/employee-alowances.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';

@Component({
  selector: 'app-employee-allowances-dashboard',
  templateUrl: './employee-allowances-dashboard.component.html',
  styleUrls: ['./employee-allowances-dashboard.component.scss']
})

export class EmployeeAllowancesDashboardComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeeAlowancesService { return Shell.Injector.get(EmployeeAlowancesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeAlowances.title',
    componentName: 'EmployeeAllowancesDashboardComponent'

  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeeAlowances.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName',
      header: 'employeeAlowances.employeeNameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'civilId',
      header: 'employeeAlowances.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    
    {
      field: 'field.allowanceName',
      dropdownFilterName: 'AllowanceId',
      header: 'employeeAlowances.allowanceNameSl',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
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
      field: 'allowanceIn',
      header: 'employeeAlowances.allowanceIn',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'allowanceOut',
      header: 'employeeAlowances.allowanceOut',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.weekdays',
      header: 'employeeAlowances.daysFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
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
     this.Lookups();
  }

  Lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {      
      this.columns[3].filterDropdown = data[0];    
    });
  }

}
