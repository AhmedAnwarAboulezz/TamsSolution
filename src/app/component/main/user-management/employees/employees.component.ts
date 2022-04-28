import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DialogService } from 'primeng/api';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesService } from './services/employees.service';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [DialogService]
})
export class EmployeesComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeesService { return Shell.Injector.get(EmployeesService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employees.title',
    componentName: 'EmployeesComponent'
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
      field: 'employeeName',
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
      field: 'email',
      header: 'employees.email',
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
      field: 'dateOfHiring',
      printField:'dateOfHiring',
      header: 'employees.hireDate',
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
      selector: true,
      print: true,
      sort: false,
      isfield: true
    },
    {
      field: 'field.employeeJobDegreeName',
      dropdownFilterName: 'employeeJobDegreeIds',
      header: 'employeeProfile.jobDegree',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: false,
      isfield:true
    },
    {
      field: 'contractType',
      dropdownFilterName: 'employeeContractTypeIds',
      header: 'employeeProfile.contractType',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: false,
      isfield: true
    }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      name: 'employees.viewDetailsName',
      icon: 'person_pin',
      isView: true
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {
    this.lookups();
  }

  addEvent(model: any) {
    if (model) {
      this.Service.getEmployee(model.id).subscribe(data => {
        super.add(EmployeeComponent, data, '1300px');
      });
    } else {
      super.add(EmployeeComponent, model, '1300px');
    }
  }
  viewDetail(model: any) {
    this.Service.getEmployee(model.id).subscribe(data => {
      super.openViewDetail(EmployeeProfileComponent, data, '1300px');
    });

  }
  lookups(): void {
    this.Service.getGridLookup().subscribe((data: any) => {
      this.columns[4].filterDropdown = data[0];
      this.columns[7].filterDropdown = data[1];
      this.columns[8].filterDropdown = data[2];
      this.columns[10].filterDropdown = data[3];
      this.columns[11].filterDropdown = data[4];
      this.columns[12].filterDropdown = data[5];


    });
  }

}
