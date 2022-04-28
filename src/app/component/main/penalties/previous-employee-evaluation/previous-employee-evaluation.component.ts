import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/api';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { Result } from 'src/app/core/table-details/models/Result';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';
import { ImportPreviousEmployeeEvaluationeExcelComponent } from './import-previous-employee-evaluatione-excel/import-previous-employee-evaluatione-excel.component';
import { PreviousEmployeeEvaluationsComponent } from './previous-employee-evaluations/previous-employee-evaluations.component';
import { PreviousEmployeeEvaluationService } from './services/previousemployeeevaluation.services';

@Component({
  selector: 'app-previous-employee-evaluation',
  templateUrl: './previous-employee-evaluation.component.html',
  styleUrls: ['./previous-employee-evaluation.component.scss']
})

export class PreviousEmployeeEvaluationComponent extends BaseListComponent implements OnInit {
  employeeLogs: any[];
  years: any[] = [];
  form: FormGroup;

  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }
  url = 'EmployeeEvaluations/GetAllPaged';
  @ViewChild(DataTableComponent, null) dataTable: DataTableComponent;
  get Service(): PreviousEmployeeEvaluationService { return Shell.Injector.get(PreviousEmployeeEvaluationService); }
  get Dialog(): DialogService { return this.dialogService; }
  constructor(public route: ActivatedRoute, public dialogService: DialogService,public fb: FormBuilder, public dialog: MatDialog) {
    super(dialog);
    let year = new Date().getFullYear();
    for (let i = year - 3; i < year; i++) {
      this.years.push(i);
    }
      this.form = fb.group({
        year: [],
        //notes: []
      });
  }

  tableData = {
    name: 'PreviousEmployeeEvaluation.title',
    componentName: 'PreviousEmployeeEvaluationComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'adminmanger.number',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.employeeNumber'
    },
    {
      field: 'field.employeeName',
      header: 'employees.employeeName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.employeeNameFl',
      isfield:true
    },
    {
      field: 'civilId',
      header: 'adminmanger.civilid',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      sortName:'employee.civilId'
    },
    {
      field: 'totalRating',
      header: 'PreviousEmployeeEvaluation.totalRating',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    
    {
      field: 'field.totalGrade',
      dropdownFilterName: 'totalGradeIds',
      header: 'PreviousEmployeeEvaluation.totalGrade',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      sortName:'totalGradeId',
      isfield:true
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
      isDelete: true
    }
  ];
  ngOnInit(): void {
   this.getAllGrades();
  }
  addEvent(model: any) {
    super.add(PreviousEmployeeEvaluationsComponent, model);
  }
  getAllGrades(): void {
    this.Service.getAllGrades().subscribe((data: any) => {      
      this.columns[4].filterDropdown = data;

    });
  }
  addEventexcell(model: any) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.data = this.employeeLogs;
    const dialogRef = this.dialog.open(ImportPreviousEmployeeEvaluationeExcelComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("AFTER Closed Res ==> ", result);
      
      if (result !== undefined && result.buttonType !== undefined && result.buttonType == 'Save') {
        let validEmployeeLogs = this.employeeLogs.filter(a=>a.disabled !== true);
        let addlist =  {importEmployeeEvaluationSheetDto : validEmployeeLogs, year: result.year};
        
        this.Service.SaveEmployeeEvaluationsList(addlist).subscribe(async () => {
          --this.TableCore.pageOptions.offset;
          this.TableCore.reRenderTable(this.url);
          //this.dataTable.getTableData();
          this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
        });
      } else {
        this.employeeLogs = [];
      }
    });

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
            this.addEventexcell(formData);
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
  getExcelFile() {
    if (this.localize.lang == 'ar') {
      window.open('./assets/file/EvaluationAr.xlsx', '_blank');
    } else {
      window.open('./assets/file/EvaluationEn.xlsx', '_blank');
    }
  }

}
