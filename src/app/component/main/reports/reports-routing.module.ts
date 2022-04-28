import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeAttendanceReportComponent } from './employee-attendance-report/employee-attendance-report.component';
import { EmployeeLeavesReportComponent } from './employee-leaves-report/employee-leaves-report.component';
import { EmployeePermissionsReportComponent } from './employee-permissions-report/employee-permissions-report.component';
import { EmployeeDutiesReportComponent } from './employee-duties-report/employee-duties-report.component';
import { EmployeeFulldayPermissionsReportComponent } from './employee-fullday-permissions-report/employee-fullday-permissions-report.component';
import { EmployeePermissionsBalanceReportComponent } from './employee-permissions-balance-report/employee-permissions-balance-report.component';
import { EmployeeLeavesBalanceReportComponent } from './employee-leaves-balance-report/employee-leaves-balance-report.component';
import { CalculateEmployeeOverTimeReportComponent } from './calculate-employee-over-time-report/calculate-employee-over-time-report.component';
import { EmployeeDeductionReportComponent } from './employee-deduction-report/employee-deduction-report.component';
import { EmployeeOverTimeOrdersReportComponent } from './employee-overtime-report/employee-overtime-report.component';

import { AdminMangerComponent } from './admin-manger-report/admin-manger-report.component';

import { EmployeeOnServiceReportComponent } from './employee-on-service-report/employee-on-service-report.component';
import { EmployeeAllowancesReportComponent } from './employee-allowances-report/employee-allowances-report.component';
import { UserRolesReportComponent } from './user-roles-report/user-roles-report.component';
import { EmployeeWithoutFingerprintReportComponent } from './employee-without-fingerprint-report/employee-without-fingerprint-report.component';
import { ApproveOvertimeReportComponent } from './approve-overtime-report/approve-overtime-report.component';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { EmployeesEvaluationReportComponent } from './employees-evaluation-report/employees-evaluation-report.component';
import { ActualWorkingReportComponent } from './actual-working-report/actual-working-report.component';
import { UnKnownUserReportComponent } from './un-known-user-report/un-known-user-report.component';
import { EmployeesPenaltiesReportComponent } from './employees-penalties-report/employees-penalties-report.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee-attendance-report',
    pathMatch: 'full'
  },
  {
    path: 'employee-attendance-report',
    component: EmployeeAttendanceReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-leaves-report',
    component: EmployeeLeavesReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-permissions-report',
    component: EmployeePermissionsReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-duties-report',
    component: EmployeeDutiesReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-fullday-permissions-report',
    component: EmployeeFulldayPermissionsReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-Permissions-Balance-report',
    component: EmployeePermissionsBalanceReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-Leaves-Balance-report',
    component: EmployeeLeavesBalanceReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'calculate-employee-OverTime-report',
    component: CalculateEmployeeOverTimeReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-Deduction-report',
    component: EmployeeDeductionReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-OverTime-Orders-report',
    component: EmployeeOverTimeOrdersReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {

    path: 'admin-manger',
    component: AdminMangerComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-onservice-report',
    component: EmployeeOnServiceReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-allowances-report',
    component: EmployeeAllowancesReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'user-roles-report',
    component: UserRolesReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-without-fingerprin-report',
    component: EmployeeWithoutFingerprintReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'approve-overtime-report',
    component: ApproveOvertimeReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employees-evaluation-report',
    component: EmployeesEvaluationReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'actual-working-report',
    component: ActualWorkingReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'un-knownuser-report',
    component: UnKnownUserReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employees-penalties-report',
    component: EmployeesPenaltiesReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
