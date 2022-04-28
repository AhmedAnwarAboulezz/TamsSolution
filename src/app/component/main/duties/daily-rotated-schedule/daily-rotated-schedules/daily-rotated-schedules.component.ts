import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DialogService } from 'primeng/api';
import { DailyRotatedScheduleComponent } from '../daily-rotated-schedule/daily-rotated-schedule.component';
import { DailyRotatedSchedulesService } from '../services/DayType/daily-rotated-schedules.service';
import { DailyRotatedScheduleDetail } from 'src/app/models/dailyRotatedSchedule';

@Component({
  selector: 'app-daily-rotated-schedules',
  templateUrl: './daily-rotated-schedules.component.html',
  styleUrls: ['./daily-rotated-schedules.component.scss']
})
export class DailyRotatedSchedulesComponent extends BaseListComponent implements OnInit {
  get Service(): DailyRotatedSchedulesService { return Shell.Injector.get(DailyRotatedSchedulesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'dailyRotatedSchedules.title',
    componentName: 'DailyRotatedSchedulesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'dailyRotatedSchedules.code',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'groupDescriptionFl',
      header: 'dailyRotatedSchedules.groupDescriptionFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang,

    },
    {
      field: 'groupDescriptionSl',
      header: 'dailyRotatedSchedules.groupDescriptionSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'dailyRotatedSchedules.startDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'dailyRotatedSchedules.endDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

  addEvent(model: any) {
    super.add(DailyRotatedScheduleComponent, model, '1100px');
  }

}
