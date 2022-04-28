import { Component, OnInit, Input } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { EmployeeAttendanceService } from '../services/employeeAttendance.service';
import { Shell } from 'src/app/component/shell';
import { EmployeeAttedanceComponent } from '../employee-attedance/employee-attedance.component';
import { EmployeeAttendanceLog } from 'src/app/models/employeeAttendanceLog';

@Component({
  selector: 'app-attendance-grid',
  templateUrl: './attendance-grid.component.html',
  styleUrls: ['./attendance-grid.component.scss']
})

export class AttendanceGridComponent extends BaseListComponent implements OnInit {
  @Input() logtypes: any[];
  @Input() remarks: any[];
  @Input() searchValues: any;
  viewModel = [];



  
  get Service(): EmployeeAttendanceService { return Shell.Injector.get(EmployeeAttendanceService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'employeeattendance.employeeAttedancesLog',
    componentName: 'EmployeeAttedancesComponent'
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
      field: 'timeEntry',
      printField: 'timeEntryStr',
      header: 'employeeattendance.timeEntry',
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.logTypeName',
      header: 'employeeattendance.logType',
      dropdownFilterName: 'logTypeId',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: true,
      sortName:'logTypeId',
      isfield:true

    },
    {
      field: 'terminalSn',
      header: 'employeeattendance.terminalSn',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.allowanceDescription',
      header: 'employeeattendance.description',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
   
    {
      field: 'field.Remark',
      header: 'employeeattendance.remark',
      dropdownFilterName: 'remarkId',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: true,
      sortName:'remarkId',
      isfield:true

    },
    {
      field: 'lastModfied',
      printField: 'lastModfiedStr',
      header: 'employeeattendance.lastModfied',
      filterMode: 'datetime',
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
      isView: true
    }
    ,
    {
      isDelete: false
    }
  ];
  ngOnInit(): void {
     this.getLookups();

  }


  addEvent(model: any) {
    let newFilter = {
      searchValues:this.searchValues,
      model: model,
      isViewDetils:false
    }; 
    super.add(EmployeeAttedanceComponent, newFilter);
  }

  getLookups() {
        this.columns[4].filterDropdown = this.logtypes;
        this.columns[7].filterDropdown = this.remarks;

  }

  viewDetail(model: any) {
    let newFilter = {
      searchValues:this.searchValues,
      model: model,
      isViewDetils:true
    }; 
    super.openViewDetail(EmployeeAttedanceComponent,newFilter);
  }


}

