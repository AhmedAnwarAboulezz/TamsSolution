import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogsRoutingModule } from './logs-routing.module';
import { MaterialModule } from 'src/app/material-module';
import { CoreModule } from 'src/app/core/core.module';
import { ImportExcelDialogComponent } from './import-excel/import-excel-dialog/import-excel-dialog.component';
import { EmployeeLogsComponent } from './employee-logs/employee-logs.component';
import { EmployeeLogComponent } from './employee-logs/employee-log/employee-log.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeAttedancesComponent } from './employee-attedances/employee-attedances.component';
import { EmployeeAttedanceComponent } from './employee-attedances/employee-attedance/employee-attedance.component';
import { AttendanceGridComponent } from './employee-attedances/attendance-grid/attendance-grid.component';
import { EmployeeTodayPresentDashboardComponent } from './employee-today-present-dashboard/employee-today-present-dashboard.component';
import { EmployeeTodayLateinDashboardComponent } from './employee-today-latein-dashboard/employee-today-latein-dashboard.component';
import { EmployeeTodayEarlyoutDashboardComponent } from './employee-today-earlyout-dashboard/employee-today-earlyout-dashboard.component';
import { EmployeeAbsenceLogsComponent } from './employee-absence-logs/employee-absence-logs.component';
import { EmployeeAbsenceGridComponent } from './employee-absence-logs/employee-absence-grid/employee-absence-grid.component';
import { AbsenceLogsComponent } from './employee-absence-logs/absence-logs/absence-logs.component';
import { ReviewLogsComponent } from './review-logs/review-logs.component';
import { ReviewLogComponent } from './review-logs/review-log/review-log.component';
import { AutoSolveLogsComponent } from './employee-absence-logs/auto-solve-logs/auto-solve-logs.component';
import { SyncLogsExceptionsComponent } from './sync-logs-exceptions/sync-logs-exceptions.component';
import { SyncLogsExceptionComponent } from './sync-logs-exceptions/sync-logs-exception/sync-logs-exception.component';
import { LogsDriveSettingsComponent } from './logs-drive-settings/logs-drive-settings.component';
import { LogsDriveSettingComponent } from './logs-drive-settings/logs-drive-setting/logs-drive-setting.component';

@NgModule({
  declarations: [ImportExcelComponent, ImportExcelDialogComponent, EmployeeLogsComponent, EmployeeLogComponent, EmployeeAttedancesComponent, EmployeeAttedanceComponent, AttendanceGridComponent, EmployeeTodayPresentDashboardComponent, EmployeeTodayLateinDashboardComponent, EmployeeTodayEarlyoutDashboardComponent, EmployeeAbsenceLogsComponent, EmployeeAbsenceGridComponent, AbsenceLogsComponent, ReviewLogsComponent, ReviewLogComponent, AutoSolveLogsComponent, SyncLogsExceptionsComponent, SyncLogsExceptionComponent, LogsDriveSettingsComponent, LogsDriveSettingComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LogsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  entryComponents: [ImportExcelDialogComponent, EmployeeLogComponent,EmployeeAttedancesComponent, EmployeeAttedanceComponent, AttendanceGridComponent,EmployeeAbsenceLogsComponent, EmployeeAbsenceGridComponent, AbsenceLogsComponent,ReviewLogComponent, AutoSolveLogsComponent,SyncLogsExceptionComponent,LogsDriveSettingComponent]
})
export class LogsModule { }
