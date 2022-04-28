import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { DutyTypesEnum } from 'src/app/enums/DutyTypesEnum';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { EmployeeDutiesService } from '../../employee-duty/Services/employeeDuties.service';

@Component({
  selector: 'app-employee-duty-with-period',
  templateUrl: './employee-duty-with-period.component.html',
  styleUrls: ['./employee-duty-with-period.component.scss']
})


export class EmployeeDutyWithPeriodComponent extends BaseListComponent implements OnInit {
  dutyTypesEnum = DutyTypesEnum;
  get Service(): EmployeeDutiesService { return Shell.Injector.get(EmployeeDutiesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
    this.getDutyTypesFixed();
  }

  tableData = {
    name: 'dashboard.EmployeeFixedDutyPeriod',
    componentName: 'EmployeeDutyWithPeriodComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeeDuties.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName' ,
      header: 'employeeDuties.employeeNameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'civilId' ,
      header: 'employeeDuties.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },  
    {
      field: 'dutyDescriptionFl',
      dropdownFilterName: 'fixedDutyPeriodId',
      header: 'employeeDuties.dutyNameFl',
      filterMode: 'dropdown',
      filterDropdown: [],
      print: true,
      selector: true
    },

    {
      field: 'dayOfWork',
      printField: 'dayOfWork',
      header: 'employeeDuties.dayOfWork',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },

    
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: false
    },
    {
      isView: false
    }
    ,
    {
      isDelete: false
    }
  ];
  ngOnInit(): void {

  }

  

  getDutyTypesFixed(): void {
    this.Service.getDutyTypesFixed().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
  }

}

