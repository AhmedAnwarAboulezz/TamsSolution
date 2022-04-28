
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { OrganizationsComponent } from './organizations/organizations.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'organization',
    pathMatch: 'full'
  }
  ,
  {
    path: 'organization',
    component: OrganizationsComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }