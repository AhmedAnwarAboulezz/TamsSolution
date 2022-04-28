import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { OpenCloseYearComponent } from '../open-close-year/open-close-year.component';
import { LockleavesService } from '../Services/lockleaves';
import { OpenCloseYearService } from '../Services/openCloseYear.service';

@Component({
  selector: 'app-lock-leaves-grid',
  templateUrl: './lock-leaves-grid.component.html',
  styleUrls: ['./lock-leaves-grid.component.scss']
})

export class LockLeavesGridComponent extends BaseListComponent implements OnInit {

  get Service(): OpenCloseYearService { return Shell.Injector.get(OpenCloseYearService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);   
     
  }

  tableData = {
    name: 'lockYears.lockYear',
    componentName: 'LockLeavesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'applyDate',
      header: 'openCloseYears.applyDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'year',
      header: 'openCloseYears.year',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.lockYearType',
      dropdownFilterName: 'lockYearTypeIds',
      header: 'openCloseYears.lockYearType',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true,
      sortName:'lockYearTypeId',
      isfield:true
    },
    {
      field: 'userName',
      dropdownFilterName: 'userIds',
      header: 'openCloseYears.userName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true,
      sortName:'userId'
    },
    {
      field: 'notes',
      header: 'openCloseYears.notes',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.actionType',
      dropdownFilterName: 'actionTypeIds',
      header: 'openCloseYears.actionType',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true,
      sortName:'actionTypeId',
      isfield:true
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
      isDelete: false
    }
  ];

  lookups(): void {
  //   let data2 = [
  //     { nameFl:'leaves', nameSl:'أجازات', id:'10000000-1000-1000-1000-100000000000' },
  //     { nameFl:'permissions', nameSl:'إستئذانات', id:'20000000-2000-2000-2000-200000000000' }
  // ];
  //   this.columns[2].filterDropdown = data2;
  //   let data5 = [
  //     { nameFl:'Opened', nameSl:'مفتوح', id:'10000000-1000-1000-1000-100000000000' },
  //     { nameFl:'Closed', nameSl:'مغلق', id:'20000000-2000-2000-2000-200000000000' }
  // ];
  //   this.columns[5].filterDropdown = data5;
    this.Service.getUsers().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
    this.Service.getActionTypes().subscribe((data: any) => {
      this.columns[5].filterDropdown = data;
    });
    this.Service.getLockTypes().subscribe((data: any) => {
      this.columns[2].filterDropdown = data;
    });
  }
  ngOnInit(): void {
    this.lookups();

  }

  addEvent(model: any) {
    super.add(OpenCloseYearComponent,model);
  }
}