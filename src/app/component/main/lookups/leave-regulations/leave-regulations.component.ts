import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LeaveRegulationComponent } from './leave-regulation/leave-regulation.component';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { LeaveRegulationsService } from './service/leave-regulations';
import { Shell } from 'src/app/component/shell';
import { DialogService } from 'primeng/api';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-leave-regulations',
  templateUrl: './leave-regulations.component.html',
  styleUrls: ['./leave-regulations.component.scss']
})

export class LeaveRegulationsComponent extends BaseListComponent implements OnInit {
  get Service(): LeaveRegulationsService { return Shell.Injector.get(LeaveRegulationsService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'leaveRegulations.leaveRegulations',
    componentName: 'LeaveRegulationsComponent'

  };
  
  public columns: ColumnsInterface[] = [
   
    {
      field: 'leaveNameFl',
      header: 'leaveRegulations.leaveNameFl',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'leaveNameSl',
      header: 'leaveRegulations.leaveNameSl',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
      

    },
    
    {
      field: 'field.countryName',
      dropdownFilterName: 'countryId',
      header: 'leaveRegulations.countryName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sortName:'field.countryField',
      sort: true,
      isfield:true
    },
    {
      field: 'balancePerYear',
      header: 'leaveRegulations.balancePerYear',
      filterMode: 'number',
      selector: true,
      print: true,
     
      sortName:'leaveRegulationBalance.balancePerYear',    
      sort: true
    },
    {
      field: 'field.leaveTypeName',
      dropdownFilterName: 'leaveTypeId',
      header: 'leaveRegulations.leaveTypeName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,      
      sortName:'leaveTypeId',
      sort: true,
      print:true,
      isfield:true
    },
    
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
    this.Lookups();
    
  }
  addEvent(model: any) {
    super.add(LeaveRegulationComponent, model);
  }

  Lookups(): void {
    this.Service.getGridLookup().subscribe((data: any) => {      
      this.columns[2].filterDropdown = data[0];
      this.columns[4].filterDropdown = data[1];

    });
  }
 
}
