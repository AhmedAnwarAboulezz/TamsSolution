import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { NotificationsNewsAddComponent } from './notifications-news-add/notifications-news-add.component';
import { NotificationsNewsGridComponent } from './notifications-news-grid/notifications-news-grid.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'notification-news-grid',
    pathMatch: 'full'
  },
  {
    path: 'notification-news-grid',
    component: NotificationsNewsGridComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'notification-news-add',
    component: NotificationsNewsAddComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationNewsRoutingModule { }
