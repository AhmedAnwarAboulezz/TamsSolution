import { FixeddutiesComponent } from './fixedduties/fixedduties.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { FreeDutiesComponent } from './free-duties/free-duties.component';
import { RotatedDutiesComponent } from './rotated-duties/rotated-duties.component';
import { TeamsComponent } from './teams/teams.component';
import { HourlyDutiesComponent } from './hourly-duties/hourly-duties.component';
import { DailyRotatedSchedulesComponent } from './daily-rotated-schedule/daily-rotated-schedules/daily-rotated-schedules.component';
import { EmployeeDutyComponent } from './employee-duty/employee-duty.component';
import { EmployeeDutyDashboardComponent } from './employee-duty-dashboard/employee-duty-dashboard.component';
import { EmployeeWithOutDutyDashboardComponent } from './employee-with-out-duty-dashboard/employee-with-out-duty-dashboard.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'fixedduties',
    pathMatch: 'full'
  },
  {
    path: 'fixedduties',
    component: FixeddutiesComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'freeduties',
    component: FreeDutiesComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'rotatedduties',
    component: RotatedDutiesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'hourly-rotated-duties',
    component: HourlyDutiesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'daily-rotated-schedule',
    component: DailyRotatedSchedulesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'teams',
    component: TeamsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employeeduty',
    component: EmployeeDutyComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-duty-dashboard',
    component: EmployeeDutyDashboardComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  }
  ,
  {
    path: 'employee-with-out-duty-dashboard',
    component: EmployeeWithOutDutyDashboardComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DutiesRoutingModule { }
