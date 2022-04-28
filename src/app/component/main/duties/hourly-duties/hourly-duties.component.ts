import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { HourlyDutiesService } from './Services/hourly-duties.service';
import { Shell } from 'src/app/component/shell';
import { ActivatedRoute } from '@angular/router';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { HourlyDutyComponent } from './hourly-duty/hourly-duty.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-hourly-duties',
  templateUrl: './hourly-duties.component.html',
  styleUrls: ['./hourly-duties.component.scss']
})
export class HourlyDutiesComponent extends BaseListComponent implements OnInit {

  get Service(): HourlyDutiesService { return Shell.Injector.get(HourlyDutiesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'hourlyRotated.title',
    componentName: 'HourlyDutiesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'hourlyRotated.code',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'groupDescriptionFl',
      header: 'hourlyRotated.groupnamefl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'groupDescriptionSl',
      header: 'hourlyRotated.groupnamesl',
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
      header: 'hourlyRotated.startdate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'hourlyRotated.enddate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'startTime',
      header: 'hourlyRotated.starttime',
      filterMode: 'time',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'workingHours',
      header: 'hourlyRotated.workinghours',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'restHours',
      header: 'hourlyRotated.resthours',
      filterMode: 'number',
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
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

  addEvent(model: any) {
    super.add(HourlyDutyComponent, model, '60em');
  }
}
