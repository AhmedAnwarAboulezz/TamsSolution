import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { OrganizationOvertimeRegulationsService } from './Service/organization-overtime-regulations.service';
import { Shell } from 'src/app/component/shell';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OrganizationOvertimeRegulationComponent } from './organization-overtime-regulation/organization-overtime-regulation.component';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-organization-overtime-regulations',
  templateUrl: './organization-overtime-regulations.component.html',
  styleUrls: ['./organization-overtime-regulations.component.scss']
})
export class OrganizationOvertimeRegulationsComponent extends BaseListComponent implements OnInit{
  get Service(): OrganizationOvertimeRegulationsService
  { 
    return Shell.Injector.get( OrganizationOvertimeRegulationsService); 
  }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  isdefault=false;
  tabIndex = 0;
  tableData = {
    name: 'organizationOvertimeRegulations.organizationOvertimeRegulations',
    componentName: 'OrganizationOvertimeRegulationsComponent'

  };
  public columns: ColumnsInterface[] = [
    {
      field: 'startDate',
      header: 'organizationOvertimeRegulations.startDate',    
      filterMode: 'date',
      customCell: 'date',
      selector: true,      
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      header: 'organizationOvertimeRegulations.endDate',    
      filterMode: 'date',
      customCell: 'date',
      selector: true,      
      print: true,
      sort: true
    },
   
    {
      field: 'mustSignForOverTime',
      header: 'organizationOvertimeRegulations.mustSignForOverTime',
      filterMode: 'check',
      customCell: 'check',
      selector: true
    },
    {         
      field: 'overtimeMinimum',
      header: 'organizationOvertimeRegulations.overtimeMinimum',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    }, {         
      field: 'overtimeMaxmumInWorkDay',
      header: 'organizationOvertimeRegulations.overtimeMaxmumInWorkDay',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    }, {         
      field: 'overtimeMaxmumInOffDay',
      header: 'organizationOvertimeRegulations.overtimeMaxmumInOffDay',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'overTimeFromSpecificDevices',
      header: 'organizationOvertimeRegulations.overTimeFromSpecificDevices',
      filterMode: 'check',
      customCell: 'check',
      selector: true
    } ,
    {
      field: 'isDefault',
      header: 'organizationOvertimeRegulations.default',
      filterMode: 'check',
      customCell: 'check',
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
  addEvent(model: any) {
   
      super.add(OrganizationOvertimeRegulationComponent, model);
      
  }
  ngOnInit() {
  }

 

  

}
