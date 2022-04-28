import { Component, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material';
import {  ActivatedRoute } from '@angular/router';
import { FreeDutyComponent } from './free-duty/free-duty.component';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { FreeDutiesService } from './services/free-duties.service';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { FreeDutySettingComponent } from './free-duty-setting/free-duty-setting.component';

@Component({
  selector: 'app-free-duties',
  templateUrl: './free-duties.component.html',
  styleUrls: ['./free-duties.component.scss']
})
export class FreeDutiesComponent extends BaseListComponent implements OnInit {

  get Service(): FreeDutiesService { return Shell.Injector.get(FreeDutiesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'freeDuties.freeDuty',
    componentName: 'FreeDutiesComponent'
  };
  public columns: ColumnsInterface[] = [
    // {
    //   field: 'field.dutyDescriptionName',
    //   header: 'freeDuties.dutyDescriptionName',
    //   filterMode: 'text',
    //   selector: true,
    //   print: true,
    //   sort: true
    // },
    {
      field: 'dutyDescriptionFl',
      header: 'freeDuties.dutyDescriptionFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'dutyDescriptionSl',
      header: 'freeDuties.dutyDescriptionSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'hasHoliday',
      header: 'freeDuties.hasHoliday',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'includeOverTime',
      header: 'freeDuties.includeOverTime',
      filterMode: 'check',
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
      name: 'freeDuties.viewDetailsName',
      icon: 'settings',
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
    super.add(FreeDutyComponent, model); 
  }
  viewDetail(model: any) {
    let data = { data: model, isViewDetils: false };
    super.openViewDetail(FreeDutySettingComponent, data);
  }
  
}
