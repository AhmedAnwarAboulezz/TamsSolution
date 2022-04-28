import { Component, OnInit, Inject } from '@angular/core';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { BaseListComponent } from 'src/app/core/table-details/core/base-list-component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { APIs } from 'src/app/services/APIs';
import { Observable, from } from 'rxjs';
import { Result } from 'src/app/core/table-details/models/Result';
import { LeaveRegulation } from 'src/app/models/LeaveRegulation';
import { PreviousLeavesBalancesService } from '../services/previous-leaves-balances.service';

@Component({
  selector: 'app-import-previous-leaves-balances-excel',
  templateUrl: './import-previous-leaves-balances-excel.component.html',
  styleUrls: ['./import-previous-leaves-balances-excel.component.scss']
})
export class ImportPreviousLeavesBalancesExcelComponent extends BaseListComponent implements OnInit {
  years = [];
  leaves: LeaveRegulation[];
  disabledIds: any[] = [];
  dataResult: any;
  fileData: any;
  showLoader = false;
 // leaveId:any;
  //year:any;
  leaveandyear ={ leaveId :'', year:'' }

  

  displayedColumns = {  };
  mainLoader(x: LoadOptions): Observable<any> {
    const newResult = this.resultOfEmployee();
    
    return from(newResult);
  }
  async resultOfEmployee()
  {
    this.showLoader = true;
    
    let newobject = {
      leaveId :this.leaveandyear.leaveId,
      year:this.leaveandyear.year
    }
    const result:any = await this.previousLeavesBalancesService.postFormData('PreviousLeavesBalances/UploadFile',this.fileData, newobject).toPromise();
    
    this.dataResult = result;
    this.disabledIds = this.dataResult.list.filter(element => element.isValid == false).map(element => element.id);
    this.disabledIds.push("00000000-0000-0000-0000-000000000000");
     this.showLoader = false;
     return this.dataResult;
  }

  constructor(
    public dialog: MatDialog,
    // tslint:disable-next-line:no-shadowed-variable
    public APIs: APIs,
    public translate: TranslateService,
    public previousLeavesBalancesService: PreviousLeavesBalancesService,
    public dialogRef: MatDialogRef<ImportPreviousLeavesBalancesExcelComponent>,
    @Inject(MAT_DIALOG_DATA) fileData: any) {
    super('PreviousLeavesBalances', '');
    let year = new Date().getFullYear();
    for (let i = year - 10; i <= year; i++) {
      this.years.push(i);
    }
    this.previousLeavesBalancesService.getLeaveRegulationGrid()
        .subscribe(data => {
          this.leaves = data;

        });
    this.fileData = fileData;

    if (this.localize.lang == 'en') {
      this.displayedColumns = { employeeNumber: 'Employee Number',   employeeNameFl:'Employee Name',
      civilId:'Civil Number',
      previousBalance:'Previous Balance' };
    }else{
      this.displayedColumns = { employeeNumber: 'رقم الموظف',   employeeNameSl:'اسم الموظف',
      civilId:'الرقم المدني',
      previousBalance:'الرصيد السابق' };
    }
  } 
  
  ngOnInit() {
  }
  loadTableData()
  {
    this.dataTable.dataService = (d: any) => this.mainLoader(d);
    this.dataTable.reload.emit();
  }
 
  onCloseConfirmation() {
     this.dataResult.list.forEach(element  => {
      element.leaveId = this.leaveandyear.leaveId;
      element.year = this.leaveandyear.year;

    });
    this.dialogRef.close({data:this.dataResult.list});
  }

   onDataChange() {
    if(this.leaveandyear.leaveId !='' && this.leaveandyear.year !='')
    {
      this.loadTableData();

    }   
  }
  onNoClick(buttonType?: any, resetForm?: any) {
         this.dialogRef.close();
  }


}
