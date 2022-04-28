import { CoreModule } from './../../../core/core.module';
import { AuthGuard } from '../../../guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { LeavesRoutingModule } from './leaves-routing.module';
import { PreviousLeavesBalancesComponent } from './previous-leaves-balances/previous-leaves-balances.component';
import { PreviousLeaveBalanceComponent } from './previous-leaves-balances/previous-leave-balance/previous-leave-balance.component';
import { EmployeeLeavesComponent } from './employee-leaves/employee-leaves.component';
import { EmployeeLeaveComponent } from './employee-leaves/employee-leave/employee-leave.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeLeavesDashboardComponent } from './employee-leaves-dashboard/employee-leaves-dashboard.component';
import { ImportPreviousLeavesBalancesExcelComponent } from './previous-leaves-balances/import-previous-leaves-balances-excel/import-previous-leaves-balances-excel.component';

@NgModule({
  declarations: [PreviousLeavesBalancesComponent, PreviousLeaveBalanceComponent, EmployeeLeavesComponent, EmployeeLeaveComponent, EmployeeLeavesDashboardComponent,ImportPreviousLeavesBalancesExcelComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LeavesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [AuthGuard],
  entryComponents: [EmployeeLeaveComponent,PreviousLeaveBalanceComponent,ImportPreviousLeavesBalancesExcelComponent]

})
export class LeavesModule { }
