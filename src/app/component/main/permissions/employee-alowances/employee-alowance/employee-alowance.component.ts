import { WeekDaysComponent } from './../../../../../core/week-days/week-days.component';
import { Component, OnInit, Inject, ViewChild, Optional } from '@angular/core';
import { EmployeeAlowance, EmployeeAllowanceWeekday } from '../../../../../models/EmployeeAlowance';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { AllowanceTypeEnum } from 'src/app/enums/AllowanceTypeEnum';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { EmployeeAlowancesService } from '../services/employee-alowances.service';
import { Shell } from 'src/app/component/shell';
import moment from 'moment';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-employee-alowance',
  templateUrl: './employee-alowance.component.html',
  styleUrls: ['./employee-alowance.component.scss']
})

export class EmployeeAlowanceComponent extends BaseEditComponent implements OnInit {
  model: EmployeeAlowance = {};
  header = DatePickerHeader;
  allowances: EmployeeAlowance[];
  id: string;
  selectedFile: string;
  startDate = new Date();
  endDate = new Date();
  allowanceId;
  weekDays;
  isAllowanceIn = false;
  isAllowanceOut = false;
  filePath: string;
  serviceName = 'Permissions';

  employeeAllowanceWeekday: EmployeeAllowanceWeekday[];

  @ViewChild('weekdays', { static: false }) weekDaysComponent: WeekDaysComponent;

  url = 'EmployeeAllowances/GetAllPaged';
  get Service(): EmployeeAlowancesService { return Shell.Injector.get(EmployeeAlowancesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeAlowanceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);

    this.getallowance();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
      this.filePath = this.model.fileName != null ? this.model.fileName.split('-')[0] : null;

    }
    this.startDate = this.model.startDate;
    this.endDate = this.model.endDate;
    this.allowanceId = this.model.allowanceId;
    this.selectedFile = this.model.fileName;

    this.form = this.resetForm(this.model);
    this.weekDays = this.model.employeeAllowanceWeekdays;
  }
  setSelectDays(){
    this.startDate =this.form.get('startDate').value
    this.endDate=this.form.get('endDate').value
  }
  setAllowanceTypeId(allowanceTypeId) {

    if (!allowanceTypeId) {
      return;
    }

    this.isAllowanceIn = false;
    this.isAllowanceOut = false;

    let allowanceInValue = this.form.value.allowanceIn;
    let allowanceOutValue = this.form.value.allowanceOut;

    this.form.controls['allowanceIn'].setValue(0);
    this.form.controls['allowanceOut'].setValue(0);




    if (allowanceTypeId == AllowanceTypeEnum.SignInallowance || allowanceTypeId == AllowanceTypeEnum.SignInAndSignOutallowance) {
      this.isAllowanceIn = true;
      this.form.controls['allowanceIn'].setValue(allowanceInValue);
    }

    if (allowanceTypeId == AllowanceTypeEnum.SignOutallowance || allowanceTypeId == AllowanceTypeEnum.SignInAndSignOutallowance) {
      this.isAllowanceOut = true;
      this.form.controls['allowanceOut'].setValue(allowanceOutValue);

    }
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
      if (file.size > 2000000) {
        this.Alert.showError(this.localize.translate.instant('Message.maxFileSize'));
        inputFile.value = null;
      } else {
        this.form.value.filePath =file.name;
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          this.form.value.fileName = event.target.result;
        });
        reader.readAsDataURL(file);
      }
    } catch (error) {
    }
    this.form.value.employeeAllowanceWeekdays = this.employeeAllowanceWeekday;
  }

  getallowance(): void {
    this.Service.getAllowances().subscribe(data => {
      this.allowances = data;
      if (this.allowanceId != null) {
        // tslint:disable-next-line:no-string-literal
        let allowanceTypeId = data.filter(e => e.id == this.allowanceId)[0]['allowanceTypeId'];
        this.setAllowanceTypeId(allowanceTypeId);
      }
    });
  }

  

  onAddSave(event) {
    let weekDays = this.weekDaysComponent.getWeekDays()
      .filter(e => e.isChecked == true)
      .map((day) => ({ weekdayId: day.value, employeeAllowanceId: this.model.id }));
    event.form.employeeAllowanceWeekdays = weekDays;
    if(weekDays.length ==0){
      this.Alert.showError(this.localize.translate.instant('Message.selectDays'));
      return;
    }
    this.close(event, this.resetForm(new EmployeeAlowance()));
    if (event.buttonType === 'Save') {
      this.isNew = true;
      this.isAllowanceIn = false;
      this.isAllowanceOut = false;
      this.weekDaysComponent.resetData();
      this.selectedFile = null;
      this.filePath='';

    }
  }
  ngOnInit() {

  }
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }

  
  resetForm(model: EmployeeAlowance): any {
    let resetForm = this.fb.group({
      id: [model.id],
      allowanceId: [model.allowanceId, Validators.required],
      employeeId: [model.employeeId, Validators.required],
      startDate: [model.startDate, Validators.required],
      endDate: [model.endDate, Validators.required],
      notes: [model.notes],
      fileName: [''],
      filePath:[''],

      employeeAllowanceWeekdays: this.getFormArray(model.employeeAllowanceWeekdays),
      allowanceIn: [model.allowanceIn != null ? model.allowanceIn : 0],
      allowanceOut: [model.allowanceOut != null ? model.allowanceOut : 0]
    });
    return resetForm;
  }

  // setDate(event): void {
  //   console.log('event at select date', event);
  //   const mom = moment.utc(event.value._d).format('YYYY-MM-DDTHH:mm');
  //   const momStr = new Date(mom);
  //   console.log('mom str', momStr);
  //   console.log('mom', mom);
  //   this.addPriceListPeriod(event.value);
  // }
  // addPriceListPeriod(periodDateFrom: Date) {

  //   let UTCDate = Date.UTC(periodDateFrom.getFullYear(),
  //     periodDateFrom.getMonth(), periodDateFrom.getDate()) - periodDateFrom.getTimezoneOffset();

  //   periodDateFrom = new Date(UTCDate);
  //   console.log('period date', periodDateFrom);
  //   this.model.startDate = periodDateFrom;
  // }
 
  setEndDate() {
    let startDate = this.form.value.startDate;
    if (startDate != null) {
      let start = moment.parseZone(startDate);
      this.form.controls['endDate'].setValue(start);
    }
  }


}
