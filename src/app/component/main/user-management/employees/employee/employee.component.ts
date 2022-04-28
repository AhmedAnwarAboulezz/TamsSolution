import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MatDialog } from '@angular/material';
import { Employee } from 'src/app/models/employee';

import { Nationality } from 'src/app/models/Nationality';
import { Religion } from 'src/app/models/Religion';
import { Gender } from 'src/app/models/Gender';
import { MartialStatus } from 'src/app/models/MartialStatus';
import { Qualification } from 'src/app/models/Qualification';
import { ServiceStatus } from 'src/app/models/ServiceStatus';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { EmployeesService } from '../services/employees.service';
import { Shell } from 'src/app/component/shell';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import * as moment from 'moment';
import { Http } from '@angular/http';
import { HomeService } from '../../../home/services/home.service';
import { element } from 'protractor';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { EmployeeProfileComponent } from '../employee-profile/employee-profile.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;
  base64textString = '';
  nationalities: Nationality[];
  religions: Religion[];
  genders: Gender[];
  martialStatus: MartialStatus[];
  quailfications: Qualification[];
  serviceStatus: ServiceStatus[];

  saveBtn: boolean = false;
  form: FormGroup;
  selectedFile = './assets/img/man.png';
  model: Employee = {};
  id: string;
  url = 'Employees/GetAllPaged';
  get Service(): EmployeesService { return Shell.Injector.get(EmployeesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getlookup();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.Service.getEmployeeImage(this.model.id).subscribe(response => {
      if(response != null && response != ""){
        this.selectedFile = response;
      }
    });
    this.form = fb.group({
      id: [this.model.id],
      employeeNumber: [this.model.employeeNumber, Validators.required],
      employeeNameFl: [this.model.employeeNameFl, Validators.required],
      employeeNameSl: [this.model.employeeNameSl],
      civilId: [this.model.civilId, [Validators.required]],
      fileNumber: [this.model.fileNumber],
      nationalId: [this.model.nationalId, Validators.required],
      religionId: [this.model.religionId, Validators.required],
      genderId: [this.model.genderId, Validators.required],
      maritalStatusId: [this.model.maritalStatusId],
      qualificationId: [this.model.qualificationId],
      //serviceStatusId: [this.model.serviceStatusId, Validators.required],
      dateOfHiring: [this.model.dateOfHiring, Validators.required],
      email: this.fb.control(this.model.email,  Validators.email),
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate],
      employeeImage: [this.model.employeeImage]
    });

    let validationIndexes = ['employeeNameFl', 'employeeNameSl', 'civilId','employeeNumber' , 'email'];
    validationIndexes.forEach((element, i) => {
       this.form.controls[element].setValidators([this.isExistValidator(this.form.controls[element], i),this.removeSpaces]);
    });
  //  this.form.get('civilId').setValidators([Validators.min(100000000000) , Validators.max(999999999999)]);

    this.dialogRef.afterClosed().subscribe(result => {
      if (this.saveBtn == true && this.isNew == true) 
      {
        this.openDetails();
      }
    });


  }
  checkCivilIdlength(){
    
    var civilIdLength= this.form.get('civilId').value.toString().length;
   if(civilIdLength> 12){
    this.form.get('civilId').setValidators([Validators.min(100000000000) , Validators.max(999999999999)]);
   }
  }
  ngOnInit() {
  }
  getlookup() {
    this.Service.getLookup().subscribe(data => {
      this.serviceStatus = data[0];
      this.nationalities = data[1];
      this.religions = data[2];
      this.genders = data[3];
      this.martialStatus = data[4];
      this.quailfications = data[5];
    });
  }
 

  onSelectedFilesChanged(inputImage: any) {
    try {
      const file: File = inputImage.files[0];
      if (file.size > 2000000) {
        this.Alert.showError(this.localize.translate.instant('Message.maxFileSize'));
        inputImage.value = null;
      } else {
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          this.base64textString = event.target.result;
          this.selectedFile = (event.target.result ? event.target.result : './assets/img/man.png');
        });
        reader.readAsDataURL(file);
      }

    } catch (error) {
      this.base64textString = null;
      this.selectedFile = './assets/img/man.png';
    }
  }

  validateDate(startDate, endDate, dateOfHiring): boolean {
    let momentSDate = moment.parseZone(startDate);
    let momentEDate = moment.parseZone(endDate);
    let momentHDate = moment.parseZone(dateOfHiring);
    let validateResult = false;
    
    if (momentSDate > momentEDate && endDate != null) {
      this.Alert.showError(this.localize.translate.instant('Message.startDateLessThanEndDate'))
    } else if (momentSDate < momentHDate) {
      this.Alert.showError(this.localize.translate.instant('Message.hireDateBeforeStartDate'))

    } else {
      validateResult = true;
    }
    return validateResult;
  }

  onAddSave(event: any) {
    if (this.selectedFile != './assets/img/man.png') {
      event.form.employeeImage = this.selectedFile;
    }

    let NewForm = event.form;
    let validateResult = this.validateDate(NewForm.startDate, NewForm.endDate, NewForm.dateOfHiring);
    if (validateResult) {
      this.saveBtn = event.buttonType === 'SaveClose' ? true : false;
      this.close(event);
    }
    this.selectedFile = './assets/img/man.png';

  }
 

  openDetails(){
     this.Service.getEmployeeByName(this.form.value.employeeNameFl).subscribe(data => {
      this.openViewDetail(EmployeeProfileComponent, data, '1300px');
    });
  }
  openViewDetail(dialog: any, data: any, width = '1100px') {
    this.openDialog(dialog, data, width);
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





  public isExistValidator(control: AbstractControl, type: any) : ValidatorFn{
    
    return (group: FormGroup): ValidationErrors => {
       if(control.value != null && control.value){
         const values = (): Employee => ({
          employeeNameFl: type == 0 ? control.value : null,
          employeeNameSl: type == 1 ? control.value :null,
          civilId: type == 2 ? control.value :null,
          employeeNumber: type == 3 ? control.value :null,
          email: type == 4 ? control.value :null,
          id: this.form.value.id
         });         
        this.Service.isExist(values()).subscribe(data => {
            if (data) {
                control.setErrors({notEquivalent: true});
            } else {
                control.setErrors(null);
            }
                     
        });       
          
       }
       else{
        control.setErrors({required: true });
       }
       return;
 };
}



}


