
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { LeavetypesService } from './Services/leavetypes.services';
import { Shell } from 'src/app/component/shell';
import { DialogService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';

@Component({
  selector: 'app-leavetypes',
  templateUrl: './leavetypes.component.html',
  styleUrls: ['./leavetypes.component.scss']
})

export class LeavetypesComponent extends BaseListComponent implements OnInit {

  get Service(): LeavetypesService { return Shell.Injector.get(LeavetypesService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'leavetypes.leavetypes',
    componentName: 'LeavetypesComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'leavetypes.code',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'leaveTypeFL',
      header: 'leavetypes.leaveTypeFL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'leaveTypeSL',
      header: 'leavetypes.leaveTypeSL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    }
    
    
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
    super.add(LeavetypeComponent,model);
  }
}