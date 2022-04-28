import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationNewsRoutingModule } from './notification-news-routing.module';
import { NotificationsNewsGridComponent } from './notifications-news-grid/notifications-news-grid.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NotificationsNewsAddComponent } from './notifications-news-add/notifications-news-add.component';
import { NotificationsNewsViewComponent } from './notifications-news-view/notifications-news-view.component';


@NgModule({
  declarations: [NotificationsNewsGridComponent, NotificationsNewsAddComponent, NotificationsNewsViewComponent],
  imports: [
    CommonModule,
    NotificationNewsRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule
  ],
  entryComponents:[NotificationsNewsGridComponent, NotificationsNewsAddComponent, NotificationsNewsViewComponent]
})
export class NotificationNewsModule { }
