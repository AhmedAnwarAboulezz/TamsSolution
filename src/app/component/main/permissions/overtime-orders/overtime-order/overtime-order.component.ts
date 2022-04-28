import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { OvertimeService } from '../Services/overtime.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { OverTimeOrder, OverTimeOrderWeekday } from 'src/app/models/overTimeOrder';
import { WeekDaysComponent } from 'src/app/core/week-days/week-days.component';
import * as moment from 'moment';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { OvertimeEmployeeOrdersComponent } from '../overtime-employee-orders/overtime-employee-orders.component';

@Component({
  selector: 'app-overtime-order',
  templateUrl: './overtime-order.component.html',
  styleUrls: ['./overtime-order.component.scss']
})

export class OvertimeOrderComponent  extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;
  model: OverTimeOrder = {};
  id: string;
  selectedFile: string;
  startDate = new Date();
  endDate = new Date();
  overTimeOrderWeekdays: OverTimeOrderWeekday[];
  weekDays;
  serviceName = 'Permissions';
  filePath: string;
  saveBtn = false;

  @ViewChild('weekdays' , { static : false}) weekDaysComponent: WeekDaysComponent;

  url = 'OverTimeOrders/GetAllPaged';
  get Service(): OvertimeService { return Shell.Injector.get(OvertimeService); }
  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<OvertimeOrderComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
      this.filePath = this.model.fileName != null ? this.model.fileName.split('-')[0] : null;
    }
    
    this.startDate = this.model.startDate;
    this.endDate = this.model.endDate;
    this.selectedFile = this.model.fileName;
    this.form = this.resetForm(this.model);
    this.weekDays = this.model.overTimeOrderWeekdays;
    this.dialogRef.afterClosed().subscribe(() => {
      if (this.saveBtn == true && this.isNew == true) 
      {
        this.openDetails();
      }
    });
  }

  setSelectDays(){
    this.startDate =this.form.get('startDate').value
    this.endDate=this.form.get('endDate').value
  }
  getFormArray(list): FormArray {
    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    }
    for (let item of list) {
      array.push(this.fb.group(item));
    }
    return array;
  }

  onSelectedFilesChanged(inputFile: any) {
    try {
      const file: File = inputFile.files[0];
      if(file.size > 2000000){
        this.Alert.showError(this.localize.translate.instant('Message.maxFileSize'));
        inputFile.value = null;
      }
      else{
        this.form.value.filePath =file.name;
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {  
          this.form.value.fileName = event.target.result;
        });
        reader.readAsDataURL(file);
      }      
    } catch (error) {
    }
  }

  openDetails(){
    this.Service.getOverTimeByDesicionNumber(this.form.value.decisionNumber).subscribe((res: any) => {
      this.openViewDetail(OvertimeEmployeeOrdersComponent, res);
     });
  }
  

  validateDateAndTime() : boolean
  {
    
    let startTime = this.form.value.startTime;
    let endTime = this.form.value.endTime;
    let startDate = this.form.value.startDate;
    let endDate = this.form.value.endDate;
    let daydifference = moment.parseZone(endDate).diff(moment.parseZone(startDate), 'days');  
    if(moment.parseZone(startDate) > moment.parseZone(endDate)){
      this.Alert.showError(this.localize.translate.instant('Message.startDateLessThanEndDate'))
      return false;
    }
    if(daydifference <= 0)
    {
      if(moment(startTime, 'h:mma') > moment(endTime, 'h:mma')){
        this.Alert.showError(this.localize.translate.instant('Message.starttimeLessThanEndtime'))
        
        return false;
      }   
    }
     
    return true;
  }

  onAddSave(event){
    if(this.validateDateAndTime()){
      let weekDays = this.weekDaysComponent.getWeekDays()
      .filter(e => e.isChecked == true)
      .map((day) => ({ weekdayId: day.value, overTimeOrderId: this.model.id }));
      event.form.overTimeOrderWeekdays = weekDays;
      if(weekDays.length ==0){
        this.Alert.showError(this.localize.translate.instant('Message.selectDays'));
        return;
      }
      this.saveBtn = event.buttonType === 'SaveClose' ? true : false;
      this.close(event, this.resetForm(new OverTimeOrder()));
      if (event.buttonType === 'Save') {
        this.isNew = true;
        this.weekDaysComponent.resetData();
        this.filePath='';
        this.selectedFile='';
      }

    }    
  }

  resetForm(model:OverTimeOrder): any{
    let resetForm = this.fb.group({   
      id: [model.id],
      decisionNumber:[model.decisionNumber, Validators.required],
      employeeId: [model.employeeId, Validators.required],
      startDate: [model.startDate, Validators.required],
      endDate: [model.endDate, Validators.required],
      startTime: [model.startTime, Validators.required],
      endTime: [model.endTime, Validators.required],
      minimumOvertime: [model.minimumOvertime, Validators.required],
      isMustSignOverTime: [model.isMustSignOverTime],
      fileName: [''],
      filePath:[''],

      overTimeOrderWeekdays: this.getFormArray(model.overTimeOrderWeekdays)
    });
    return resetForm;
  }

  ngOnInit() {
  }


  
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }

  protected openDialog(dialog: any, data: any, width: any, height?:any): void {
    this.dialog.open(dialog, {
      height,
      width,
      data,
      panelClass: 'my-dialog',
      direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr'),
      disableClose:true
    });
  }

  openViewDetail(dialog: any, data: any, width = '1100px') {
    this.openDialog(dialog, data, width);
  }

  setEndDate() {
    let startDate = this.form.value.startDate;
    if (startDate != null) {
      let start = moment.parseZone(startDate);
      this.form.controls['endDate'].setValue(start);
    }
  }


}
