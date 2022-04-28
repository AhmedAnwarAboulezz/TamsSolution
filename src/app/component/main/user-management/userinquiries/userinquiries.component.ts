import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { UserInquiriesService } from './services/userinqury.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

import { EditUserinquiryComponent } from './edit-userinquiry/edit-userinquiry.component';
import { AddUserinquiryComponent } from './add-userinquiry/add-userinquiry.component';

@Component({
  selector: 'app-userinquiries',
  templateUrl: './userinquiries.component.html',
  styleUrls: ['./userinquiries.component.scss']
})
export class UserinquiriesComponent extends BaseListComponent implements OnInit {

  get Service(): UserInquiriesService { return Shell.Injector.get(UserInquiriesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'userInquiries.title',
    componentName: 'UserInquiriesComponent'
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
  ngOnInit() {
  }
  
  addEvent(model: any) {
    if (model) {
      super.add(EditUserinquiryComponent, model, '1100px');
    } else {
      super.openViewDetail(AddUserinquiryComponent, model);
    }

  }
}
