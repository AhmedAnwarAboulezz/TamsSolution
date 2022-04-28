import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockYearRoutingModule } from './lock-year-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { CoreModule } from 'src/app/core/core.module';
import { LockLeavesGridComponent } from './lock-leaves-grid/lock-leaves-grid.component';
import { OpenCloseYearComponent } from './open-close-year/open-close-year.component';



@NgModule({
  declarations: [ LockLeavesGridComponent, OpenCloseYearComponent],
  imports: [
    CommonModule,
    LockYearRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule
  ],
  entryComponents:[LockLeavesGridComponent, OpenCloseYearComponent]
})
export class LockYearModule { }
