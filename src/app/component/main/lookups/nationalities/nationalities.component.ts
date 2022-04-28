import { NationalityComponent } from './nationality/nationality.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { NationalitiesService } from './Services/nationalities.services';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-nationalities',
  templateUrl: './nationalities.component.html',
  styleUrls: ['./nationalities.component.scss']
})

export class NationalitiesComponent extends BaseListComponent implements OnInit {

  get Service(): NationalitiesService { return Shell.Injector.get(NationalitiesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'nationalities.nationalities',
    componentName: 'NationalitiesComponent'

  };

  public columns: ColumnsInterface[] = [
    {

      field: 'code',
      header: 'nationalities.code',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
  
    
    {
      field: 'nationalityFl',
      header: 'nationalities.nationalityFL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'nationalitySl',
      header: 'nationalities.nationalitySL',
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
    super.add(NationalityComponent,model);
  }
}
