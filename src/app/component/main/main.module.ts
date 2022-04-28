import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MaterialModule } from '../../material-module';
import { HomeComponent } from './home/home.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

// multi language
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';
// PasswordStrength
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import { DatePipe } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShiftsComponent } from '../shifts-component/shifts.component';
import { ShiftModalComponent } from '../shifts-component/components/shif-modal/shift-modal.component';
import { AssignEmployeeComponent } from '../shifts-component/components/assign-employee/assign-employee.component';
import { CopyOptionsComponent } from '../shifts-component/components/copy-options/copy-options.component';
import { DeleteOptionsComponent } from '../shifts-component/components/delete-options/delete-options.component';
import { ResetModalComponent } from '../shifts-component/components/reset-modal/reset-modal.component';
import { MoveToNextModelComponent } from '../shifts-component/components/move-to-next-model/move-to-next-model.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    DeleteConfirmationComponent,
    SignupComponent,
    ShiftsComponent,
    ShiftModalComponent,
    AssignEmployeeComponent,
    CopyOptionsComponent,
    DeleteOptionsComponent,
    ResetModalComponent,
    MoveToNextModelComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutModule,
    MaterialModule,
    CoreModule,
    MatPasswordStrengthModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    DeleteConfirmationComponent,
    ShiftModalComponent,
    AssignEmployeeComponent,
    CopyOptionsComponent,
    DeleteOptionsComponent,
    ResetModalComponent,
    MoveToNextModelComponent
  ],
  exports: [
    DeleteConfirmationComponent
  ],
  providers: [
    DatePipe
  ],
})
export class MainModule { }
