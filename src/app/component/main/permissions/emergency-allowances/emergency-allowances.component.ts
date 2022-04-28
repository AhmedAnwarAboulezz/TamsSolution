
import { EmergencyAllowanceComponent } from './emergency-allowance/emergency-allowance.component';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { EmergencyAllowancesService } from './services/emergency-allowances.service';
import { Shell } from 'src/app/component/shell';
import { DialogService } from 'primeng/api';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-emergency-allowances',
  templateUrl: './emergency-allowances.component.html',
  styleUrls: ['./emergency-allowances.component.scss']
})
export class EmergencyAllowancesComponent extends BaseListComponent implements OnInit {

  get Service(): EmergencyAllowancesService { return Shell.Injector.get(EmergencyAllowancesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'emergencyAllowances.emergencyAllowances',
    componentName: 'EmergencyAllowancesComponent'
  };
  public columns: ColumnsInterface[] = [
    
    {
      field: 'field.descriptionType',
      dropdownFilterName: 'descriptionTypeId',
      header: 'emergencyAllowances.typeLocationOrDepartment',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      sortName:'descriptionTypeId',
      isfield:true
    },
    {
      field: 'field.allowanceDescription',
      header: 'emergencyAllowances.description',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'descriptionId',
      isfield:true
    },
    
    {
      field: 'field.allowanceTypeName',
      dropdownFilterName: 'allowanceTypeId',
      header: 'emergencyAllowances.exemption',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      isfield:true
      
    },
    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'emergencyAllowances.startDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'emergencyAllowances.endDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
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
 this.Lookups();
  }

  addEvent(model: any) {
    super.add(EmergencyAllowanceComponent,model);
  }
  

  Lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {      
      this.columns[2].filterDropdown = data[0];
      this.columns[0].filterDropdown = data[1];

    });
  }
}