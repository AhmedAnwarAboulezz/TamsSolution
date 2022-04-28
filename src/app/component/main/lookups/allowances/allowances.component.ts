import { AllowanceSettingComponent } from './allowance-setting/allowance-setting.component';

import { AllowanceComponent } from './allowance/allowance.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { AllowancesService } from './Services/allowances.services';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { FilterDropDownList } from 'src/app/models/filterDropDownList';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-allowances',
  templateUrl: './allowances.component.html',
  styleUrls: ['./allowances.component.scss']
})



export class AllowancesComponent extends BaseListComponent implements OnInit {

  get Service(): AllowancesService { return Shell.Injector.get(AllowancesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'allowances.allowances',
    componentName: 'AllowancesComponent'

  };
 
  public columns: ColumnsInterface[] = [
    
    {
      field: 'field.allowanceTypeName',
      dropdownFilterName: 'allowanceTypeId',
      header: 'allowances.allowanceTypeName',    
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true,
      sortName:'field.allowanceTypeNamefield',
      isfield:true      
    },
   
    {
      field: 'allowanceNameFl',
      header: 'allowances.allowanceNameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'allowanceNameSl',
      header: 'allowances.allowanceNameSl',
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
      isView: true,
      name: 'allowances.allowancesetting',
      icon: 'settings',
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {
    
    this.allowanceType();

  }
  addEvent(model: any) {
    super.add(AllowanceComponent, model);
  }
  viewDetail(model: any) {
    
  let data =  { data: model, isViewDetils: false };
  super.openViewDetail(AllowanceSettingComponent, data);
  }
  
  allowanceType(): void {
    this.Service.getAllowanceType().subscribe((data: any) => {
      this.columns[0].filterDropdown = this.SetDropdownHoliday(data);
    });
  }

  SetDropdownHoliday(data: any) {
    let filterInputs: FilterDropDownList[] = [];
    data.forEach(Obj => {
      let filterinput = new FilterDropDownList();
      filterinput.nameFl = Obj.allowanceTypeNameFl;
      filterinput.nameSl = Obj.allowanceTypeNameSl;
      filterinput.id = Obj.id;
      filterInputs.push(filterinput);
   });
    return filterInputs;
  }
}
