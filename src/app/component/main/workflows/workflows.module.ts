import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowTemplateComponent } from './workflow-template/workflow-template.component';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkflowsRoutingModule } from './workflows-routing.module';
import { DefineWorkflowComponent } from './define-workflow/define-workflow.component';
import { AssignStagesComponent } from './assign-stages/assign-stages.component';



@NgModule({
  declarations: [WorkflowTemplateComponent, DefineWorkflowComponent, AssignStagesComponent],
  imports: [
    CommonModule,
    WorkflowsRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule
  ],
  entryComponents: [WorkflowTemplateComponent, DefineWorkflowComponent, AssignStagesComponent]

})
export class WorkflowsModule { }
