import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { BreakSettingComponent } from './break-setting/break-setting.component';
import { EmployeeAttendanceWithBreakComponent } from './employee-attendance-with-break/employee-attendance-with-break.component';
import { EmployeebreakreportComponent } from './employeebreakreport/employeebreakreport.component';
import { EmployeesbreakComponent } from './employeesbreak/employeesbreak.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'break-setting',
  pathMatch: 'full'
},
{
  path: 'break-setting',
  component: BreakSettingComponent,
  pathMatch: 'full'
  ,canActivate:[AuthGuardCheckPage]

},{
  path: 'employees-break',
  component: EmployeesbreakComponent,
  pathMatch: 'full'
  ,canActivate:[AuthGuardCheckPage]

},
{
  path: 'employee-break-report',
  component: EmployeebreakreportComponent,
  pathMatch: 'full'
  ,canActivate:[AuthGuardCheckPage]

},
{
  path: 'employee-attendance-with-break',
  component: EmployeeAttendanceWithBreakComponent,
  pathMatch: 'full'
  ,canActivate:[AuthGuardCheckPage]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreaksRoutingModule { }
