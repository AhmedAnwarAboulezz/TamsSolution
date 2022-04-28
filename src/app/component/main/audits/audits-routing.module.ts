import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { AuditsGridComponent } from './all-audits/audits-grid/audits-grid.component';
import { AuditsLogComponent } from './all-audits/audits-log/audits-log.component';
import { AutoSolveAuditComponent } from './auto-solve-audit/auto-solve-audit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'audits-log',
    pathMatch: 'full'
  },  
  {
    path: 'audits-log',
    component: AuditsLogComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'audits-grid',
    component: AuditsGridComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'auto-solve-audit',
    component: AutoSolveAuditComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditsRoutingModule { }
