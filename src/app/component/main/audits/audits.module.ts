import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditsGridComponent } from './all-audits/audits-grid/audits-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuditsRoutingModule } from './audits-routing.module';
import { AuditsLogComponent } from './all-audits/audits-log/audits-log.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { CoreModule } from 'src/app/core/core.module';
import { AuditsDetailComponent } from './all-audits/audits-detail/audits-detail.component';
import { AuditsRangeDetailComponent } from './all-audits/audits-range-detail/audits-range-detail.component';
import { AutoSolveAuditComponent } from './auto-solve-audit/auto-solve-audit.component';
import { AutoSolveAuditDetailsComponent } from './auto-solve-audit/auto-solve-audit-details/auto-solve-audit-details.component';




@NgModule({
  declarations: [AuditsGridComponent, AuditsLogComponent, AuditsDetailComponent, AuditsRangeDetailComponent, AutoSolveAuditComponent, AutoSolveAuditDetailsComponent],
  imports: [
    CommonModule,
    AuditsRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule
  ],
  entryComponents: [AuditsGridComponent, AuditsLogComponent, AuditsDetailComponent, AuditsRangeDetailComponent, AutoSolveAuditComponent, AutoSolveAuditDetailsComponent]

})
export class AuditsModule { }




