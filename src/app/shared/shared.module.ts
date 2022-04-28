import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DeleteDialogComponent } from './components/data-table/components/Delete-dialog.component';
import { MaterialModule } from '../material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengModule } from '../modules/primeng/primeng.module';
import { TreeComponent } from './components/tree/components/tree/tree.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule } from 'ng2-charts';
import { CoreModule } from '../core/core.module';
import { SaveAndCloseComponent } from './components/save-and-close/save-and-close.component';
import { DialogheaderComponent } from './components/dialogheader/dialogheader.component';
import { DataTableDetailsComponent } from './components/data-table-details/data-table-details.component';
import { SelectComponent } from './components/select/select.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { BarComponent } from './components/charts/bar/bar.component';
import { PieComponent } from './components/charts/pie/pie.component';
import { DoughnutComponent } from './components/charts/doughnut/doughnut.component';
import { DownloadfileComponent } from './components/downloadfile/downloadfile.component';
import { ReportsFilterComponent } from './components/reports-filter/reports-filter.component';
import { LaddaModule } from 'angular2-ladda';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DatePickerHeader } from './components/datepicker-header.component';
import { MatDatepickerSharedComponent } from './components/mat-datepicker-shared/mat-datepicker-shared.component';
import { ShowMoreComponent } from './components/show-more/show-more.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';
import { ChangedDataTableComponent } from './components/changed-data-table/changed-data-table.component';
import { MobileDataTableComponent } from './components/mobile-data-table/mobile-data-table.component';

@NgModule({
  entryComponents: [
    DeleteDialogComponent,
    ConfirmationComponent,
    DatePickerHeader
  ],
  declarations: [
    DataTableComponent,
    DeleteDialogComponent,
    ConfirmationComponent,
    TreeComponent,
    SaveAndCloseComponent,
    DialogheaderComponent,
    DataTableDetailsComponent,
    SelectComponent,
    AdvancedSearchComponent,
    BarComponent,
    PieComponent,
    DoughnutComponent,
    DownloadfileComponent,
    ReportsFilterComponent,
    DatePickerHeader,
    MatDatepickerSharedComponent,
    ShowMoreComponent,
    ConfirmationComponent,
    GoogleMapComponent,
    ChangedDataTableComponent,
    MobileDataTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgSelectModule,
    CoreModule,
    ChartsModule,
    LaddaModule,
    LaddaModule.forRoot({
      style: 'contract',
      spinnerSize: 30,
      spinnerColor: 'red',
      spinnerLines: 15
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCW0xyo1B4925hnujnzr_1De6hktT4OVV0',
      //apiKey: 'AIzaSyBEt_lVkEHvFuWVj01Z4T79yd5uwORwvZA',
      libraries: ['places', 'drawing', 'geometry']
    })
  ],
  exports: [
    DataTableComponent,
    TreeComponent,
    MaterialModule,
    PrimengModule,
    TranslateModule,
    ChartsModule,
    SaveAndCloseComponent,
    DialogheaderComponent,
    SelectComponent,
    AdvancedSearchComponent,
    BarComponent,
    PieComponent,
    DoughnutComponent,
    DownloadfileComponent,
    ReportsFilterComponent,
    DatePickerHeader,
    MatDatepickerSharedComponent,
    ShowMoreComponent,
    ConfirmationComponent,
    GoogleMapComponent,
    ChangedDataTableComponent,
    MobileDataTableComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-GB' },
    {

      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class SharedModule { }
