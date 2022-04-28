import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { AttendanceSearch } from 'src/app/models/attendanceSearch';
import { EmployeeAttendanceLog } from 'src/app/models/employeeAttendanceLog';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { EmployeeAttendanceService } from '../../employee-attedances/services/employeeAttendance.service';
import { AbsenceLogsComponent } from '../absence-logs/absence-logs.component';

@Component({
  selector: 'app-employee-absence-grid',
  templateUrl: './employee-absence-grid.component.html',
  styleUrls: ['./employee-absence-grid.component.scss']
})

export class EmployeeAbsenceGridComponent extends BaseListComponent implements OnInit {
  @Input() searchValues: any;
  viewModel = [];  
  get Service(): EmployeeAttendanceService { return Shell.Injector.get(EmployeeAttendanceService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeattendance.employeeAbsence',
    componentName: 'EmployeeAbsenceLogsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employeeattendance.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
     },
     {
      field: 'field.employeeName',
      header: 'employeeattendance.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
     },
     {
      field: 'civilId',
      header: 'employeeattendance.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
     },
    {
      field: 'signIn',
      printField: 'signInStr',
      header: 'employeeattendance.sDuty',
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'signOut',
      printField: 'signOutStr',
      header: 'employeeattendance.eDuty',
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.statusName',
      header: 'employeeattendance.statusName',
      filterMode: 'text',
      selector: true,
      print: true,
      isfield:true
    },
    {
      field: 'acceptedCount',
      header: 'employeeattendance.acceptedCount',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'rejectedCount',
      header: 'employeeattendance.rejectedCount',
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
      name: 'employeeattendance.viewLogs',
      icon: 'person_pin',
      isView: false
    }
    ,
    {
      isDelete: false
    }
  ];
  ngOnInit(): void {
  }


  addEvent(model: any) {

    let search = new AttendanceSearch();
    search.employeeId = model.employeeId;
    search.employeeNumber = model.employeeNumber;
    search.startDate = model.signIn;
    search.endDate = model.signOut;
    
    this.Service.GetEmployeeLogsByDate(search).subscribe(res => {
      
      let newFilter = {
        searchValues:this.searchValues,
        model: res,
        isViewDetils:false
      }; 
      super.add(AbsenceLogsComponent, newFilter);
    });
  }

  viewDetail(model: any) {
    let newFilter = {
      searchValues:this.searchValues,
      model: model,
      isViewDetils:true
    }; 
    super.openViewDetail(AbsenceLogsComponent,newFilter);
  }

}