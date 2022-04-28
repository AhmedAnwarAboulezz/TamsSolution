import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { EmployeeLogsComponent } from './employee-logs/employee-logs.component';
import { EmployeeAttedancesComponent } from './employee-attedances/employee-attedances.component';
import { EmployeeTodayPresentDashboardComponent } from './employee-today-present-dashboard/employee-today-present-dashboard.component';
import { EmployeeTodayLateinDashboardComponent } from './employee-today-latein-dashboard/employee-today-latein-dashboard.component';
import { EmployeeTodayEarlyoutDashboardComponent } from './employee-today-earlyout-dashboard/employee-today-earlyout-dashboard.component';
import { EmployeeAbsenceLogsComponent } from './employee-absence-logs/employee-absence-logs.component';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { ReviewLogsComponent } from './review-logs/review-logs.component';
import { SyncLogsExceptionsComponent } from './sync-logs-exceptions/sync-logs-exceptions.component';
import { LogsDriveSettingsComponent } from './logs-drive-settings/logs-drive-settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manualLogs',
    pathMatch: 'full'
  },
  {
    path: 'manualLogs',
    component: EmployeeLogsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'sheetLogs',
    component: ImportExcelComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employeeAttendances',
    component: EmployeeAttedancesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'employee-today-present',
    component: EmployeeTodayPresentDashboardComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-today-lateins',
    component: EmployeeTodayLateinDashboardComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-today-earlyouts',
    component: EmployeeTodayEarlyoutDashboardComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-absence-logs',
    component: EmployeeAbsenceLogsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'review-Logs',
    component: ReviewLogsComponent,
    pathMatch: 'full',
  },
  {
    path: 'sync-logs-exceptions',
    component: SyncLogsExceptionsComponent,
    pathMatch: 'full',
  },
  {
    path: 'logs-drive-settings',
    component: LogsDriveSettingsComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
