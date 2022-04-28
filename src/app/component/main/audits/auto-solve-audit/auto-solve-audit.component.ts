import { Component, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DialogService } from 'primeng/api';
import { AutoLogAuditService } from './Services/autoLogAudit.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { AutoSolveAuditDetailsComponent } from './auto-solve-audit-details/auto-solve-audit-details.component';


@Component({
  selector: 'app-auto-solve-audit',
  templateUrl: './auto-solve-audit.component.html',
  styleUrls: ['./auto-solve-audit.component.scss'],
  providers: [DialogService]
})
export class AutoSolveAuditComponent extends BaseListComponent implements OnInit {

  get Service(): AutoLogAuditService { return Shell.Injector.get(AutoLogAuditService); }
  constructor(
    public route: ActivatedRoute, 
    public dialog: MatDialog,
    public loaderService: LoaderService
    ) {
    super(dialog);    
    this.lookups();
  }

  tableData = {
    name: 'autoSolve.autoSolveAudit',
    componentName: 'AutoSolveAuditComponent'
  };
  public columns: ColumnsInterface[] = [
    {      
      field: 'applyDate',
      header: 'audit.changeDate',    
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'userName',
      dropdownFilterName: 'userIds',
      header: 'audit.changedBy',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      sortName:'userId'
    },
    {
      field: 'notes',
      header: 'LockLeaves.notes',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },        
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: false
    },
    {
      isView: true
    },
    {
      isDelete: false
    }
  ];

  lookups(): void {
    this.Service.getUsers().subscribe((data: any) => {
      this.columns[1].filterDropdown = data;
    });
  }

  viewDetail(model: any) {
    //this.loaderService.show();

    super.openViewDetail(AutoSolveAuditDetailsComponent,model, '1000px');
    
      // this.Service.getAutoSolveDetails(model.id).subscribe((res: any) => {   
      //   this.loaderService.hide();
      //   let allAudit = { audit: model, auditDetail: res };
      //   super.openViewDetail(AuditsRangeDetailComponent,allAudit, '1000px');
      // },error => {
      //   this.loaderService.hide();
      //   this.Alert.showError("An Error Happened");
      // });
    
    
  }
}
