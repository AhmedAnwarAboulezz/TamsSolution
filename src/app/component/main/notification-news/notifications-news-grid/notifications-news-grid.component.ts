import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { NotificationsNewsAddComponent } from '../notifications-news-add/notifications-news-add.component';
import { NotificationsNewsViewComponent } from '../notifications-news-view/notifications-news-view.component';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-notifications-news-grid',
  templateUrl: './notifications-news-grid.component.html',
  styleUrls: ['./notifications-news-grid.component.scss']
})

export class NotificationsNewsGridComponent extends BaseListComponent implements OnInit {
  notificationTypes: any[] = [];
  periorities: any[] = [];
  get Service(): NotificationService { return Shell.Injector.get(NotificationService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public loaderService: LoaderService) {
    super(dialog);
  }

  tableData = {
    name: 'notification.NotificationsNews',
    componentName: 'NotificationsNewsGridComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'messageAr',
      header: 'notification.messageAr',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'messageEn',
      header: 'notification.messageEn',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'createdDate',
      printField: 'createdDate',
      header: 'notification.createDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },    
    {
      field: 'field.notificationTypeName' ,
      dropdownFilterName: 'notificationTypeIds',
      header: 'notification.notificationType',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      sortName:'notificationType',
      isfield:true
    },
    {
      field: 'url',
      header: 'notification.url',
      filterMode: 'url',
      selector: true,
      print: false,
      sort: false
    },
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: false
    },
    {
      name: 'notification.employeesList',
      icon: 'person_pin',
      isView: true
    }
    ,
    {
      isDelete: false
    }
  ];
  ngOnInit(): void {
    this.lookups();
  }

  addEvent(model: any) {
    super.add(NotificationsNewsAddComponent, model,"900px"); 
  }

  viewDetail(model: any) {
    this.Service.getNotificationsByMessage(model).subscribe((res: any) => { 
      this.loaderService.hide();  
      let allNotifications = { main: model,details: res };
      super.openViewDetail(NotificationsNewsViewComponent,allNotifications, '1000px');
    },error => {
      this.loaderService.hide();
      this.Alert.showError("An Error Happened");
    });
    //super.openViewDetail(NotificationsNewsViewComponent,model);
  }

  lookups(): void {   
    this.notificationTypes = [
      // { nameFl:"Workflow", nameSl:"موافقات", id:1},
      { nameFl:"News", nameSl:"أخبار", id:2},
      { nameFl:"HR", nameSl:"موارد بشرية", id:3}
    ];
    this.periorities = [
      { nameFl:"High", nameSl:"أولية", id:1},
      { nameFl:"Low", nameSl:"أقل أهمية", id:2}
    ];

      this.columns[3].filterDropdown = this.notificationTypes;
    
  }

}