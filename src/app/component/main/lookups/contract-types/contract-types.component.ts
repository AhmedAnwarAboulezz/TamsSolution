
import { Component, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import {  ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ContractTypesService } from './Services/contract-types.service';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-contractTypes',
  templateUrl: './contract-types.component.html',
  styleUrls: ['./contract-types.component.scss']
})
export class ContractTypesComponent extends BaseListComponent implements OnInit {

  get Service(): ContractTypesService { return Shell.Injector.get(ContractTypesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'contractTypes.contractTypes',
    componentName: 'ContractTypesComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'contractTypeFL',
      header: 'contractTypes.contractTypeFL',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'contractTypeSL',
      header: 'contractTypes.contractTypeSL',    
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
    super.add(ContractTypeComponent,model);
  }
}