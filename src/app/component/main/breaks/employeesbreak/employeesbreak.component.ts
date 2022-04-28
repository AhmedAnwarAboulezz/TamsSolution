import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { EmployeebreakComponent } from './employeebreak/employeebreak.component';
import { EmployeebreakService } from './service/employeebreak.service';

@Component({
  selector: 'app-employeesbreak',
  templateUrl: './employeesbreak.component.html',
  styleUrls: ['./employeesbreak.component.scss']
})
export class EmployeesbreakComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeebreakService { return Shell.Injector.get(EmployeebreakService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);   

  }

  tableData = {
    name: 'employeesbreak.employeesbreak',
    componentName: 'EmployeesbreakComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeesbreak.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName',
      header: 'employeesbreak.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      //addedText: this.localize.flLang,
      isfield:true
    },
    {
      field: 'civilId',
      header: 'employeesbreak.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },{
      field: 'startTime',
      header: 'employeesbreak.startTime',
      filterMode: 'time',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endTime',
      header: 'employeesbreak.endTime',
      filterMode: 'time',
      selector: true,
      print: true,
      sort: true
    }, 
     {
      field: 'isFixedTime',
      header: 'employeesbreak.isFixedTime',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true
    },  {
      field: 'breakDuration',
      header: 'employeesbreak.breakDuration',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'employeesbreak.startDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'employeesbreak.endDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      isView: false
    }
    ,
    {
      isDelete: true
    }
  ];


  addEvent(model: any) {
    super.add(EmployeebreakComponent, model);
  }
  ngOnInit() {
  }

}
