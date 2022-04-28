import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { AddEmployeeDutyComponent } from './add-employee-duty/add-employee-duty.component';
import { EmployeeDutiesService } from './Services/employeeDuties.service';
import { Shell } from 'src/app/component/shell';
import { DialogService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { MatDialog } from '@angular/material';
import { EditEmployeeDutyComponent } from './edit-employee-duty/edit-employee-duty.component';
import { DutyTypesEnum } from 'src/app/enums/DutyTypesEnum';

@Component({
  selector: 'app-employee-duty',
  templateUrl: './employee-duty.component.html',
  styleUrls: ['./employee-duty.component.scss'],
  providers: [DialogService]
})
export class EmployeeDutyComponent extends BaseListComponent implements OnInit {
  dutyTypesEnum = DutyTypesEnum;
  get Service(): EmployeeDutiesService { return Shell.Injector.get(EmployeeDutiesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
    this.lookupsFilter();
  }

  tableData = {
    name: 'employeeDuties.employeeDuty',
    componentName: 'EmployeeDutyComponent'

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
      sort: true,
      sortName: 'field.dutyTypefield',
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
  ngOnInit(): void {

  }

  addEvent(model: any) {
    if (model) {
      super.add(EditEmployeeDutyComponent, model);
    } else {
      super.openViewDetail(AddEmployeeDutyComponent, model);
    }

  }

  lookupsFilter(): void {
    this.Service.getLookup().subscribe((data: any) => {
      this.columns[3].filterDropdown = data[0].filter(element => element.id != this.dutyTypesEnum.FixedPeriodDuty);
      this.columns[4].filterDropdown = data[1];
    });
  }

}
