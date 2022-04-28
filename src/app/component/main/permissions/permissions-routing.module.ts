import { EmployeeFulldayPermissionsComponent } from './employee-fullday-permissions/employee-fullday-permissions.component';
import { EmployeeFulldayPermission } from 'src/app/models/EmployeeFulldayPermission';
import { Routes, RouterModule } from '@angular/router';
import { EmergencyAllowancesComponent } from './emergency-allowances/emergency-allowances.component';
import { NgModule } from '@angular/core';
import { EmployeePermissionsComponent } from './employee-permissions/employee-permissions.component';
import { EmployeeAlowancesComponent } from './employee-alowances/employee-alowances.component';
import { OvertimeOrdersComponent } from './overtime-orders/overtime-orders.component';
import { FulldayPermissionDashboardComponent } from './employee-fullday-permissions/fullday-permission-dashboard/fullday-permission-dashboard.component';
import { EmployeeAllowancesDashboardComponent } from './employee-allowances-dashboard/employee-allowances-dashboard.component';
import { EmployeePermissionsDashboardComponent } from './employee-permissions-dashboard/employee-permissions-dashboard.component';
import { ApproveOvertimeComponent } from './approve-overtime/approve-overtime.component';
import { EmployeeFulldayExpireDashboardComponent } from './employee-fullday-expire-dashboard/employee-fullday-expire-dashboard.component';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'emergency-allowances',
      pathMatch: 'full'
    }
    ,
    {
      path: 'emergency-allowances',
      component: EmergencyAllowancesComponent,
      pathMatch: 'full'
      ,canActivate:[AuthGuardCheckPage]

    },
    {
      path: 'employee-permissions',
      component: EmployeePermissionsComponent,
      pathMatch: 'full'
      ,canActivate:[AuthGuardCheckPage]

    },
    {
      path: 'employee-permissions-dashboard',
      component: EmployeePermissionsDashboardComponent,
      pathMatch: 'full'
      ,canActivate:[AuthGuardCheckPage]

    },
    {
      path: 'employee-allowances',
      component: EmployeeAlowancesComponent,
      pathMatch: 'full'
      ,canActivate:[AuthGuardCheckPage]

    },
    
    {
      path: 'employee-allowances-dashboard',
      component: EmployeeAllowancesDashboardComponent,
      pathMatch: 'full'
      ,canActivate:[AuthGuardCheckPage]

    },
    { 
      path: 'employee-fullday-permissions',
      component: EmployeeFulldayPermissionsComponent,
      pathMatch: 'full'
      ,canActivate:[AuthGuardCheckPage]

    },
    { 
      path: 'employee-fullday-dashboard',
      component: FulldayPermissionDashboardComponent,
      pathMatch: 'full'
      ,canActivate:[AuthGuardCheckPage]

    },
    { 
      path: 'overtime-orders',
      component: OvertimeOrdersComponent,
      pathMatch: 'full'
      ,canActivate:[AuthGuardCheckPage]

    },
    { 
      path: 'approve-overtime',
      component: ApproveOvertimeComponent,
      pathMatch: 'full'
      ,canActivate:[AuthGuardCheckPage]

    },
    {
      path: 'employee-fullday-expire-dashboard',
      component: EmployeeFulldayExpireDashboardComponent,
      pathMatch: 'full'
      ,canActivate:[AuthGuardCheckPage]

    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }