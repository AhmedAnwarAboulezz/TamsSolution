import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DevicesService } from './Services/devices.service';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DeviceComponent } from './device/device.component';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ImportDeviceExcelComponent } from './import-device-excel/import-device-excel.component';
import { Result } from 'src/app/core/table-details/models/Result';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent extends BaseListComponent implements OnInit {
  get Service(): DevicesService {
    return Shell.Injector.get(DevicesService);
  }
  devices: Result;
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }
  url = 'devices/GetAllPaged';

  constructor(public route: ActivatedRoute, public dialog: MatDialog,) {
    super(dialog);
  }

  tableData = {
    name: 'devices.device',
    componentName: 'devicesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'treminal_IP',
      header: 'devices.treminal_IP',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'serialNumber',
      header: 'devices.serialNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },

    {
      field: 'descriptionFl',
      header: 'devices.descriptionFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'descriptionSl',
      header: 'devices.descriptionSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      isView: false
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {
  }
  getExcelFile() {
    if (this.localize.lang == 'ar') {
      window.open('./assets/file/DevicesAr.xlsx', '_blank');
    } else {
      window.open('./assets/file/Devices.xlsx', '_blank');
    }
  }
  addEvent(model: any) {
    super.add(DeviceComponent, model);
  }
  uploadFile(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {

      let fileToUpload = fileInput.target.files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      let file = formData.getAll('file');
      if (file.length > 0) {
        // tslint:disable-next-line:no-string-literal
        if (file[0]['size'] > 1023 && file[0]['size'] < 2100999) {
          this.Service.getuploadeddata(formData).subscribe(event => {
            this.devices = event;
            this.addEventFile(formData);
          }
            , error => {
              this.Alert.showError(this.getErrorMessage(error));
            });
        } else {
          this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmptyOrGreatSize'));
        }
      } else {
        this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmpty'));
        this.Alert.showError(this.localize.translate.instant('Message.uploadfile'));

      }
    }
  }

  addEventFile(model: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.data = model;
    const dialogRef = this.dialog.open(ImportDeviceExcelComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
      if (result && result !== '') {
        this.Service.SaveDevicesList(this.devices.list).subscribe(async () => {
          this.reloadGridComponant();
          this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
        });
      } else {
        this.devices = { count: 0, list: [] };
      }
    });

  }

  reloadGridComponant() 
  {
    
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable(this.url);
  }

}
