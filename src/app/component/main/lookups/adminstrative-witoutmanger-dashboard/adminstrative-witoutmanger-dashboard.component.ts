import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { AdminstrativeLevelsService } from '../admistrative-levels/Services/adminstrative-levels.service';

@Component({
  selector: 'app-adminstrative-witoutmanger-dashboard',
  templateUrl: './adminstrative-witoutmanger-dashboard.component.html',
  styleUrls: ['./adminstrative-witoutmanger-dashboard.component.scss']
})
export class AdminstrativeWitoutmangerDashboardComponent extends BaseListComponent implements OnInit {

  get Service(): AdminstrativeLevelsService { return Shell.Injector.get(AdminstrativeLevelsService); }
  constructor(public route: ActivatedRoute,
     public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'administrativeLevel.adminstrativewitoutmanger',
    componentName: 'AdminstrativeWitoutmangerDashboardComponent'
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
      isEdit: false
    },
    {
      isDelete: false
    }
  ];
  ngOnInit(): void {   

  }
  

}
