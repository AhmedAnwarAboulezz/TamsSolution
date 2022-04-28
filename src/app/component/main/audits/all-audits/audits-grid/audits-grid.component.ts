import { Component, OnInit, Input } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { AuditsDetailComponent } from '../audits-detail/audits-detail.component';
import { AuditService } from '../services/audits.service';
import { AuditsRangeDetailComponent } from '../audits-range-detail/audits-range-detail.component';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-audits-grid',
  templateUrl: './audits-grid.component.html',
  styleUrls: ['./audits-grid.component.scss']
})


export class AuditsGridComponent extends BaseListComponent implements OnInit {
  @Input() searchValues: any;
  get Service(): AuditService { return Shell.Injector.get(AuditService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public loaderService: LoaderService) {
    super(dialog);
  }
  tableData = {
    name: 'audit.auditGrid',
    componentName: 'AuditsGridComponent'
  };
  
  public columns: ColumnsInterface[] = [
    {      
      field: 'startDate',
      header: 'audit.changeDate',    
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'componentName',
      header: 'audit.screenName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: false,
      translate:true
    },
    {
      field: 'field.actionName',
      header: 'audit.actionName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: false,
      isfield:true
    },    
    {
      field: 'changedBy',
      header: 'audit.changedBy',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName',
      header: 'audit.doneOn',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: false,
      showMore: true,
      isfield:true
    }    
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: false
    },
    {
      isView: true
    }    
  ];
  ngOnInit(): void {
  }

  viewDetail(model: any) {
    this.loaderService.show();
    if(model.actionId !== 5 && model.actionId !== 6)
    {
      this.Service.getAuditDetails(model.id, this.localize.currentLang).subscribe((res: any) => { 
        this.loaderService.hide();  
        let allAudit = { audit: model, auditDetail: res };
        super.openViewDetail(AuditsDetailComponent,allAudit, '1000px');
      },error => {
        this.loaderService.hide();
        this.Alert.showError("An Error Happened");
      });
    }
    else{
      this.Service.getAuditRangeDetails(model.id, this.localize.currentLang).subscribe((res: any) => {   
        this.loaderService.hide();
        let allAudit = { audit: model, auditDetail: res };
        super.openViewDetail(AuditsRangeDetailComponent,allAudit, '1000px');
      },error => {
        this.loaderService.hide();
        this.Alert.showError("An Error Happened");
      });
    }
    
  }
  

}

