import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DialogService } from 'primeng/api';
import { UsermangmentComponent } from './usermangment/usermangment.component';
import { UsermangmentsService } from './services/usermangments.service';

@Component({
  selector: 'app-usermangments',
  templateUrl: './usermangments.component.html',
  styleUrls: ['./usermangments.component.scss'],
  providers: [DialogService]
})
export class UsermangmentsComponent extends BaseListComponent implements OnInit {

  get Service(): UsermangmentsService { return Shell.Injector.get(UsermangmentsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'usermangments.title',
    componentName: 'UsermangmentsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNO',
      header: 'usermangments.employeeNO',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.employeeNumber'
    },
    {
      field: 'field.employeeName',
      header: 'usermangments.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'field.employeeEmployeeName',
      isfield:true      
    },
    {
      field: 'civilId',
      header: 'usermangments.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.civilId'
    },
    {
      field: 'isActive',
      header: 'usermangments.active',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'expireDate',
      printField: 'expireDateStr',
      header: 'usermangments.expireDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'username',
      printField: 'username',
      header: 'usermangments.username',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {
  }

  addEvent(model: any) {
    super.add(UsermangmentComponent, model);
  }

}
