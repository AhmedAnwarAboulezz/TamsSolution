import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { Shell } from 'src/app/component/shell';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { WorkflowTemplate } from 'src/app/models/workflowTemplate';
import { WorkFlowService } from '../services/workflow.service';
import { AssignStagesComponent } from '../assign-stages/assign-stages.component';
import { AlertService } from 'src/app/services/AlertService';
import { WeekDayDropDown } from 'src/app/models/weekday';

@Component({
  selector: 'app-define-workflow',
  templateUrl: './define-workflow.component.html',
  styleUrls: ['./define-workflow.component.scss']
})


export class DefineWorkflowComponent extends BaseEditComponent implements OnInit {
  keys = Object.keys;
  scheduleArray = [];
  templateDaysArray: number[] = [];
  managerCodes: [] = [];
  model: WorkflowTemplate = {};
  id: string;
  url = 'WorkflowTemplate/GetAllPaged';
  header = DatePickerHeader;
  stagesArray: any;
  saveBtn: boolean = false;
  weekDays: WeekDayDropDown[];

  //isChanged = false;
  get Service(): WorkFlowService { return Shell.Injector.get(WorkFlowService); }

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DefineWorkflowComponent>,
    public alertService: AlertService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getWeekDayList();

    this.managerCodes = this.data.managerCodes;

    if (this.data.workflow) {
      this.model = this.data.workflow;
      this.isNew = false;
      //this.isChanged = true;
    }
    this.form = fb.group({
      id: [this.model.id],
      nameFl: [this.model.nameFl, Validators.required],
      nameSl: [this.model.nameSl],
      isActive: [this.model.isActive!= null? this.model.isActive : true],
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate, Validators.required],
      stageNumber: [this.model.stageNumber, Validators.required],
      restDayId: [this.model.restDayId],
      weekendDayId: [this.model.weekendDayId],

      stages: this.getFormArray(this.model.stages)
    });
    this.stagesArray = this.form.get('stages') as FormArray;
    for (let i = 1; i <= this.model.stageNumber; i++) {
      this.templateDaysArray.push(i);
    }
    this.dialogRef.afterClosed().subscribe(result => {

      if (this.saveBtn == true && this.isNew == true) {
        this.openDetails();
      }
    });
  }

  ngOnInit() {

  }

  onTemplateDaysChange() {

    //this.isChanged = false;
    let value = this.form.value.stageNumber;
    let array = this.form.get('stages') as FormArray;
    if (this.form.value.stages.length == 0) {
      this.templateDaysArray = [];
      for (let i = 1; i <= value; i++) {
        this.templateDaysArray.push(i);
        array.push(this.fb.group({ managerCodeId: '', canReceiveEmail: true, isImportant: i==1 ? true : false, postDurationInHours: 0,isIgnoreWeekend:false,isIgnoreRestDay:false,isIgnoreHoliday:false }));
      }
    }
    else if (this.form.value.stages.length > this.form.value.stageNumber) {
      let dailyLength = this.form.value.stages.length;
      for (let i = dailyLength - 1; i >= value; i--) {
        this.templateDaysArray.splice(i);
        array.removeAt(i);
      }
    }
    else {
      let dailyLength = this.form.value.stages.length;
      for (let i = dailyLength + 1; i <= value; i++) {
        this.templateDaysArray.push(i);
        array.push(this.fb.group({ managerCodeId: '', canReceiveEmail: true, isImportant: i==1 ? true : false, postDurationInHours: 0 ,isIgnoreWeekend:false,isIgnoreRestDay:false,isIgnoreHoliday:false}));
      }
    }
    //this.isChanged = true;
  }

  getFormArray(list): FormArray {
    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    } else {
      for (var i = 0; i < this.model.stageNumber; i++) {
        array.push(this.fb.group(list[i]));
      }
    }
    return array;
  }
  onAddSave(event) {
    if (this.form.value.stages.filter(r => r.isImportant == true).length == 0) {      
      this.alertService.showError(this.localize.translate.instant('workflow.stagesValidationMessage'));
      return;
    }

    let result = { form: this.form.value, buttonType: event };
    this.saveBtn = event === 'SaveClose' ? true : false;
    if (event == 'Save') {
      this.templateDaysArray = [];
      let array = this.form.get('stages') as FormArray;
      array.clear();
    }
    this.close(result);
  }
  getWeekDayList(): void {
    this.Service.getWeekDays().subscribe((data: any) => {
      this.weekDays = data;
    });
  }

  openDetails() {
    this.Service.getWorkFlowByName(this.form.value.nameFl).subscribe((res: any) => {
      this.data.workflow = res;
      this.openViewDetail(AssignStagesComponent, this.data);
    });
  }
  protected openDialog(dialog: any, data: any, width: any, height?: any): void {
    this.dialog.open(dialog, {
      height,
      width,
      data,
      panelClass: 'my-dialog',
      direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr'),
      disableClose: true
    });
  }

  openViewDetail(dialog: any, data: any, width = '1100px') {
    this.openDialog(dialog, data, width);
  }

  checkTest(value:any,i:any){
    if(value){
      this.form.value.stages[i].postDurationInHours = 0;
       this.form.value.stages[i].isignoreWeekend = false;
       this.form.value.stages[i].isignoreRestDay = false;
       this.form.value.stages[i].isignoreHoliday = false;
    }
  }
}
