import { AdminmangerComponent } from './adminmanger/adminmanger.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { AdminmanagersService } from './services/adminmanagers.service';
import { Shell } from 'src/app/component/shell';
import { DialogService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { AddAdminmangerComponent } from './add-adminmanger/add-adminmanger.component';

@Component({
  selector: 'app-adminmangers',
  templateUrl: './adminmangers.component.html',
  styleUrls: ['./adminmangers.component.scss']
})
export class AdminmangersComponent extends BaseListComponent implements OnInit {

  get Service(): AdminmanagersService { return Shell.Injector.get(AdminmanagersService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService, public dialog: MatDialog) {
    super(dialog);
    
  }

  tableData = {
    name: 'adminmanger.title',
    componentName: 'AdminmangersComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'field.admLevelName',
      header: 'adminmanger.adminname',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'adminId',
      isfield:true
    },
    {
      field: 'employeeNumber',
      header: 'adminmanger.number',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.employeeNumber'
    },
    {
      field: 'field.employeeName',
      header: 'adminmanger.mangername',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.employeeNameFl',
      isfield:true
    },
    {
      field: 'civilId',
      header: 'adminmanger.civilid',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.civilId'
    },
          
    {
      field: 'startDate',
      printField:'startDateStr',
      header: 'adminmanger.startdate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField:'endDateStr',
      header: 'adminmanger.enddate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

 
  addEvent(model: any) {
    if (model) {
      super.add(AdminmangerComponent, model,'1200px');
    } else {
      super.add(AddAdminmangerComponent, model,'1200px');
    }
  }
}
