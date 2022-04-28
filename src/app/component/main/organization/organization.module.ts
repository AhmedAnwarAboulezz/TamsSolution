import { CoreModule } from './../../../core/core.module';
import { AuthGuard } from '../../../guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { OrganizationRoutingModule } from './organization-routing.module';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrganizationsComponent } from './organizations/organizations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationLicencesComponent } from './organization-licences/organization-licences.component';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { SettingActualWorkingComponent } from './setting-actual-working/setting-actual-working.component';

@NgModule({
  declarations: [
    OrganizationsComponent,
    OrganizationLicencesComponent,
    GeneralSettingComponent,
    SettingActualWorkingComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OrganizationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: []
})
export class OrganizationModule { }
