import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { EmployeeAttendanceReportComponent } from './employee-attendance-report/employee-attendance-report.component';
import { EmployeeLeavesReportComponent } from './employee-leaves-report/employee-leaves-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeePermissionsReportComponent } from './employee-permissions-report/employee-permissions-report.component';
import { EmployeeDutiesReportComponent } from './employee-duties-report/employee-duties-report.component';
import { EmployeeFulldayPermissionsReportComponent } from './employee-fullday-permissions-report/employee-fullday-permissions-report.component';
import { EmployeePermissionsBalanceReportComponent } from './employee-permissions-balance-report/employee-permissions-balance-report.component';
import { EmployeeLeavesBalanceReportComponent } from './employee-leaves-balance-report/employee-leaves-balance-report.component';
import { CalculateEmployeeOverTimeReportComponent } from './calculate-employee-over-time-report/calculate-employee-over-time-report.component';
import { EmployeeDeductionReportComponent } from './employee-deduction-report/employee-deduction-report.component';
import { EmployeeOverTimeOrdersReportComponent } from './employee-overtime-report/employee-overtime-report.component';
import { EmployeeOnServiceReportComponent } from './employee-on-service-report/employee-on-service-report.component';

import { AdminMangerComponent } from './admin-manger-report/admin-manger-report.component';
import { EmployeeAllowancesReportComponent } from './employee-allowances-report/employee-allowances-report.component';
import { UserRolesReportComponent } from './user-roles-report/user-roles-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { CoreModule } from 'src/app/core/core.module';
import { LaddaModule } from 'angular2-ladda';
import { EmployeeWithoutFingerprintReportComponent } from './employee-without-fingerprint-report/employee-without-fingerprint-report.component';
import { ApproveOvertimeReportComponent } from './approve-overtime-report/approve-overtime-report.component';
import { EmployeesEvaluationReportComponent } from './employees-evaluation-report/employees-evaluation-report.component';
import { ActualWorkingReportComponent } from './actual-working-report/actual-working-report.component';
import { UnKnownUserReportComponent } from './un-known-user-report/un-known-user-report.component';
import { EmployeesPenaltiesReportComponent } from './employees-penalties-report/employees-penalties-report.component';

@NgModule({
  declarations: [EmployeeAttendanceReportComponent, EmployeeLeavesReportComponent, EmployeePermissionsReportComponent, EmployeeDutiesReportComponent, EmployeeFulldayPermissionsReportComponent, EmployeePermissionsBalanceReportComponent, EmployeeLeavesBalanceReportComponent, CalculateEmployeeOverTimeReportComponent, EmployeeDeductionReportComponent,EmployeeOverTimeOrdersReportComponent,AdminMangerComponent,EmployeeOnServiceReportComponent, EmployeeAllowancesReportComponent, UserRolesReportComponent, EmployeeWithoutFingerprintReportComponent, ApproveOvertimeReportComponent, EmployeesEvaluationReportComponent, ActualWorkingReportComponent, UnKnownUserReportComponent, EmployeesPenaltiesReportComponent],



  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    FormsModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    LaddaModule,
    LaddaModule.forRoot({
      style: 'contract',
      spinnerSize: 30,
      spinnerColor: 'red',
      spinnerLines: 15
    }),
  ],
  entryComponents: [UserRolesReportComponent]

})
export class ReportsModule { }
