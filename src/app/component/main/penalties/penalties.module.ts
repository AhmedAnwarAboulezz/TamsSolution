import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { PenaltiesRoutingModule } from './penalties-routing.module';
import { PenaltieTypesComponent } from './penaltie-types/penaltie-types.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PenaltieTypeComponent } from './penaltie-types/penaltie-type/penaltie-type.component';
import { EmployeePenaltiesComponent } from './employee-penalties/employee-penalties.component';
import { EmployeePenaltieComponent } from './employee-penalties/employee-penaltie/employee-penaltie.component';
import { PenaltieGroupsComponent } from './penaltie-groups/penaltie-groups.component';
import { PenaltieGroupComponent } from './penaltie-groups/penaltie-group/penaltie-group.component';
import { EvaluationSettingsComponent } from './evaluation-settings/evaluation-settings.component';
import { EmployeeEvaluationSettingsComponent } from './evaluation-settings/employee-evaluation-settings/employee-evaluation-settings.component';
import { PreviousEmployeeEvaluationComponent } from './previous-employee-evaluation/previous-employee-evaluation.component';
import { PreviousEmployeeEvaluationsComponent } from './previous-employee-evaluation/previous-employee-evaluations/previous-employee-evaluations.component';
import { ImportPreviousEmployeeEvaluationeExcelComponent } from './previous-employee-evaluation/import-previous-employee-evaluatione-excel/import-previous-employee-evaluatione-excel.component';
import { CalculateEmployeeEvaluationComponent } from './calculate-employee-evaluation/calculate-employee-evaluation.component';
import { AddEmployeeEvaluationComponent } from './calculate-employee-evaluation/add-employee-evaluation/add-employee-evaluation.component';
import { PreviousEvaluationDetailsComponent } from './calculate-employee-evaluation/previous-evaluation-details/previous-evaluation-details.component';



@NgModule({
  entryComponents: [
   
    PenaltieTypeComponent,
    EmployeePenaltieComponent,
    PenaltieGroupComponent,
    EvaluationSettingsComponent,
    EmployeeEvaluationSettingsComponent,
    PreviousEmployeeEvaluationsComponent,
    ImportPreviousEmployeeEvaluationeExcelComponent,
    AddEmployeeEvaluationComponent,
    PreviousEvaluationDetailsComponent
  ],
  declarations: [
  PenaltieTypesComponent,
  PenaltieTypeComponent,
  EmployeePenaltiesComponent,
  EmployeePenaltieComponent,
  PenaltieGroupsComponent,
  PenaltieGroupComponent,
  EvaluationSettingsComponent,
  EmployeeEvaluationSettingsComponent,
  PreviousEmployeeEvaluationComponent,
  PreviousEmployeeEvaluationsComponent,
  ImportPreviousEmployeeEvaluationeExcelComponent,
  CalculateEmployeeEvaluationComponent,
  AddEmployeeEvaluationComponent,
  PreviousEvaluationDetailsComponent
],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PenaltiesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule, MatInputModule, MatFormFieldModule,
    NgxMaskModule.forRoot()
  ],
  providers: [AuthGuard],
})
export class PenaltiesModule { }