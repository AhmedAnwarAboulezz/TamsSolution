
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviousLeavesBalancesComponent } from './previous-leaves-balances/previous-leaves-balances.component';
import { EmployeeLeavesComponent } from './employee-leaves/employee-leaves.component';
import { EmployeeLeavesDashboardComponent } from './employee-leaves-dashboard/employee-leaves-dashboard.component';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'previous-leaves-balances',
    pathMatch: 'full'
  }
  ,
  {
    path: 'previous-leaves-balances',
    component: PreviousLeavesBalancesComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-leaves',
    component: EmployeeLeavesComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-leaves-dashboard',
    component: EmployeeLeavesDashboardComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule { }