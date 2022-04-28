import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DialogService } from 'primeng/api';
import { EmployeeAlowancesService } from './services/employee-alowances.service';
import { EmployeeAlowanceComponent } from './employee-alowance/employee-alowance.component';

@Component({
  selector: 'app-employee-alowances',
  templateUrl: './employee-alowances.component.html',
  styleUrls: ['./employee-alowances.component.scss'],
  providers: [DialogService]
})
export class EmployeeAlowancesComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeeAlowancesService { return Shell.Injector.get(EmployeeAlowancesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeAlowances.title',
    componentName: 'EmployeeAlowancesComponent'

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
      dropdownFilterName: 'WeekdayId',
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
    super.add(EmployeeAlowanceComponent,model,"1000PX");
  }

  Lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {      
      this.columns[3].filterDropdown = data[0];
      this.columns[8].filterDropdown = data[1];


    });
  }

}
