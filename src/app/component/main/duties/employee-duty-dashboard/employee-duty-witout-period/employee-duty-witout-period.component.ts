import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { DutyTypesEnum } from 'src/app/enums/DutyTypesEnum';
import { Shell } from 'src/app/component/shell';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { EmployeeDutiesService } from '../../employee-duty/Services/employeeDuties.service';

@Component({
  selector: 'app-employee-duty-witout-period',
  templateUrl: './employee-duty-witout-period.component.html',
  styleUrls: ['./employee-duty-witout-period.component.scss']
})


export class EmployeeDutyWitoutPeriodComponent extends BaseListComponent implements OnInit {
  dutyTypesEnum = DutyTypesEnum;
  get Service(): EmployeeDutiesService { return Shell.Injector.get(EmployeeDutiesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
    this.lookupsFilter();
  }

  tableData = {
    name: 'employeeDuties.employeeDuty',
    componentName: 'EmployeeDutyDashboardComponent'

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
      field: 'field.dutyTypeName',
      dropdownFilterName: 'dutyTypeId',
      header: 'employeeDuties.dutyTypeNameFl',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      isfield:true
    },
    {
      field: 'field.dutyName',
      dropdownFilterName: 'dutyId',
      header: 'employeeDuties.dutyNameFl',
      filterMode: 'dropdown',
      filterDropdown: [],
      print: true,
      selector: true,
      isfield:true
    },

    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'employeeDuties.startDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },

    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'employeeDuties.endDate',
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

  

  lookupsFilter(): void {
    this.Service.getLookup().subscribe((data: any) => {
      this.columns[3].filterDropdown = data[0].filter(element => element.id != this.dutyTypesEnum.FixedPeriodDuty);;
      this.columns[4].filterDropdown = data[1];
    });
  }

}
