import { Component, OnInit, OnChanges } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from './Services/countries.service';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { CountryComponent } from './country/country.component';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DialogService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [DialogService]
})
export class CountriesComponent extends BaseListComponent implements OnInit {

  get Service(): CountriesService { return Shell.Injector.get(CountriesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);    
  }

  tableData = {
    name: 'lookup.country',
    componentName: 'CountriesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'lookup.code',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'nameFl',
      header: 'lookup.nameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'nameSl',
      header: 'lookup.nameSl',
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


  addEvent(model: any) {
    super.add(CountryComponent, model);
  }
}
