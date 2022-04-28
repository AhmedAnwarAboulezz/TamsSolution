
import { AllowancesComponent } from './allowances/allowances.component';
import { PartialPermissionTypesComponent } from './partial-permission-types/partial-permission-types.component';
import { AuthGuard, AuthGuardCheckPage } from '../../../guards/auth-guard.service';
import { CountriesComponent } from './countries/countries.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReligionsComponent } from './Religions/Religions.component';
import { LocationsComponent } from './locations/locations.component';
import { NationalitiesComponent } from './nationalities/nationalities.component';
import { JobDegreesComponent } from './jobDegrees/jobDegrees.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { LeavetypesComponent } from './leavetypes/leavetypes.component';
import { FullDayPermissionsComponent } from './fullDayPermissions/fullDayPermissions.component';
import { HolidayDatesComponent } from './holidayDates/holidayDates.component';
import { JobsComponent } from './jobs/jobs.component';
import { ContractTypesComponent } from './contract-types/contract-types.component';
import { OvertimeDatesComponent } from './overtime-dates/overtime-dates.component';
import { LateRegulationsComponent } from './late-regulations/late-regulations.component';
import { LeaveRegulationsComponent } from './leave-regulations/leave-regulations.component';
import { TestComponent } from './test/test.component';
import { AdmistrativeLevelsComponent } from './admistrative-levels/admistrative-levels.component';
import { DevicesComponent } from './devices/devices.component';
import { AbsencesRegulationsComponent } from './absences-regulations/absences-regulations.component';
import { OrganizationLatesRegulationsComponent } from './organization-lates-regulations/organization-lates-regulations.component';
import { OrganizationOvertimeRegulationsComponent } from './organization-overtime-regulations/organization-overtime-regulations.component';
import { AdminstrativeWitoutmangerDashboardComponent } from './adminstrative-witoutmanger-dashboard/adminstrative-witoutmanger-dashboard.component';
import { LeaveInServiceStartBalancesComponent } from './leave-in-service-start-balances/leave-in-service-start-balances.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full'
  },
  {
    path: 'countries',
    component: CountriesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'religions',
    component: ReligionsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'leavetypes',
    component: LeavetypesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'nationalities',
    component: NationalitiesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'jobDegrees',
    component: JobDegreesComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'holidays',
    component: HolidaysComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'qualifications',
    component: QualificationsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'jobs',
    component: JobsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'fullDayPermissions',
    component: FullDayPermissionsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'locations',
    component: LocationsComponent
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'holidayDates',
    component: HolidayDatesComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'contract-types',
    component: ContractTypesComponent
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'partial-permission-types',
    component: PartialPermissionTypesComponent
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'overtime-dates',
    component: OvertimeDatesComponent
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'late-regulations',
    component: LateRegulationsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'leaves-regulations',
    component: LeaveRegulationsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'allowances',
    component: AllowancesComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'admistrativeLevel',
    component: AdmistrativeLevelsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  }, {
    path: 'test',
    component: TestComponent,
    pathMatch: 'full'
  },
  {
   path: 'devices',
   component: DevicesComponent,
   pathMatch: 'full'
   ,canActivate:[AuthGuardCheckPage]

 },
 {
  path: 'absences-regulations',
  component: AbsencesRegulationsComponent,
  pathMatch: 'full'
  ,canActivate:[AuthGuardCheckPage]

 }
 ,
 {
  path: 'organization-lates-regulations',
  component: OrganizationLatesRegulationsComponent,
  pathMatch: 'full'
  ,canActivate:[AuthGuardCheckPage]

 }
 ,
 {
  path: 'organization-overtime-regulations',
  component: OrganizationOvertimeRegulationsComponent,
  pathMatch: 'full'
  ,canActivate:[AuthGuardCheckPage]

 },
 {
  path: 'adminstrative-witoutmanger-dashboard',
  component: AdminstrativeWitoutmangerDashboardComponent,
  pathMatch: 'full'
  ,canActivate:[AuthGuardCheckPage]

 },
 {
  path: 'leave-inservice-start-balance',
  component: LeaveInServiceStartBalancesComponent,
  pathMatch: 'full'
  ,canActivate:[AuthGuardCheckPage]

 }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupsRoutingModule { }
