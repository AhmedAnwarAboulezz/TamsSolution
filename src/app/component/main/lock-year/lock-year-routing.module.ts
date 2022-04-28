import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { LockLeavesGridComponent } from './lock-leaves-grid/lock-leaves-grid.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lock-leaves-grid',
    pathMatch: 'full'
  },
  {
    path: 'lock-leaves',
    component: LockLeavesGridComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'lock-leaves-grid',
    component: LockLeavesGridComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockYearRoutingModule { }
