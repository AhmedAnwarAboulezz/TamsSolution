import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RotatedDutyComponent } from './rotated-duty/rotated-duty.component';
import { RotatedDutiesService } from './services/rotated-duties.service';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-rotated-duties',
  templateUrl: './rotated-duties.component.html',
  styleUrls: ['./rotated-duties.component.scss']
})
export class RotatedDutiesComponent extends BaseListComponent implements OnInit {

  get Service(): RotatedDutiesService { return Shell.Injector.get(RotatedDutiesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'rotatedDuties.rotatedDuties',
    componentName: 'RotatedDutiesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'rotatedDuties.code',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    // {
    //   field: 'field.rotatedDescription',
    //   header: 'rotatedDuties.rotatedDescription',
    //   filterMode: 'text',
    //   selector: true,
    //   print: true,
    //   sort: true
    // },
    {
      field: 'rotatedDescriptionFl',
      header: 'rotatedDuties.rotatedDescriptionFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'rotatedDescriptionSl',
      header: 'rotatedDuties.rotatedDescriptionSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'isIncludeOverTime',
      header: 'rotatedDuties.includeOverTime',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'startTime',
      header: 'rotatedDuties.startTime',
      filterMode: 'time',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endTime',
      header: 'rotatedDuties.endTime',
      filterMode: 'time',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'allowanceIn',
      header: 'rotatedDuties.allowanceIn',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'allowanceOut',
      header: 'rotatedDuties.allowanceOut',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'isAllowBreak',
      header: 'rotatedDuties.allowBreak',
      filterMode: 'check',
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
      isView: false
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

  addEvent(model: any) {
    super.add(RotatedDutyComponent,model); 
  }

}