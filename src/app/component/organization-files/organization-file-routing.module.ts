import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationFilesComponent } from './organization-files.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'organization-files',
    pathMatch: 'full'
  },
  {
    path: 'organization-files',
    component: OrganizationFilesComponent,
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationFileRoutingModule { }
