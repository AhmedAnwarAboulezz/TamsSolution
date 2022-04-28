import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/api';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { EmployeePenaltieComponent } from './employee-penaltie/employee-penaltie.component';
import { EmployeeePenaltiesService } from './services/employeepenalties.services';

@Component({
  selector: 'app-employee-penalties',
  templateUrl: './employee-penalties.component.html',
  styleUrls: ['./employee-penalties.component.scss']
})

export class EmployeePenaltiesComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeeePenaltiesService { return Shell.Injector.get(EmployeeePenaltiesService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService, public dialog: MatDialog) {
    super(dialog);
    
  }

  tableData = {
    name: 'EmployeePenalties.title',
    componentName: 'EmployeePenaltiesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'adminmanger.number',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.employeeNumber'
    },
    {
      field: 'field.employeeName',
      header: 'employees.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.employeeNameFl',
      isfield:true
    },
    {
      field: 'civilId',
      header: 'adminmanger.civilid',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.civilId'
    },
    {
      field: 'field.penaltiesType',
      dropdownFilterName: 'penaltiesTypeId',
      header: 'EmployeePenalties.penaltiesType',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      sortName:'field.penaltiesTypeField',
      isfield:true
    },
    {
      field: 'decisionNumber',
      header: 'EmployeePenalties.decisionNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },  
    {
      field: 'penaltiesDate',
      printField:'penaltiesDate',
      header: 'EmployeePenalties.penaltiesDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'penaltieNote',
      header: 'EmployeePenalties.penaltieNote',
      filterMode: 'text',
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
      isDelete: true
    }
  ];
  ngOnInit(): void {
   this.GetPenaltiesType();
  }
  addEvent(model: any) {
    super.add(EmployeePenaltieComponent, model);
  }
  GetPenaltiesType(): void {
    this.Service.getPenaltiesTypes().subscribe((data: any) => {      
      this.columns[3].filterDropdown = data;

    });
  }
  
}
