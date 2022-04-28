import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DefineWorkflowComponent } from '../define-workflow/define-workflow.component';
import { WorkFlowService } from '../services/workflow.service';
import { AssignStagesComponent } from '../assign-stages/assign-stages.component';

@Component({
  selector: 'app-workflow-template',
  templateUrl: './workflow-template.component.html',
  styleUrls: ['./workflow-template.component.scss']
})

export class WorkflowTemplateComponent extends BaseListComponent implements OnInit {
  allManagerCodes:[] = [];
  allRequestTypes:[] = [];
  allOvertimes:[] = [];
  allLeaves:[] = [];
  allPermissions:[] = [];
  allFullDaysPermission:[] = [];
  get Service(): WorkFlowService { return Shell.Injector.get(WorkFlowService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
    this.getLookups();

  }

  tableData = {
    name: 'workflow.title',
    componentName: 'WorkflowTemplateComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'nameFl',
      header: 'workflow.nameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'nameSl',
      header: 'workflow.nameSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'stageNumber',
      header: 'workflow.stageNumber',
      filterMode: 'null',
      selector: true,
      print: true,
      sort: false
    },
    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'workflow.startDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'workflow.endDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      name: 'workflow.defineRequests',
      icon: 'dashboard',
      isView: true
    },
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

  addEvent(model: any) {
    let newModel = {
      workflow:model, 
      requestTypes:this.allRequestTypes, 
      leaves:this.allLeaves, 
      fullDayPermision:this.allFullDaysPermission,
      permissions: this.allPermissions,
      overtimes: this.allOvertimes,
      managerCodes:this.allManagerCodes
    }
    super.add(DefineWorkflowComponent, newModel, '1100px');
  }

  assignType(model: any) {
    let newModel = {
      workflow:model, 
      requestTypes:this.allRequestTypes, 
      leaves:this.allLeaves, 
      fullDayPermision:this.allFullDaysPermission,
      permissions: this.allPermissions,
      overtimes: this.allOvertimes,
      managerCodes:this.allManagerCodes
    }
    super.openViewDetail(AssignStagesComponent,newModel);
  }

  getLookups(): void {
    this.Service.getLookup().subscribe((data: any) => {
      this.allManagerCodes = data[0];
      this.allRequestTypes = data[1];
      this.allLeaves = data[2];
      this.allPermissions = data[3];
      this.allOvertimes = data[4];
      this.allFullDaysPermission = data[5];
    });
  }

}
