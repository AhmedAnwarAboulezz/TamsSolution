import { CoreModule } from './../../../core/core.module';
import { AuthGuard } from '../../../guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './groups/group/group.component';
import { UsermangmentsComponent } from './usermangments/usermangments.component';
import { UsermangmentComponent } from './usermangments/usermangment/usermangment.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { GroupRolesComponent } from './group-roles/group-roles.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { AdminmangersComponent } from './adminmangers/adminmangers.component';
import { AdminmangerComponent } from './adminmangers/adminmanger/adminmanger.component';
import { EmployeeProfileComponent } from './employees/employee-profile/employee-profile.component';
import { RolesTableComponent } from './group-roles/roles-table/roles-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserinquiriesComponent } from './userinquiries/userinquiries.component';
import { AddUserinquiryComponent } from './userinquiries/add-userinquiry/add-userinquiry.component';
import { EditUserinquiryComponent } from './userinquiries/edit-userinquiry/edit-userinquiry.component';
import { AddAdminmangerComponent } from './adminmangers/add-adminmanger/add-adminmanger.component';
import { UncompleteEmployeeDashboardComponent } from './uncomplete-employee-dashboard/uncomplete-employee-dashboard.component';
import { EmpTempAdminExpireDashboardComponent } from './emp-temp-admin-expire-dashboard/emp-temp-admin-expire-dashboard.component';
import { EmployeeExpiredateDashboardComponent } from './employee-expiredate-dashboard/employee-expiredate-dashboard.component';

@NgModule({
  declarations: [GroupsComponent, GroupComponent,
    ChangepasswordComponent, UsermangmentsComponent, UsermangmentComponent, GroupRolesComponent, EmployeesComponent, EmployeeComponent,
    AdminmangersComponent, AdminmangerComponent, EmployeeProfileComponent, RolesTableComponent, UserinquiriesComponent,
    AddUserinquiryComponent, EditUserinquiryComponent, AddAdminmangerComponent, UncompleteEmployeeDashboardComponent,
    EmpTempAdminExpireDashboardComponent, EmployeeExpiredateDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UserManagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    MatPasswordStrengthModule,
    SharedModule
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    EmployeeProfileComponent,
    GroupComponent,
    UsermangmentComponent,
    EmployeeComponent,
    AdminmangerComponent,
    AddUserinquiryComponent,
    EditUserinquiryComponent,
    AddAdminmangerComponent
  ]
})
export class UserManagementModule {

}
