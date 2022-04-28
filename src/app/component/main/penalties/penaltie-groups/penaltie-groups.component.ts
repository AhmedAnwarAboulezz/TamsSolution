import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { PenaltieGroupComponent } from './penaltie-group/penaltie-group.component';
import { PenaltieGroupService } from './services/penaltiegroup.services';

@Component({
  selector: 'app-penaltie-groups',
  templateUrl: './penaltie-groups.component.html',
  styleUrls: ['./penaltie-groups.component.scss']
})

export class PenaltieGroupsComponent extends BaseListComponent implements OnInit {

  get Service(): PenaltieGroupService { return Shell.Injector.get(PenaltieGroupService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'PenaltieGroups.PenaltieGroups',
    componentName: 'PenaltieGroupsComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'penaltieGroupCode',
      header: 'PenaltieGroups.penaltieGroupCode',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
    },
    {
      field: 'penaltieGroupFl',
      header: 'PenaltieGroups.penaltieGroupFl',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    
    {
      field: 'penaltieGroupSl',
      header: 'PenaltieGroups.penaltieGroupSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'contentCount',
      header: 'PenaltieGroups.contentCount',    
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true,
    },
    {
      field: 'isForSupervisoryJob',
      header: 'PenaltieGroups.isForSupervisoryJob',
      filterMode: 'check',
      customCell: 'check',
      selector: true ,
      print: true,
      sort: true     
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
    super.add(PenaltieGroupComponent,model,'1100px');
  }
 
}
