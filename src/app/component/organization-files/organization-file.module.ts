import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationFileRoutingModule } from './organization-file-routing.module';
import { OrganizationFilesComponent } from './organization-files.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from 'src/app/material-module';
import { CoreModule } from 'src/app/core/core.module';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrganizationFilesComponent    
  ],
  imports: [
    CommonModule,
    OrganizationFileRoutingModule,
    LayoutModule,
    MaterialModule,
    CoreModule,
    MatPasswordStrengthModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents:[

  ],
  providers: [
    DatePipe
  ]
})
export class OrganizationFileModule { }
