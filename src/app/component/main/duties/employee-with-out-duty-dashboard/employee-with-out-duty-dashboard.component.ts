import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../user-management/employees/services/employees.service';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { DialogService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { MatDialog } from '@angular/material';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-employee-with-out-duty-dashboard',
  templateUrl: './employee-with-out-duty-dashboard.component.html',
  styleUrls: ['./employee-with-out-duty-dashboard.component.scss'],
  providers: [DialogService]

})
export class EmployeeWithOutDutyDashboardComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeesService { return Shell.Injector.get(EmployeesService); }
  constructor(public route: ActivatedRoute,  public dialog: MatDialog) {
    super(dialog);
    this.lookups();

  }

  tableData = {
    name: 'employeeWithOutDuty',
    componentName: 'EmployeeWithOutDutyDashboardComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employees.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName',
      header: 'employees.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'civilId',
      header: 'employees.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
    },
    {
      field: 'field.genderName',
      dropdownFilterName: 'genderId',
      header: 'employees.genderName',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: true,
      sortName:'genderId',
      isfield:true

    },
    {
      field: 'startDate',
      printField:'startDateStr',
      header: 'employees.startDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.serviceName',
      dropdownFilterName: 'serviceStatusId',
      header: 'employees.serviceName',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      isfield:true
     

    },

    {
      field: 'field.employeelocationName',
      dropdownFilterName: 'employeeLocationIds',
      header: 'employeeProfile.location',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: false,
      sortName:'employeeLocations',
      isfield:true

    },
    {
      field: 'field.employeeAdminLevel',
      header: 'employeeProfile.administration',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: false,
      isfield:true
    },
    {
      field: 'field.employeeJobName',
      dropdownFilterName: 'employeeJobIds',
      header: 'employeeProfile.jobtitle',
      filterMode: 'dropdown',
      selector: false,
      print: true,
      sort: false,
      isfield:true

    },
    {
      field: 'field.employeeJobDegreeName',
      dropdownFilterName: 'employeeJobDegreeIds',
      header: 'employeeProfile.jobDegree',
      filterMode: 'dropdown',
      selector: false,
      print: true,
      sort: false,
      isfield:true

    },
    {
      field: 'field.employeeContractType',
      dropdownFilterName: 'employeeContractTypeIds',
      header: 'employeeProfile.contractType',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: false,
      isfield:true

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



  lookups(): void {
    this.Service.getGridLookup().subscribe((data: any) => {
      this.columns[3].filterDropdown = data[0];
      this.columns[5].filterDropdown = data[1];
      this.columns[6].filterDropdown = data[2];
      this.columns[8].filterDropdown = data[3];
      this.columns[9].filterDropdown = data[4];
      this.columns[10].filterDropdown = data[5];


    });
  }
  }


