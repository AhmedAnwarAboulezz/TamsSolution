import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreaksRoutingModule } from './breaks-routing.module';
import { BreakSettingComponent } from './break-setting/break-setting.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { EmployeesbreakComponent } from './employeesbreak/employeesbreak.component';
import { EmployeebreakComponent } from './employeesbreak/employeebreak/employeebreak.component';
import { EmployeebreakreportComponent } from './employeebreakreport/employeebreakreport.component';
import { EmployeeAttendanceWithBreakComponent } from './employee-attendance-with-break/employee-attendance-with-break.component';


@NgModule({
  entryComponents:[EmployeebreakComponent],
  declarations: [BreakSettingComponent, EmployeesbreakComponent, EmployeebreakComponent, EmployeebreakreportComponent, EmployeeAttendanceWithBreakComponent],
  imports: [
    CommonModule,
    BreaksRoutingModule,  
    CoreModule,
    SharedModule,
    CalendarModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class BreaksModule { }
