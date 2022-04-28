import { CoreModule } from './../../../core/core.module';
import { AuthGuard } from '../../../guards/auth-guard.service';
import { ReligionsComponent } from './Religions/Religions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries/countries.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LookupsRoutingModule } from './lookups-routing.module';
import { ReligionComponent } from './Religions/Religion/Religion.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationComponent } from './locations/location/location.component';
import { NationalitiesComponent } from './nationalities/nationalities.component';
import { NationalityComponent } from './nationalities/nationality/nationality.component';
import { JobDegreesComponent } from './jobDegrees/jobDegrees.component';
import { JobDegreeComponent } from './jobDegrees/jobDegree/jobDegree.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { HolidayComponent } from './holidays/holiday/holiday.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { QualificationComponent } from './qualifications/qualification/qualification.component';
import { LeavetypesComponent } from './leavetypes/leavetypes.component';

import { LeavetypeComponent } from './leavetypes/leavetype/leavetype.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './jobs/job/job.component';
import { FullDayPermissionsComponent } from './fullDayPermissions/fullDayPermissions.component';
import { FullDayPermissionComponent } from './fullDayPermissions/fullDayPermission/fullDayPermission.component';
import { HolidayDatesComponent } from './holidayDates/holidayDates.component';
import { HolidayDateComponent } from './holidayDates/holidayDate/holidayDate.component';
import { ContractTypesComponent } from './contract-types/contract-types.component';
import { ContractTypeComponent } from './contract-types/contract-type/contract-type.component';
import { PartialPermissionTypesComponent } from './partial-permission-types/partial-permission-types.component';
import { PartialPermissionTypeComponent } from './partial-permission-types/partial-permission-type/partial-permission-type.component';
import { OvertimeDatesComponent } from './overtime-dates/overtime-dates.component';
import { OvertimeDateComponent } from './overtime-dates/overtime-date/overtime-date.component';
import { LateRegulationsComponent } from './late-regulations/late-regulations.component';
import { LateRegulationComponent } from './late-regulations/late-regulation/late-regulation.component';
import { LeaveRegulationsComponent } from './leave-regulations/leave-regulations.component';
import { LeaveRegulationComponent } from './leave-regulations/leave-regulation/leave-regulation.component';
import { LeaveRegulationBalanceComponent } from './leave-regulations/leave-regulation-balance/leave-regulation-balance.component';
// tslint:disable-next-line: max-line-length
import { LeaveRegulationCalculationsComponent } from './leave-regulations/leave-regulation-calculations/leave-regulation-calculations.component';
import { AllowancesComponent } from './allowances/allowances.component';
import { AllowanceComponent } from './allowances/allowance/allowance.component';
import { AllowanceSettingComponent } from './allowances/allowance-setting/allowance-setting.component';
import { TestComponent } from './test/test.component';
import { AddTestComponent } from './test/componenets/add/add-test.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountryComponent } from './countries/country/country.component';
import { AdmistrativeLevelsComponent } from './admistrative-levels/admistrative-levels.component';
import { AdmistrativeLevelComponent } from './admistrative-levels/admistrative-level/admistrative-level.component';
import { DeviceComponent } from './devices/device/device.component';
import { DevicesComponent } from './devices/devices.component';
import { AbsencesRegulationsComponent } from './absences-regulations/absences-regulations.component';
import { AbsenceregulationComponent } from './absences-regulations/absencesregulations/absenceregulation/absenceregulation.component';
import { OrganizationLatesRegulationsComponent } from './organization-lates-regulations/organization-lates-regulations.component';
import { OrganizationLateRegulationComponent } from './organization-lates-regulations/organization-late-regulation/organization-late-regulation.component';
import { OrganizationOvertimeRegulationsComponent } from './organization-overtime-regulations/organization-overtime-regulations.component';
import { OrganizationOvertimeRegulationComponent } from './organization-overtime-regulations/organization-overtime-regulation/organization-overtime-regulation.component';
import { ImportDeviceExcelComponent } from './devices/import-device-excel/import-device-excel.component';
import { ShowTreeComponent } from './admistrative-levels/show-tree/show-tree.component';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AdminstrativeWitoutmangerDashboardComponent } from './adminstrative-witoutmanger-dashboard/adminstrative-witoutmanger-dashboard.component';
import { DefineZoneComponent } from './locations/define-zone/define-zone.component';
import { LeaveInServiceStartBalancesComponent } from './leave-in-service-start-balances/leave-in-service-start-balances.component';
import { LeaveInServiceStartBalanceComponent } from './leave-in-service-start-balances/leave-in-service-start-balance/leave-in-service-start-balance.component';

@NgModule({
  entryComponents: [
    CountryComponent,
    AllowanceSettingComponent,
    ReligionComponent,
    LeavetypeComponent,
    NationalityComponent,
    JobDegreeComponent,
    HolidayComponent,
    QualificationComponent,
    JobComponent,
    FullDayPermissionComponent,
    LocationComponent,
    HolidayDateComponent,
    ContractTypeComponent,
    PartialPermissionTypeComponent,
    LateRegulationComponent,
    LeaveRegulationComponent,
    AllowanceComponent,
    OvertimeDateComponent,
    AddTestComponent,
    AdmistrativeLevelComponent,
    DeviceComponent,
    AbsenceregulationComponent,
    OrganizationLateRegulationComponent,
    OrganizationOvertimeRegulationComponent,
    ImportDeviceExcelComponent,
    ShowTreeComponent,
    DefineZoneComponent,
    LeaveInServiceStartBalanceComponent

  ],
  declarations: [
    CountryComponent,
    CountriesComponent,
    ReligionsComponent, ReligionComponent,
    LocationsComponent, LocationComponent,
    NationalitiesComponent, NationalityComponent,
    JobDegreesComponent, JobDegreeComponent,
    HolidaysComponent, HolidayComponent,
    QualificationsComponent, QualificationComponent,
    LeavetypesComponent, LeavetypeComponent,
    JobsComponent, JobComponent,
    FullDayPermissionsComponent, FullDayPermissionComponent,
    HolidayDatesComponent, HolidayDateComponent,
    ContractTypesComponent, ContractTypeComponent,
    PartialPermissionTypesComponent, PartialPermissionTypeComponent,
    OvertimeDatesComponent, OvertimeDateComponent,
    LateRegulationsComponent, LateRegulationComponent,
    LeaveRegulationsComponent, LeaveRegulationComponent,
    LeaveRegulationBalanceComponent, LeaveRegulationCalculationsComponent, AllowancesComponent,
    AllowanceComponent, AllowanceSettingComponent,
    TestComponent, AddTestComponent, AdmistrativeLevelsComponent, AdmistrativeLevelComponent,
    DevicesComponent, DeviceComponent, AbsencesRegulationsComponent, AbsenceregulationComponent,
    OrganizationLatesRegulationsComponent, OrganizationLateRegulationComponent,
    OrganizationOvertimeRegulationsComponent, OrganizationOvertimeRegulationComponent,
    ImportDeviceExcelComponent,
    ShowTreeComponent,
    AdminstrativeWitoutmangerDashboardComponent,
    DefineZoneComponent,
    LeaveInServiceStartBalancesComponent,
    LeaveInServiceStartBalanceComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LookupsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule, MatInputModule, MatFormFieldModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    CountriesComponent, ReactiveFormsModule, MatInputModule
  ],

  providers: [AuthGuard],
})
export class LookupsModule { }
