import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from './Services/teams.service';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { TeamComponent } from './team/team.component';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { TeamDetailsComponent } from './team-details/team-details.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent extends BaseListComponent implements OnInit {

  get Service(): TeamsService { return Shell.Injector.get(TeamsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'teams.team',
    componentName: 'TeamsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'teams.code',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    // {
    //   field: 'field.teamName',
    //   header: 'teams.teamName',
    //   filterMode: 'text',
    //   selector: true,
    //   print: true,
    //   sort: true
    // },

    {
      field: 'teamNameFl',
      header: 'teams.teamNameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'teamNameSl',
      header: 'teams.teamNameSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    
    {
      field: 'employeeNumber',
      header: 'teams.employeeNumber',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'isWorkflow',
      header: 'teams.isWorkflow',
      filterMode: 'check',
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
      name: 'teams.teamDetails',
      icon: 'person_pin',
      isView: true
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

  addEvent(model: any) {
    super.add(TeamComponent, model); 
  }

  viewDetail(model: any) {
    super.openViewDetail(TeamDetailsComponent,model);
  }
}
