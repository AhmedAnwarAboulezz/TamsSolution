import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmergencyAllowancesComponent } from './emergency-allowances/emergency-allowances.component';
import { EmergencyAllowanceComponent } from './emergency-allowances/emergency-allowance/emergency-allowance.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { MaterialModule } from 'src/app/material-module';
import { CoreModule } from 'src/app/core/core.module';
import { EmployeePermissionComponent } from './employee-permissions/employee-permission/employee-permission.component';
import { EmployeePermissionsComponent } from './employee-permissions/employee-permissions.component';
import { EmployeeAlowancesComponent } from './employee-alowances/employee-alowances.component';
import { EmployeeAlowanceComponent } from './employee-alowances/employee-alowance/employee-alowance.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeFulldayPermissionsComponent } from './employee-fullday-permissions/employee-fullday-permissions.component';
import { EmployeeFulldayPermissionComponent } from './employee-fullday-permissions/employee-fullday-permission/employee-fullday-permission.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DutyDetailsComponent } from './employee-permissions/duty-details/duty-details.component';
import { OvertimeOrdersComponent } from './overtime-orders/overtime-orders.component';
import { OvertimeOrderComponent } from './overtime-orders/overtime-order/overtime-order.component';
import { OvertimeEmployeeOrdersComponent } from './overtime-orders/overtime-employee-orders/overtime-employee-orders.component';
import { LogDetailsComponent } from './employee-permissions/log-details/log-details.component';
import { FulldayPermissionDashboardComponent } from './employee-fullday-permissions/fullday-permission-dashboard/fullday-permission-dashboard.component';
import { EmployeeAllowancesDashboardComponent } from './employee-allowances-dashboard/employee-allowances-dashboard.component';
import { EmployeePermissionsDashboardComponent } from './employee-permissions-dashboard/employee-permissions-dashboard.component';
import { ApproveOvertimeComponent } from './approve-overtime/approve-overtime.component';
import { ApproveOvertimeAddComponent } from './approve-overtime/approve-overtime-add/approve-overtime-add.component';
import { ApproveOvertimeEmployeesComponent } from './approve-overtime/approve-overtime-employees/approve-overtime-employees.component';
import { ApproveOvertimeDetailUpdateComponent } from './approve-overtime/approve-overtime-detail-update/approve-overtime-detail-update.component';
import { ApproveOvertimeGridComponent } from './approve-overtime/approve-overtime-grid/approve-overtime-grid.component';
import { ApproveOvertimeDetailsGridComponent } from './approve-overtime/approve-overtime-details-grid/approve-overtime-details-grid.component';
import { EmployeeFulldayExpireDashboardComponent } from './employee-fullday-expire-dashboard/employee-fullday-expire-dashboard.component';

@NgModule({
  declarations: [EmergencyAllowancesComponent, EmergencyAllowanceComponent, EmployeePermissionComponent,
    EmployeePermissionsComponent, EmployeeAlowancesComponent, EmployeeAlowanceComponent,
    EmployeeFulldayPermissionsComponent, EmployeeFulldayPermissionComponent, DutyDetailsComponent, OvertimeOrdersComponent, OvertimeOrderComponent, OvertimeEmployeeOrdersComponent, LogDetailsComponent, FulldayPermissionDashboardComponent, EmployeeAllowancesDashboardComponent, EmployeePermissionsDashboardComponent,EmployeeFulldayExpireDashboardComponent, ApproveOvertimeComponent, ApproveOvertimeAddComponent, ApproveOvertimeEmployeesComponent, ApproveOvertimeDetailUpdateComponent, ApproveOvertimeGridComponent, ApproveOvertimeDetailsGridComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    PermissionsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  entryComponents: [EmergencyAllowanceComponent, EmployeePermissionComponent, EmployeeAlowanceComponent, EmployeeFulldayPermissionComponent,DutyDetailsComponent,OvertimeOrdersComponent,OvertimeOrderComponent,OvertimeEmployeeOrdersComponent,LogDetailsComponent, ApproveOvertimeComponent,ApproveOvertimeAddComponent, ApproveOvertimeEmployeesComponent, ApproveOvertimeDetailsGridComponent, ApproveOvertimeDetailUpdateComponent,ApproveOvertimeGridComponent]
})
export class PermissionsModule { }
