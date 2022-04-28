import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PreviousLeaveBalanceComponent } from './previous-leave-balance/previous-leave-balance.component';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { PreviousLeavesBalancesService } from './services/previous-leaves-balances.service';
import { Shell } from 'src/app/component/shell';
import { DialogService } from 'primeng/api';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { Result } from 'src/app/core/table-details/models/Result';
import { ImportPreviousLeavesBalancesExcelComponent } from './import-previous-leaves-balances-excel/import-previous-leaves-balances-excel.component';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-previous-leaves-balances',
  templateUrl: './previous-leaves-balances.component.html',
  styleUrls: ['./previous-leaves-balances.component.scss']
})
export class PreviousLeavesBalancesComponent extends BaseListComponent implements OnInit {
  previousLeavesBalances: Result;
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }
  url = 'PreviousLeavesBalances/GetAllPaged';

  //@ViewChild(DataTableComponent, null) dataTable: DataTableComponent;
  form: FormGroup;
  years: any[] = [];

  get Service(): PreviousLeavesBalancesService { return Shell.Injector.get(PreviousLeavesBalancesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public fb: FormBuilder, public loaderService: LoaderService ) {
    super(dialog);
    let year = new Date().getFullYear();
      for (let i = year - 2; i <= year; i++) {
        this.years.push(i);
      }
      this.form = fb.group({
        year: [],
        //notes: []
      });
  }

  tableData = {
    name: 'previousLeavesBalances.previousLeavesBalances',
    componentName: 'PreviousLeavesBalancesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'previousLeavesBalances.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.employeeName',
      header: 'previousLeavesBalances.employeeNameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      isfield:true
    },
    {
      field: 'civilId',
      header: 'previousLeavesBalances.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.leaveName',
      dropdownFilterName: 'LeaveId',
      header: 'previousLeavesBalances.leaveNameFl',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true,
      isfield:true

    },
    {
      field: 'previousBalance',
      header: 'previousLeavesBalances.previousBalance',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'year',
      header: 'previousLeavesBalances.year',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
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
    this.leaveRegulation();
  }

  addEvent(model: any) {
    super.add(PreviousLeaveBalanceComponent, model,"1000PX");
  }

  

  leaveRegulation(): void {
    this.Service.getLeaveRegulationGrid().subscribe((data: any) => {
      this.columns[3].filterDropdown = data;
    });
 }





  getExcelFile() {
    if (this.localize.lang == 'ar') {
      window.open('./assets/file/PreviousLeavesBalancesAr.xlsx', '_blank');
    } else {
      window.open('./assets/file/PreviousLeavesBalances.xlsx', '_blank');
    }
  }

  uploadFile(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) 
    {
      let fileToUpload = <File>fileInput.target.files[0];
      const formData = new FormData();
          formData.append('file', fileToUpload, fileToUpload.name);
          let file = formData.getAll('file');
          if (file.length > 0) {
            // tslint:disable-next-line:no-string-literal
            if (file[0]['size'] > 8400 && file[0]['size'] < 2100999) {
              this.addEventFile(fileToUpload);              
            } else {
              this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmptyOrGreatSize'));
            }
    }
    else 
    {
        this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmpty'));
        this.Alert.showError(this.localize.translate.instant('Message.uploadfile'));
    }
  }
  }
  // uploadFile(fileInput: any) {

  //   if (fileInput.target.files && fileInput.target.files[0]) {

  //     let fileToUpload = fileInput.target.files[0];
  //     const formData = new FormData();
  //     formData.append('file', fileToUpload, fileToUpload.name);
  //     formData.append('fileData', newobject);
  //     let file = formData.getAll('file');
  //     if (file.length > 0) {
  //       console.log(file[0]['size'])
  //       // tslint:disable-next-line:no-string-literal
  //       if (file[0]['size'] > 8400 && file[0]['size'] < 2100999) {
  //         this.addEventFile(formData);

  //         // this.Service.getuploadeddata(formData).subscribe(event => {
  //         //   this.previousLeavesBalances = event;
  //         //   this.addEventFile(formData);
  //         // }
  //         //   , error => {
  //         //     this.Alert.showError(this.getErrorMessage(error));
  //         //   });
  //       } else {
  //         this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmptyOrGreatSize'));
  //       }
  //     } else {
  //       this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmpty'));
  //       this.Alert.showError(this.localize.translate.instant('Message.uploadfile'));

  //     }
  //   }
  // }

  addEventFile(model: any) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.data = model;
    const dialogRef = this.dialog.open(ImportPreviousLeavesBalancesExcelComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result && result !== '') {
        this.Service.SavePreviousLeavesBalancesList(result.data).subscribe(async () => {
          --this.TableCore.pageOptions.offset;
          this.TableCore.reRenderTable(this.url);
          //this.dataTable.getTableData();
          this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
        });
      } else {
        this.previousLeavesBalances = { count: 0, list: [] };
      }
    });

  }


  onAddSave()
  {
    this.openConfirmDialog();    
  }

  setData(){
    //this.showtable = false;
    this.loaderService.show();
    this.Service.AutoCalcYearLeaves(this.form.value).subscribe(data => {      
      this.loaderService.hide();
      this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable('PreviousLeavesBalances/GetAllPaged');
    }, error => {
      this.loaderService.hide();
      this.Alert.showError(error.error);
      ;
    }); 
  }
  openConfirmDialog(): void {
    let confirmTitle = "lockYears.confirmLockLeaveTitle";
    let confirmMessage = "lockYears.confirmLockLeaveMessage";
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { message : confirmMessage, title : confirmTitle }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == undefined || result.data == false) 
      {  return;  }
        this.setData();          
    });
  }

  openDeleteConfirmDialog(): void {
    let confirmTitle = "lockYears.confirmLockLeaveTitle";
    let confirmMessage = "lockYears.confirmRemoveBalanceMessage";
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { message : confirmMessage, title : confirmTitle }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == undefined || result.data == false) 
      {  return;  }
        this.removeData();          
    });
  }
  deleteByYear(){
    this.openDeleteConfirmDialog();
  }

  removeData(){
    //this.showtable = false;
    this.loaderService.show();
  
    this.Service.RemoveCalcPerYear(this.form.value).subscribe(data => {      
      this.loaderService.hide();
      this.Alert.showSuccess(this.localize.translate.instant('Message.DeleteSuccess'));
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable('PreviousLeavesBalances/GetAllPaged');
    }, error => {
      this.loaderService.hide();
      this.Alert.showError(error.error);
      ;
    }); 
  }




}