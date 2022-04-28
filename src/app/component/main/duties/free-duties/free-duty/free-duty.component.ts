import { Component, OnInit, Inject, OnDestroy, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DutyType } from 'src/app/models/dutyType';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

import { FixedDuty } from 'src/app/models/fixedDuty';
import { DutyTypesEnum } from 'src/app/enums/DutyTypesEnum';
import { Subscription } from 'rxjs';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { FreeDutiesService } from '../services/free-duties.service';
import { FreeDutySettingComponent } from '../free-duty-setting/free-duty-setting.component';

@Component({
  selector: 'app-free-duty',
  templateUrl: './free-duty.component.html',
  styleUrls: ['./free-duty.component.scss']
})

export class FreeDutyComponent  extends BaseEditComponent implements OnInit {
  dutytypes: DutyType[];
  model: FixedDuty = {};
  id: string;
  url = 'FixedDuties/GetAllPagedFree';
  saveBtn: boolean = false;

  get Service(): FreeDutiesService { return Shell.Injector.get(FreeDutiesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<FreeDutyComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = this.resetForm(this.model);
    this.form = this.resetForm(this.model);
    let validationIndexes = ['dutyDescriptionFl', 'dutyDescriptionSl'];
    validationIndexes.forEach((element, i) => {
       this.form.controls[element].setValidators([this.isExistValidator(this.form.controls[element], i),this.removeSpaces]);
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (this.saveBtn == true && this.isNew == true) 
      {
        this.openDetails();
      }
    });
  }

  ngOnInit() {
  }

  onAddSave(event){
    this.saveBtn = event.buttonType === 'SaveClose' ? true : false;
    super.close(event, this.resetForm(new FixedDuty()));
  }

  resetForm(model:FixedDuty): any{
    let resetForm = this.fb.group({ 
      id: [model.id],
      dutyTypeId: DutyTypesEnum.FreeDuty,
      dutyDescriptionFl: [model.dutyDescriptionFl,[ Validators.required]],
      dutyDescriptionSl: [model.dutyDescriptionSl,[ Validators.required]],
      hasHoliday: [model.hasHoliday != null ? model.hasHoliday : false],
      includeOverTime : [model.includeOverTime != null ? model.includeOverTime : false],
    });
    return resetForm;
  }
  
  
  public isExistValidator(control: AbstractControl, type: any) : ValidatorFn{
    
    return (group: FormGroup): ValidationErrors => {
       if(control.value != null && control.value){
         const values = (): FixedDuty => ({
          dutyDescriptionFl: type == 0 ? control.value : null,
          dutyDescriptionSl: type == 1 ? control.value :null,
          dutyTypeId: this.form.value.dutyTypeId,
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


openDetails(){
  let maindata = {
     nameFl: this.form.value.dutyDescriptionFl, 
     nameSl: this.form.value.dutyDescriptionSl, 
     dutyTypeId: this.form.value.dutyTypeId
  };

  this.Service.getDutyByMainData(maindata).subscribe(res => {
    let data = { data: res, isViewDetils: false };
   this.openViewDetail(FreeDutySettingComponent, data, '1300px');
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
  
}

