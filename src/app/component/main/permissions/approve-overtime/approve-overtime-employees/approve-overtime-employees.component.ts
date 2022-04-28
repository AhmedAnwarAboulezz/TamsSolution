import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { OverTimeType } from 'src/app/enums/OverTimeType';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { ApproveOverTime, ApproveOverTimeDetails } from 'src/app/models/approveOvertime';
import { ApproveOvertimeDetailsService } from '../Services/approveOvertimeDetail.service';

@Component({
  selector: 'app-approve-overtime-employees',
  templateUrl: './approve-overtime-employees.component.html',
  styleUrls: ['./approve-overtime-employees.component.scss']
})


export class ApproveOvertimeEmployeesComponent extends BaseEditComponent implements OnInit {
  keys = Object.keys;
  templateDaysArray: number[] = [];
  showLoader = false;
  pageIds: any[] = [];
  model: ApproveOverTime;
  advanceSearch: advancedSearch;
  employeedata: any;
  id: string;
  checkedList: any[] = [];
  //detailsTable = false;
  componentName = 'ApproveOverTimes';
  url = 'ApproveOverTimes/GetAllPaged';
  //checkedAll: boolean;
  checkedAllDisable = false;
  checkedAllChecked = false;
  stagesArray:any;
  formFilter:any;

  overtimeTypes: any[];

  

  employeeData: any;
  get Service(): ApproveOvertimeDetailsService { return Shell.Injector.get(ApproveOvertimeDetailsService); }


  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ApproveOvertimeEmployeesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getOverTimeTypes();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.advanceSearch = new advancedSearch();
    this.form = fb.group({
      id: [this.model.id],
      stages: this.getFormArray([])
    });
     this.stagesArray = this.form.get('stages') as FormArray;

     this.formFilter = fb.group({
      minOvertime: [],
      overtimeType: []
    });
    //  this.stagesArray.forEach(element => {
    //    let test = this.form.get('actualNightTime');
    //    console.log("actualNightTime = ", test);
       
    //  });
     //this.form.get('stages').setValidators([Validators.min(1) , Validators.max(12)]);

  }

  loadTableData(): any
  {
    this.showLoader = true;
    let filter = {
      approveOvertimeId: this.model.id,
      month: this.model.month,
      year: this.model.year,
      minOvertime: this.formFilter.value.minOvertime,
      overtimeType: this.formFilter.value.overtimeType,
      advancedSearchDto:this.advanceSearch
    }
    this.Service.Fill(filter).subscribe(responce => {
      this.employeeData = responce;
      let arrayValue = this.getFormArray(responce);
      this.form.controls['stages'] = arrayValue;
      for (let i = 1; i <= responce.length; i++) {
        this.templateDaysArray.push(i);
      }

      if (responce.length == 0) {
        this.checkedAllDisable = true;
      }
      if (responce.length > 0) {
        this.checkedAllDisable = false;
      }
      this.pageIds = responce.map(element => element.employeeId);
      this.showLoader = false;
      //To be enhancement
      // let allStagesArray = this.form.get('stages') as FormArray;
      // allStagesArray.controls.forEach((element : FormGroup) => {
      //   let night = element.get('nightTime').value;
      //   element.controls['actualNightTime'].setValidators([Validators.min(0) , Validators.max(night)]);
      //   console.log("nightTimeVal = ", night);
      //   console.log("element = ", element);
      // });
       return responce;
    });

  }


  getFormArray(list): FormArray {
    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    } else {
      for (var i = 0; i < list.length; i++) {
        array.push(this.fb.group(list[i]));
      }
    }
    return array;

  }

  ngOnInit() {
    this.showLoader = true;
    this.add();

  }

  add() {
    this.checkedList = [];
    this.advanceSearch.typeProcess = 'Add';
    this.loadTableData();
  }

  fillSearchResult() {
    this.checkedList = [];
    this.templateDaysArray = [];
    this.stagesArray = this.form.get('stages') as FormArray;
    this.clearFormArray(this.stagesArray);
    console.log("array is", this.stagesArray);
    console.log("array2 is", this.form.controls['stages']);
    this.loadTableData();
  }


  onCheckboxChange(element, event) {
    if (event) {
      this.checkedList.push(element);
      if (this.checkedList.length == this.pageIds.length) {
        this.checkedAllChecked = true;
      }
    } else {
      this.checkedAllChecked = false;
      for (let i = 0; i < this.checkedList.length; i++) {
        if (this.checkedList[i] != null) {
          if (this.checkedList[i] == element) {
            this.checkedList.splice(i, 1);
          }
        }
      }
    }
  }

  checkAll(event) {
    if(this.employeeData != null && this.employeeData.length != 0)
    {
      if(event){
        this.pageIds.forEach(item => {
          this.checkedList.push(item);
        });
      }
      else{
        this.checkedList = [];
      }
      // let array: FormArray = new FormArray([]);
      //   for (var i = 0; i < this.employeeData.length; i++)
      //   {
      //     if(event)
      //     {
      //       this.employeeData[i].isChecked = true;
      //     }
      //     else{
      //       this.employeeData[i].isChecked = false;
      //     }
      //     array.push(this.fb.group(this.employeeData[i]));
      //   }
      //   this.form.controls['stages'] = array;
    }
  }

  onAddSave(event) {
    console.log("FormArray2 = ", this.form);
    let array = this.form.get('stages') as FormArray;
    let resultList = array.value.filter(a=> this.checkedList.includes(a.employeeId));
    // let resultList = array.value.filter(a=>a.isChecked == true);
    console.log("FormArray3 = ", resultList);
    if(this.ValidatorsFunction(resultList))
    {
      this.Service.postReq('AddList', resultList).subscribe((result: any) => {
        this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
        this.dialogRef.close();
      }, error => {
        this.Alert.showError(this.getErrorMessage(error));
      });
    }

  }


  ValidatorsFunction(resultList: any) : boolean{
    let result = true;
    if(resultList.length == 0){
      this.Alert.showError(this.localize.translate.instant('approveOvertimeMessages.chooseEmployee'));
      return false;
    }
    resultList.forEach(element => {
      
      if(element.actualMorningTime > element.morningTime){
        this.Alert.showError(this.localize.translate.instant('approveOvertimeMessages.actualMorningTime'));
        result = false;
      }
      if(element.actualNightTime > element.nightTime){
        this.Alert.showError(this.localize.translate.instant('approveOvertimeMessages.actualNightTime'));
        result = false;
      }
      if(element.actualHolidayTime > element.holidayTime){
        this.Alert.showError(this.localize.translate.instant('approveOvertimeMessages.actualHolidayTime'));
        result = false;
      }
      if(element.actualWeekEndTime > element.weekEndTime){
        this.Alert.showError(this.localize.translate.instant('approveOvertimeMessages.actualWeekEndTime'));
        result = false;
      }
    });
    return result;
  }

  // Validateinput(index,newVal, oldVal){
  //   let tt = this.form.controls['stages'].value[index][newVal];
  //   let tt2 = this.form.controls['stages'].value[index][oldVal];

  //   if(tt > tt2){
  //     //this.form.controls['stages'].value[index][newVal].setValue(tt2);
  //   }
  //   else{
  //   }
  // }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  getOverTimeTypes(): void {
    this.Service.getOverTimeTypes().subscribe((data: any) => {
      this.overtimeTypes = data;
    });
  }

}

