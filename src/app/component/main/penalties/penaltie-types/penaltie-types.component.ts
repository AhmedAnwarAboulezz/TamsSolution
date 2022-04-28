import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { PenaltieTypeComponent } from './penaltie-type/penaltie-type.component';
import { PenaltieTypesService } from './services/penaltietypes.services';

@Component({
  selector: 'app-penaltie-types',
  templateUrl: './penaltie-types.component.html',
  styleUrls: ['./penaltie-types.component.scss']
})

export class PenaltieTypesComponent extends BaseListComponent implements OnInit {

  get Service(): PenaltieTypesService { return Shell.Injector.get(PenaltieTypesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'PenaltieTypes.PenaltieTypes',
    componentName: 'PenaltieTypesComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'penaltiesTypeFl',
      header: 'PenaltieTypes.penaltiesTypeFl',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    
    {
      field: 'penaltiesTypeSl',
      header: 'PenaltieTypes.penaltiesTypeSl',
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
    super.add(PenaltieTypeComponent,model);
  }
}
