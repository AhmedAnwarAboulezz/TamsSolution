import { JobComponent } from './job/job.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { JobsService } from './Services/jobs.services';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})

export class JobsComponent extends BaseListComponent implements OnInit {

  get Service(): JobsService { return Shell.Injector.get(JobsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'jobs.jobs',
    componentName: 'JobsComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'jobs.code',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'jobFL',
      header: 'jobs.jobFL',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'jobSL',
      header: 'jobs.jobSL',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
   
    {
      field: 'exemptionFromFingerprint',
      header: 'jobs.exemptionFromFingerprint',
      filterMode: 'check',
      customCell: 'check',
      selector: true ,
      print: true,
      sort: true     
    },
    {
      field: 'supervisoryJob',
      header: 'jobs.supervisoryJob',
      filterMode: 'check',
      customCell: 'check',
      selector: true ,
      print: true,
      sort: true     
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
    super.add(JobComponent,model);
  }
}
