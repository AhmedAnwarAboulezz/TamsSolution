import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ImportExcelDialogComponent } from './import-excel-dialog/import-excel-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { DialogService } from 'primeng/api';
import { Shell } from 'src/app/component/shell';
import { ImportExcelService } from './services/import-excel.service';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { Result } from 'src/app/core/table-details/models/Result';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})

export class ImportExcelComponent extends BaseListComponent implements OnInit {
  @ViewChild(DataTableComponent, null) dataTable: DataTableComponent;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Service(): ImportExcelService { return Shell.Injector.get(ImportExcelService); }
  get Dialog(): DialogService { return this.dialogService; }
  employeeLogs: any[];
  constructor(public route: ActivatedRoute, public dialogService: DialogService, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'EmployeeLogSheet.employeeLogSheet',
    componentName: 'ImportExcelComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'EmployeeLogSheet.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'logDateTime',
      printField: 'logDateTimeStr',
      header: 'EmployeeLogSheet.logDatetime',
      filterMode: 'datetime',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'eventType',
      header: 'EmployeeLogSheet.event',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      translate:true
    },
    {
      field: 'terminalName',
      header: 'EmployeeLogSheet.terminalName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'serialNumber',
      header: 'EmployeeLogSheet.serialNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
  
  ];
  ngOnInit(): void {

  }

  addEvent(model: any) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.data = this.employeeLogs;
    const dialogRef = this.dialog.open(ImportExcelDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
      if (result && result !== '') {
        let validEmployeeLogs = this.employeeLogs.filter(a=>a.disabled !== true);
        this.Service.SaveEmployeeLogList(validEmployeeLogs).subscribe(async () => {
          this.dataTable.getTableData();
          this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
        });
      } else {
        this.employeeLogs = [];
      }
    });

  }

  getExcelFile() {
    if (this.localize.lang == 'ar') {
      window.open('./assets/file/EmployeeLogAr.xlsx', '_blank');
    } else {
      window.open('./assets/file/EmployeeLog.xlsx', '_blank');
    }
  }

  uploadFile(fileInput: any) {
    
    if (fileInput.target.files && fileInput.target.files[0]) {

      let fileToUpload = fileInput.target.files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      let file = formData.getAll('file');
      if (file.length > 0) {
        if (file[0]['size'] > 8823 && file[0]['size'] < 2100999) {

          this.Service.getuploadeddata(formData).subscribe(event => {
            if(event.disabledRowCount !== 0){
              this.Alert.showError(event.errorMessage);
              //return;
            }
            this.employeeLogs = event.list;
            this.addEvent(formData);
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
}