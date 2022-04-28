import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { WorkflowTemplateComponent } from './workflow-template/workflow-template.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workflow-template',
    pathMatch: 'full'
  },
  {
    path: 'workflow-template',
    component: WorkflowTemplateComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowsRoutingModule { }
