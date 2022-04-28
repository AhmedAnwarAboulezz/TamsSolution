import { Component, OnInit, Input } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { Shell } from 'src/app/component/shell';
import { EmployeeEvaluateService } from './services/employeeEvaluate.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { AddEmployeeEvaluationComponent } from './add-employee-evaluation/add-employee-evaluation.component';
import { PreviousEvaluationDetailsComponent } from './previous-evaluation-details/previous-evaluation-details.component';

@Component({
  selector: 'app-calculate-employee-evaluation',
  templateUrl: './calculate-employee-evaluation.component.html',
  styleUrls: ['./calculate-employee-evaluation.component.scss']
})

export class CalculateEmployeeEvaluationComponent extends BaseListComponent implements OnInit {


  viewModel = [];
  get Service(): EmployeeEvaluateService { return Shell.Injector.get(EmployeeEvaluateService); }
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }
  form: FormGroup;

  constructor(
    public route: ActivatedRoute, 
    public dialog: MatDialog,
    public fb: FormBuilder,
    public loaderService: LoaderService,
    ) {
    super(dialog);

    this.form = fb.group({
      employeeId: [],
      adminstrationId: [],
      isEmployee: [true]
    });
  }

  tableData = {
    name: 'PreviousEmployeeEvaluation.CalculateEmployeeEvaluation',
    componentName: 'CalculateEmployeeEvaluationComponent'
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
    {
      field: 'supervisoryJob',
      header: 'PreviousEmployeeEvaluation.supervisoryJob',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true      
    },
    {
      field: 'externalTemporary',
      header: 'PreviousEmployeeEvaluation.externalTemporary',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true      
    },
    {
      field: 'isEvaluated',
      header: 'PreviousEmployeeEvaluation.isEvaluated',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true      
    },
    // {
    //   field: 'field.adminstration',
    //   header: 'PreviousEmployeeEvaluation.adminstration',
    //   filterMode: 'text',
    //   selector: true,
    //   print: true,
    //   sort: true,
    //   //sortName:'employee.civilId',
    // isfield:true
    // },
    // {
    //   field: 'field.job',
    //   header: 'PreviousEmployeeEvaluation.job',
    //   filterMode: 'text',
    //   selector: true,
    //   print: true,
    //   sort: true,
    //   //sortName:'employee.civilId',
    //  isfield:true
    // },

  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      isView: true
    }
    ,
    {
      isDelete: true
    }
  ];

  searchToggle() {
    if(this.form.value.employeeId == undefined || this.form.value.employeeId == null) this.form.controls['isEmployee'].setValue(false);
    else this.form.controls['isEmployee'].setValue(true);
    // this.form.value.adminstrationId =
    // this.form.value.adminstrationId != null ? this.form.value.adminstrationId.map(element => element.data) : null;
    this.reloadGridComponant();
  }

  reloadGridComponant() {
    this.Service.SetAllSearchResultIntoGrid(this.form.value).subscribe(res => {
      if(res == null){
        --this.TableCore.pageOptions.offset;
        this.TableCore.reRenderTable('EmployeeEvaluations/GetAllCalculateEmployeeEvaluationPaged', this.form.value);
      }
    });
  }

  ngOnInit(): void {
    this.getAllGrades();
   }
   addEvent(model: any) {
     this.loaderService.show();
     this.Service.getEmployeeEvaluations(model.id).subscribe(res => {
       console.log("ANWAAAAR ", res);
       let inputValue = {
         data:res,
         formValue:this.form.value
       }
       this.loaderService.hide();
       super.add(AddEmployeeEvaluationComponent, inputValue,"-webkit-fill-available");
     },error => {
      this.loaderService.hide();
     });
   }
   getAllGrades(): void {
     this.Service.getAllGrades().subscribe((data: any) => {      
       this.columns[4].filterDropdown = data;
 
     });
   }

   viewDetail(model: any) {
     debugger;
    this.loaderService.show();
    this.Service.getAllPreviousEmployeeEvaluation(model.employeeId,model.year).subscribe(res => {
      this.loaderService.hide();
      let test = {list:res, data:model};
      super.openViewDetail(PreviousEvaluationDetailsComponent, test);
    },error => {
     this.loaderService.hide();
    });
  }
  // viewDetail(model: any) {
  //   let newFilter = {
  //     searchValues:this.form.value,
  //     model: model,
  //     isViewDetils:true
  //   }; 
    //super.openViewDetail(EmployeeAttedanceComponent,newFilter);
  
    onEmployeeCancel() {
      this.form.controls['employeeId'].setValue(null);
    }

}
