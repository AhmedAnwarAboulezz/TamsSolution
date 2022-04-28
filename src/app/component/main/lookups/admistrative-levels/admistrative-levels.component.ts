import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { AdminstrativeLevelsService } from './Services/adminstrative-levels.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { AdmistrativeLevelComponent } from './admistrative-level/admistrative-level.component';
import { TreeNode } from 'src/app/shared/components/tree/models/tree';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { TreeComponent } from 'angular-tree-component';
import { NgModel } from '@angular/forms';
import { ShowTreeComponent } from './show-tree/show-tree.component';

@Component({
  selector: 'app-admistrative-levels',
  templateUrl: './admistrative-levels.component.html',
  styleUrls: ['./admistrative-levels.component.scss']
})
export class AdmistrativeLevelsComponent extends BaseListComponent implements OnInit {

  get Service(): AdminstrativeLevelsService { return Shell.Injector.get(AdminstrativeLevelsService); }
  constructor(public route: ActivatedRoute,
     public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'administrativeLevel.title',
    componentName: 'AdmistrativeLevelsComponent'
  };
 
  public columns: ColumnsInterface[] = [
    
    {
      field: 'admLevelFl',
      header: 'administrativeLevel.nameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
      
    },
    {
      field: 'admLevelSl',
      header: 'administrativeLevel.nameSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'field.parentName',
      header: 'administrativeLevel.parent',
      sortName: 'parentId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'admEmail',
      header: 'administrativeLevel.email',
      filterMode: 'text',
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
    super.add(AdmistrativeLevelComponent, model , '1200px');
  }

}
