import { FixeddutyComponent } from './fixedduty/fixedduty.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FixedDutiesService } from './services/fixedduties.service';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DutySettingsComponent } from './duty-settings/duty-settings.component';

@Component({
  selector: 'app-fixedduties',
  templateUrl: './fixedduties.component.html',
  styleUrls: ['./fixedduties.component.scss']
})
export class FixeddutiesComponent extends BaseListComponent implements OnInit {

  get Service(): FixedDutiesService { return Shell.Injector.get(FixedDutiesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'fixedDuties.fixedDuty',
    componentName: 'FixeddutiesComponent'
  };
  public columns: ColumnsInterface[] = [
    // {
    //   field: 'field.dutyDescriptionName',
    //   header: 'fixedDuties.dutyDescriptionName',
    //   filterMode: 'text',
    //   selector: true,
    //   print: true,
    //   sort: true
    // },
     
    {
      field: 'dutyDescriptionFl',
      header: 'fixedDuties.dutyDescriptionFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'dutyDescriptionSl',
      header: 'fixedDuties.dutyDescriptionSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'hasHoliday',
      header: 'fixedDuties.hasHoliday',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'includeOverTime',
      header: 'fixedDuties.includeOverTime',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.dutyType',
      dropdownFilterName: 'dutyTypeId',
      header: 'fixedDuties.dutyTypeName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      sortName:'field.dutyTypefield',
      isfield:true
    },
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      name: 'fixedDuties.viewDetailsName',
      icon: 'settings',
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
    super.add(FixeddutyComponent, model); 
  }

  viewDetail(model: any) {
    let data = { data: model, isViewDetils: false };
    super.openViewDetail(DutySettingsComponent,data);
  }
  lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {   
      data.splice(2);         
      this.columns[4].filterDropdown = data;
    });
  }
}