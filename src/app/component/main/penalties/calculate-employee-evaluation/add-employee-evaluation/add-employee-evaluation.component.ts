import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { Shell } from 'src/app/component/shell';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { EmployeeEvaluateService } from '../services/employeeEvaluate.service';

@Component({
  selector: 'app-add-employee-evaluation',
  templateUrl: './add-employee-evaluation.component.html',
  styleUrls: ['./add-employee-evaluation.component.scss']
})

export class AddEmployeeEvaluationComponent extends BaseEditWithListComponent implements OnInit {
  mainLoader(x: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  header = DatePickerHeader;
  model: any = {};
  id: string;
  url = 'EmployeeEvaluations/GetAllCalculateEmployeeEvaluationPaged';
  get Service(): EmployeeEvaluateService { return Shell.Injector.get(EmployeeEvaluateService); }
  form: FormGroup;
  grades: any[];
  years = [];
  headerTitle:string;
  searchValue:any;
  templateDaysArray: number[] = [];
  locationBeaconsArray: any;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeEvaluationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    super(dialogRef);
    this.getAllGrades();
    if (this.data) {
      this.model = this.data.data;
      this.searchValue = this.data.formValue;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      totalRating: [this.model.totalRating],
      totalGradeId: [this.model.totalGradeId],
      year: [this.model.year],
      supervisoryJob: [this.model.supervisoryJob],
      externalTemporary:[this.model.externalTemporary],
      evaluationFirstRow: [this.model.evaluationFirstRow],
      evaluationFirstRowRepeated: [this.model.evaluationFirstRowRepeated],
      evaluationSecondRow:[this.model.evaluationSecondRow],
      employeeEvaluationNote:[this.model.employeeEvaluationNote],
      employeeAdministrationId:[this.model.employeeAdministrationId],
      evaluationRows:[this.model.evaluationRows],
      isCalculated:true,
      isEvaluated:true,
      totalLate:[this.model.totalLate],
      dutyAttendanceCommitmentId:[this.model.dutyAttendanceCommitmentId],
      totalAbsenceCount:[this.model.totalAbsenceCount],
      employeeJobId:[this.model.employeeJobId],
      penaltieGroupDtos:this.getFormArray(this.model.penaltieGroupDtos)
    });


    // let year = new Date().getFullYear();
    // for (let i = year - 3; i < year; i++) {
    //   this.years.push(i);
    // }
  }

  initGroups2(model) {
    return new FormGroup({
      id: new FormControl(model.id),
      penaltieGroupCode: new FormControl(model.penaltieGroupCode),
      penaltieGroupFl: new FormControl(model.penaltieGroupFl),
      penaltieGroupSl: new FormControl(model.penaltieGroupSl),
      contentCount: new FormControl(model.contentCount),
      isForSupervisoryJob: new FormControl(model.isForSupervisoryJob),
      penaltieGroupDetails: this.getFormArray2(model.penaltieGroupDetails)
    });
  }
  initDetails(model) {
    return new FormGroup({
      penaltieGroupValue: new FormControl(model.penaltieGroupValue,[Validators.required, Validators.max(this.model.maxValue), Validators.min(this.model.minValue)]),
      contentFl: new FormControl(model.contentFl),
      contentSl: new FormControl(model.contentSl),
      penaltieGroupDetailId: new FormControl(model.id),
      penaltieGroupId: new FormControl(model.penaltieGroupId),
      employeeEvaluationId: new FormControl(this.model.id)
    });
  }

  getFormArray2(list): FormArray {
    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    } else {
      for (var i = 0; i < list.length; i++) {
        let test = this.initDetails(list[i]);
        array.push(test);
      }
    }
    return array;
  }
  getFormArray(list): FormArray {
    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    } else {
      for (var i = 0; i < list.length; i++) {
        let test = this.initGroups2(list[i]);
        array.push(test);
      }
    }
    return array;
  }
  

  getSections(form) {
    return form.controls.penaltieGroupDtos.controls;
  }
  getQuestions(form) {
     return form.controls.penaltieGroupDetails.controls;
   }
   getTotal(form):number{
     let values = form.controls.penaltieGroupDetails.value.map(a=> a.penaltieGroupValue);
     var sum = values.reduce((acc, cur) => acc + cur, 0);
    return sum;
   }

   getTitle(penaltieGroupCode:string):string{
    let groupTitle = `PreviousEmployeeEvaluation.${penaltieGroupCode}`;
    return groupTitle;
   }

  ngOnInit() {
    let tran = this.localize.translate.instant('PreviousEmployeeEvaluation.titleCalc');
    this.headerTitle = tran + " " + this.model.year;
  }

  getAllGrades(): void {
    this.Service.getAllGrades()
      .subscribe(data => {
        this.grades = data;
      });
  }
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }

  onAddSave(event){
    this.Service.UpdateEmployeeCalculateEvaluation(event).subscribe(res=>{
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable(this.url, this.searchValue);
      this.dialogRef.close();
      this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
    });
    
  }

}
