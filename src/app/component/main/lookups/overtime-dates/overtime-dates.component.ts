
import { OvertimeDateComponent } from './overtime-date/overtime-date.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { OvertimeDatesService } from './Services/overtime-dates.services';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';

@Component({
  selector: 'app-overtime-dates',
  templateUrl: './overtime-dates.component.html',
  styleUrls: ['./overtime-dates.component.scss']
})

export class OvertimeDatesComponent extends BaseListComponent implements OnInit {
  get Service(): OvertimeDatesService { return Shell.Injector.get(OvertimeDatesService); }
  leaveTypes:any;
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
    this.getLookup();
  }
  tableData = {
    name: 'overTimeDates.overtimeDates',
    componentName: 'OvertimeDatesComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'startDate',
      printField:'startDateStr',
      header: 'overTimeDates.startDate',
      filterMode: 'date',
      customCell: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField:'endDateStr',
      header: 'overTimeDates.endDate',
      filterMode: 'date',
      customCell: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'notes',
      header: 'emergencyAllowances.Note',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
     field: 'isDefault',
     header: 'overTimeDates.isDefault',
     filterMode: 'check',
     customCell: 'check',   
     print: true,
     selector: true
   }


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
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }
  addEvent(model: any) {
    let newModel = {
      data:model, leaveType:this.leaveTypes
    }
    super.add(OvertimeDateComponent, newModel);
  }
  viewDetail(model: any) {
    let data = { data: model, leaveType:this.leaveTypes, isViewDetils: true };
    super.openViewDetail(OvertimeDateComponent, data);
  }


  getLookup(){
    this.Service.getLeaveTypes().subscribe((res:any) => {
      this.leaveTypes = res;
   });
  }


}