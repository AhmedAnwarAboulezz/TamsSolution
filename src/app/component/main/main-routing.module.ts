import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ShiftsComponent } from '../shifts-component/shifts.component';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'duties/EmployeeFixedDutyPeriod',
        component: ShiftsComponent,
        canActivate:[AuthGuardCheckPage]

      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate:[AuthGuardCheckPage]
      },
      {
        path: 'lookups',
        loadChildren: 'src/app/component/main/lookups/lookups.module#LookupsModule'
      },
      {
        path: 'usermanagement',
        loadChildren: 'src/app/component/main/user-management/user-management.module#UserManagementModule'
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'duties',
        loadChildren: 'src/app/component/main/duties/duties.module#DutiesModule'
      },
      {
        path: 'leaves',
        loadChildren: 'src/app/component/main/leaves/leaves.module#LeavesModule'
      },
      {
        path: 'permissions',
        loadChildren: 'src/app/component/main/permissions/permissions.module#PermissionsModule'
      },
      {
        path: 'logs',
        loadChildren: 'src/app/component/main/logs/logs.module#LogsModule'
      },
      {
        path: 'organizations',
        loadChildren: 'src/app/component/main/organization/organization.module#OrganizationModule'
      },
      {
        path: 'reports',
        loadChildren: 'src/app/component/main/reports/reports.module#ReportsModule'
      },
      {
        path: 'audits',
        loadChildren: 'src/app/component/main/audits/audits.module#AuditsModule'
      },
      {
        path: 'workflows',
        loadChildren: 'src/app/component/main/workflows/workflows.module#WorkflowsModule'
      },
      {
        path: 'lock-year',
        loadChildren: 'src/app/component/main/lock-year/lock-year.module#LockYearModule'
      },
      {
        path: 'notification-news',
        loadChildren: 'src/app/component/main/notification-news/notification-news.module#NotificationNewsModule'
      },
      {
        path: 'breaks',
        loadChildren: 'src/app/component/main/breaks/breaks.module#BreaksModule'
      },
      {
        path: 'penalties',
        loadChildren: 'src/app/component/main/penalties/penalties.module#PenaltiesModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
