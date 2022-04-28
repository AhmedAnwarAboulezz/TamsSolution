import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';

// import { BaseListComponent } from 'src/app/core/table-details/core/base-list-component';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { from, Observable } from 'rxjs';
import { Result } from 'src/app/core/table-details/models/Result';
import { APIs } from 'src/app/services/APIs';
import { CountriesService } from '../../../lookups/countries/Services/countries.service';
import { Shell } from 'src/app/component/shell';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';

@Component({
  selector: 'app-import-excel-dialog',
  templateUrl: './import-excel-dialog.component.html',
  styleUrls: ['./import-excel-dialog.component.scss']
})
export class ImportExcelDialogComponent extends BaseEditComponent implements OnInit {
  get Service(): CountriesService { return Shell.Injector.get(CountriesService); }

  model: any;
  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ImportExcelDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
  }  
  
  onCloseConfirmation() {
    this.dialogRef.close('Save');
  }

  ngOnInit() {
  }
}
