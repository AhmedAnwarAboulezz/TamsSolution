import { Component, OnInit, Inject } from '@angular/core';
import { BaseListComponent } from 'src/app/core/table-details/core/base-list-component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DevicesComponent } from '../devices.component';
import { APIs } from 'src/app/services/APIs';
import { Observable } from 'rxjs';
import { Result } from 'src/app/core/table-details/models/Result';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';

@Component({
  selector: 'app-import-device-excel',
  templateUrl: './import-device-excel.component.html',
  styleUrls: ['./import-device-excel.component.scss']
})
export class ImportDeviceExcelComponent extends BaseListComponent implements OnInit {
  formData: any;
  displayedColumns = { };
  mainLoader(x: LoadOptions): Observable<Result> {
    return this.Service.postFormData(this.APIs.init('Devices/UploadFile').customEndPoint, this.formData);
  }



  constructor(
    public dialog: MatDialog,
    // tslint:disable-next-line:no-shadowed-variable
    public APIs: APIs,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ImportDeviceExcelComponent>,
    @Inject(MAT_DIALOG_DATA) formData: any) {
    super('Devices', '');
    this.formData = formData;

    if(this.localize.lang == 'en'){
      this. displayedColumns = {treminal_IP: 'Treminal IP',descriptionFl:'Description Fl',
      descriptionSl:'Description Sl',serialNumber:'SerialNumber' };
    }else{
      this.displayedColumns = {treminal_IP: 'رقم الجهاز',descriptionFl:'الوصف - لغة اولي',
      descriptionSl:'الوصف - لغة ثانية',serialNumber:'الرقم المسلسل' };
    }
  }
  ngOnInit() {
  }
  onCloseConfirmation() {
    this.dialogRef.close('Save');
  }
  onNoClick(buttonType?: any, resetForm?: any) {
    this.dialogRef.close();
}

}
