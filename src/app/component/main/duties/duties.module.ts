import { DutiesRoutingModule } from './duties-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixeddutiesComponent } from './fixedduties/fixedduties.component';
import { FixeddutyComponent } from './fixedduties/fixedduty/fixedduty.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { CoreModule } from 'src/app/core/core.module';
import { DutySettingsComponent } from './fixedduties/duty-settings/duty-settings.component';
import { FreeDutyComponent } from './free-duties/free-duty/free-duty.component';
import { FreeDutySettingComponent } from './free-duties/free-duty-setting/free-duty-setting.component';
import { RotatedDutiesComponent } from './rotated-duties/rotated-duties.component';
import { RotatedDutyComponent } from './rotated-duties/rotated-duty/rotated-duty.component';
import { HourlyDutiesComponent } from './hourly-duties/hourly-duties.component';
import { DailyRotatedScheduleComponent } from './daily-rotated-schedule/daily-rotated-schedule/daily-rotated-schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HourlyDutyComponent } from './hourly-duties/hourly-duty/hourly-duty.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { FreeDutiesComponent } from './free-duties/free-duties.component';
import { CalendarModule } from 'primeng/calendar';
import { DailyRotatedSchedulesComponent } from './daily-rotated-schedule/daily-rotated-schedules/daily-rotated-schedules.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team/team.component';
import { TeamDetailsComponent } from './teams/team-details/team-details.component';
import { EmployeeDutyComponent } from './employee-duty/employee-duty.component';
import { AddEmployeeDutyComponent } from './employee-duty/add-employee-duty/add-employee-duty.component';
import { EditEmployeeDutyComponent } from './employee-duty/edit-employee-duty/edit-employee-duty.component';
import { EmployeeDutyDashboardComponent } from './employee-duty-dashboard/employee-duty-dashboard.component';
import { EmployeeWithOutDutyDashboardComponent } from './employee-with-out-duty-dashboard/employee-with-out-duty-dashboard.component';
import { EmployeeDutyWitoutPeriodComponent } from './employee-duty-dashboard/employee-duty-witout-period/employee-duty-witout-period.component';
import { EmployeeDutyWithPeriodComponent } from './employee-duty-dashboard/employee-duty-with-period/employee-duty-with-period.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    FixeddutiesComponent,
    FixeddutyComponent,
    DutySettingsComponent,
    FreeDutiesComponent,
    FreeDutyComponent,
    DailyRotatedScheduleComponent,
    FreeDutySettingComponent,
    RotatedDutiesComponent,
    RotatedDutyComponent,
    HourlyDutiesComponent,
    HourlyDutyComponent,
    DailyRotatedSchedulesComponent,
    TeamsComponent,
    TeamComponent,
    TeamDetailsComponent,
    EmployeeDutyComponent,
    AddEmployeeDutyComponent,
    EditEmployeeDutyComponent,
    EmployeeDutyDashboardComponent,
    EmployeeWithOutDutyDashboardComponent,
    EmployeeDutyWitoutPeriodComponent,
    EmployeeDutyWithPeriodComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DutiesRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    CalendarModule,
    FullCalendarModule,
    NgxMaskModule.forRoot()

  ],
  exports: [DutySettingsComponent],
  entryComponents: [
    DutySettingsComponent,
    FreeDutySettingComponent,
    RotatedDutyComponent,
    FixeddutyComponent,
    FreeDutyComponent,
    HourlyDutyComponent,
    TeamsComponent,
    TeamComponent,
    TeamDetailsComponent,
    DailyRotatedScheduleComponent,
    AddEmployeeDutyComponent,
    EditEmployeeDutyComponent,
    EmployeeDutyDashboardComponent,EmployeeWithOutDutyDashboardComponent
  ]
})
export class DutiesModule { }
