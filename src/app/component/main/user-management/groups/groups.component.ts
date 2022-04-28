import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DialogService } from 'primeng/api';
import { GroupComponent } from './group/group.component';
import { GroupsService } from './services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [DialogService]
})
export class GroupsComponent extends BaseListComponent implements OnInit {

  get Service(): GroupsService { return Shell.Injector.get(GroupsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'groups.title',
    componentName: 'GroupsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'groups.code',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    // {
    //   field: 'field.groupName',
    //   header: 'groups.groupName',
    //   filterMode: 'text',
    //   selector: true,
    //   print: true,
    //   sort: true,
    //   isfield:true
    // },
    {
      field: 'groupFL',
      header: 'groups.groupFL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'groupSL',
      header: 'groups.groupSL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'active',
      header: 'groups.active',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true
    }
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
    super.add(GroupComponent, model);
  }

}
