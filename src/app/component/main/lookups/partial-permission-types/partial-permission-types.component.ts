
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PartialPermissionTypeComponent } from './partial-permission-type/partial-permission-type.component';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { PartialPermissionTypesService } from './Services/partial-permission-types.services';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-PartialPermissionTypes',
  templateUrl: './partial-permission-types.component.html',
  styleUrls: ['./partial-permission-types.component.scss']
})

export class PartialPermissionTypesComponent extends BaseListComponent implements OnInit {

  get Service(): PartialPermissionTypesService { return Shell.Injector.get(PartialPermissionTypesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'partialPermissionTypes.PartialPermissionTypes',
    componentName: 'PartialPermissionTypesComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'partialPermissionTypes.code',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'partialPermissionFL',
      header: 'partialPermissionTypes.partialPermissionFL',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'partialPermissionSL',
      header: 'partialPermissionTypes.partialPermissionSL',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    
    {
      field: 'field.countryName',
      dropdownFilterName:'countryId',
      header: 'holidayDates.countryName',    
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true,
      sortName:'field.countryField',
      isfield:true    
    },
    {
      field: 'balance',
      header: 'partialPermissionTypes.balance',    
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'numberPerMonth',
      header: 'partialPermissionTypes.numberPerMonth',    
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'period',
      header: 'partialPermissionTypes.period',    
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
     },
     {
      field: 'active',
      header: 'partialPermissionTypes.active',    
      filterMode: 'check',
      customCell: 'check',   
      print: true,
      selector: true,
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
    this.countries();

  }
  addEvent(model: any) {
    super.add(PartialPermissionTypeComponent,model);
  }
  countries(): void {
    this.Service.getCountries().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
  }
}