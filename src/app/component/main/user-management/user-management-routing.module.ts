import { GroupsComponent } from './groups/groups.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsermangmentsComponent } from './usermangments/usermangments.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { GroupRolesComponent } from './group-roles/group-roles.component';
import { EmployeesComponent } from './employees/employees.component';
import { AdminmangersComponent } from './adminmangers/adminmangers.component';
import { UserinquiriesComponent } from './userinquiries/userinquiries.component';
import { UncompleteEmployeeDashboardComponent } from './uncomplete-employee-dashboard/uncomplete-employee-dashboard.component';
import { EmpTempAdminExpireDashboardComponent } from './emp-temp-admin-expire-dashboard/emp-temp-admin-expire-dashboard.component';
import { EmployeeExpiredateDashboardComponent } from './employee-expiredate-dashboard/employee-expiredate-dashboard.component';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'groups',
    pathMatch: 'full'
  }
  ,
  {
    path: 'groups',
    component: GroupsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },

  {
    path: 'usermangments',
    component: UsermangmentsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'UserInquiries',
    component: UserinquiriesComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'group-roles',
    component: GroupRolesComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employees',
    component: EmployeesComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'adminmangers',
    component: AdminmangersComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'uncomplete-employee-dashboard',
    component: UncompleteEmployeeDashboardComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'emp-temp-admin-expire-dashboard',
    component: EmpTempAdminExpireDashboardComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'employee-expire-date-dashboard',
    component: EmployeeExpiredateDashboardComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
