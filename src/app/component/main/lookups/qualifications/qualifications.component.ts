import { QualificationComponent } from './qualification/qualification.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { QualificationsService } from './Services/qualifications.services';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss']
})

export class QualificationsComponent extends BaseListComponent implements OnInit {

  get Service(): QualificationsService { return Shell.Injector.get(QualificationsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'qualifications.qualifications',
    componentName: 'QualificationsComponent'

  };

  public columns: ColumnsInterface[] = [

    {
      field: 'qualificationTypeFl',
      header: 'qualifications.qualificationTypeFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'qualificationTypeSl',
      header: 'qualifications.qualificationTypeSl',
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
    super.add(QualificationComponent,model);
  }
}