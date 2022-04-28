
import { ReligionComponent } from './Religion/Religion.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ReligionsService } from './Services/religions.services';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Religions',
  templateUrl: './Religions.component.html',
  styleUrls: ['./Religions.component.scss']
})
export class ReligionsComponent extends BaseListComponent implements OnInit {
  get Service(): ReligionsService { return Shell.Injector.get(ReligionsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'religions.religion',
    componentName: 'ReligionsComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'religions.code',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
   
    
    {
      field: 'descriptionFl',
      header: 'religions.descriptionFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'descriptionSl',              
      header: 'religions.descriptionSl',
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
    super.add(ReligionComponent, model);
  }

}
