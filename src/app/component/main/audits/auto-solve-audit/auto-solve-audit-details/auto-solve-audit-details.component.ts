import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { AutoLogAuditService } from '../Services/autoLogAudit.service';

@Component({
  selector: 'app-auto-solve-audit-details',
  templateUrl: './auto-solve-audit-details.component.html',
  styleUrls: ['./auto-solve-audit-details.component.scss']
})
export class AutoSolveAuditDetailsComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  logTypes: any;
  reviewList: any[] = [];
  get Service(): AutoLogAuditService { return Shell.Injector.get(AutoLogAuditService); }
  constructor(
    public dialogRef: MatDialogRef<AutoSolveAuditDetailsComponent>,
    public dialog: MatDialog,
    public loaderService: LoaderService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
    }
    console.log( this.model)
    this.getLookups();
    this.getData();
  }
  getLookups() {
    this.Service.getLogtypes().subscribe(data => {
      this.logTypes = data;
    });
  }




  ngOnInit() {
  }

  getData(){
    this.loaderService.show();
    this.Service.getAuditDetails(this.model.id).subscribe(res => {
      this.reviewList = res;
      this.loaderService.hide();
    }, error => {
      this.loaderService.hide();
      this.Alert.showError(this.getErrorMessage(error));
    });
  }

}

