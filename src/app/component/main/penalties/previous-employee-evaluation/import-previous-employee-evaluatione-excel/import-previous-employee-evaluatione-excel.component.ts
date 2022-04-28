import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { PreviousEmployeeEvaluationService } from '../services/previousemployeeevaluation.services';

@Component({
  selector: 'app-import-previous-employee-evaluatione-excel',
  templateUrl: './import-previous-employee-evaluatione-excel.component.html',
  styleUrls: ['./import-previous-employee-evaluatione-excel.component.scss']
})

export class ImportPreviousEmployeeEvaluationeExcelComponent extends BaseEditComponent implements OnInit {
  get Service(): PreviousEmployeeEvaluationService { return Shell.Injector.get(PreviousEmployeeEvaluationService); }
  years = [];
  year:number=new Date().getFullYear() - 1;
  leaveandyear ={ leaveId :'', year:'' }

  model: any;
  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ImportPreviousEmployeeEvaluationeExcelComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    let year = new Date().getFullYear();
    for (let i = year - 4; i < year; i++) {
      this.years.push(i);
    }
  }  
  
  onCloseConfirmation() {
    this.dialogRef.close({ year: this.year, buttonType: 'Save' });
  }

  ngOnInit() {
  }
}
