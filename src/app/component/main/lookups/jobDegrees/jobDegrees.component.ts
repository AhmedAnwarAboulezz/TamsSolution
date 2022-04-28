import{JobDegreeComponent} from './jobDegree/jobDegree.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { JobDegreesService } from './Services/jobDegrees.services';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-jobDegrees',
  templateUrl: './jobDegrees.component.html',
  styleUrls: ['./jobDegrees.component.scss']
})

export class JobDegreesComponent extends BaseListComponent implements OnInit {

  get Service(): JobDegreesService { return Shell.Injector.get(JobDegreesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'jobDegrees.jobDegrees',
    componentName: 'JobDegreesComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'jobDegrees.code',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'jobDegreeFL',
      header: 'jobDegrees.jobDegreeFL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'jobDegreeSL',
      header: 'jobDegrees.jobDegreeSL',
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
    super.add(JobDegreeComponent,model);
  }
}