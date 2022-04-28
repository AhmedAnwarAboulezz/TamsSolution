import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardCheckPage } from "src/app/guards/auth-guard.service";
import { CalculateEmployeeEvaluationComponent } from "./calculate-employee-evaluation/calculate-employee-evaluation.component";
import { EmployeePenaltiesComponent } from "./employee-penalties/employee-penalties.component";
import { EvaluationSettingsComponent } from "./evaluation-settings/evaluation-settings.component";
import { PenaltieGroupsComponent } from "./penaltie-groups/penaltie-groups.component";
import { PenaltieTypesComponent } from "./penaltie-types/penaltie-types.component";
import { PreviousEmployeeEvaluationComponent } from "./previous-employee-evaluation/previous-employee-evaluation.component";

const routes: Routes = [

    {
      path: '',
      redirectTo: 'penaltie-types',
      pathMatch: 'full'
    },
    {
      path: 'penaltie-types',
      component: PenaltieTypesComponent,
      pathMatch: 'full',
      canActivate:[AuthGuardCheckPage]
    },
    {
      path: 'employees-penalties',
      component: EmployeePenaltiesComponent,
      pathMatch: 'full',
      canActivate:[AuthGuardCheckPage]
    },
    {
      path: 'penaltie-group',
      component: PenaltieGroupsComponent,
      pathMatch: 'full',
      canActivate:[AuthGuardCheckPage]
    },
    {
      path: 'evaluation-setting',
      component: EvaluationSettingsComponent,
      pathMatch: 'full',
      canActivate:[AuthGuardCheckPage]
    },
    {
      path: 'previous-employee-evaluation',
      component: PreviousEmployeeEvaluationComponent,
      pathMatch: 'full',
      canActivate:[AuthGuardCheckPage]
    },
    {
      path:'calculate-employee-evaluation',
      component: CalculateEmployeeEvaluationComponent,
      pathMatch:'full',
      canActivate:[AuthGuardCheckPage]
    }
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PenaltiesRoutingModule { }