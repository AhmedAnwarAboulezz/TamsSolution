import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { TestService } from './services/test.service';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { AddTestComponent } from './componenets/add/add-test.component';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseListComponent implements OnInit {

  url = {
    getAll: 'countries/GetAllPaged',
    delete: 'countries/delete'
  };
  get Service(): TestService { return Shell.Injector.get(TestService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'countries'
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
      sort: true
    },
    {
      field: 'nameSl',
      header: 'lookup.nameSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'countryId',
      header: 'lookup.country',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true
    },
    {
      field: 'countryId',
      header: 'lookup.active',
      filterMode: 'check',
      customCell: 'check',
      selector: true
    },
    {
      field: 'createdDate',
      header: 'lookup.createdDate',
      filterMode: 'date',
      customCell: 'date',
      selector: true,
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
    this.lookups();
  }

  lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
  }
  add(model: any) {
    super.add(AddTestComponent, model);
  }

}
