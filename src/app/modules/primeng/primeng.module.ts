import { NgModule } from '@angular/core';
import { PaginatorModule, Paginator } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TreeModule } from 'primeng/tree';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [],
  imports: [
    TableModule,
    DynamicDialogModule,
    ToastModule,
    PaginatorModule,
    DropdownModule,
    TreeModule,
    FullCalendarModule,
    InputTextModule
    // third parties library
    // NgSelectModule
  ],
  exports: [
    TableModule,
    Paginator,
    DynamicDialogModule,
    ToastModule,
    DropdownModule,
    TreeModule,
    FullCalendarModule,
    InputTextModule
    // third parties libraries
    // NgSelectModule
  ]
})
export class PrimengModule { }
