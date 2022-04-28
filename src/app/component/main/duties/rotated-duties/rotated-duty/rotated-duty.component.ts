import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RotatedDuty } from './../../../../../models/rotatedDuty';
import { Component, OnInit, Inject, SimpleChanges, Input, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { RotatedDutiesService } from '../services/rotated-duties.service';
import { Shell } from 'src/app/component/shell';
import { stringify } from 'querystring';
import { isNull } from 'util';

@Component({
  selector: 'app-rotated-duty',
  templateUrl: './rotated-duty.component.html',
  styleUrls: ['./rotated-duty.component.scss']
})
export class RotatedDutyComponent  extends BaseEditComponent implements OnInit {
  model: RotatedDuty = {};
  id: string;
  url = 'RotatedDuties/GetAllPaged';
  get Service(): RotatedDutiesService { return Shell.Injector.get(RotatedDutiesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<RotatedDutyComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = this.resetForm(this.model);
    let validationIndexes = ['rotatedDescriptionFl', 'rotatedDescriptionSl','code'];
    validationIndexes.forEach((element, i) => {
       this.form.controls[element].setValidators([this.isExistValidator(this.form.controls[element], i),this.removeSpaces]);
    });
  }

  ngOnInit() {
  }

  onAddSave(event){
    super.close(event, this.resetForm(new RotatedDuty()));
  }

  resetForm(model:RotatedDuty): any{
    let resetForm = this.fb.group({ 
      id: [model.id],
      code: [model.code],
      rotatedDescriptionFl: [model.rotatedDescriptionFl, Validators.required],
      rotatedDescriptionSl: [model.rotatedDescriptionSl],
      startTime: [model.startTime, Validators.required],
      endTime: [model.endTime, Validators.required],
      allowanceIn: [model.allowanceIn !=null ? model.allowanceIn:0, Validators.required],
      allowanceOut: [model.allowanceOut !=null ? model.allowanceOut:0, Validators.required],
      signBefore: [model.signBefore !=null ? model.signBefore:0, Validators.required],
      signAfter: [model.signAfter !=null ? model.signAfter:0, Validators.required],
      isAllowBreak: [model.isAllowBreak != null ? model.isAllowBreak : false],
      isIncludeOverTime: [model.isIncludeOverTime != null ? model.isIncludeOverTime : false],
      from: [model.from],
      to: [model.to],
      isMustSign: [model.isMustSign != null ? model.isMustSign : false],
      note: [model.note]
    });
    return resetForm;
  }
  showOptions(event): void {
    if(!event.checked)
    {
      this.form.patchValue({
        from:null,
        to:null,
        isMustSign:null
      });
    }
  }

  public isExistValidator(control: AbstractControl, type: any) : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
       if(control.value != null && control.value){
         const values = (): RotatedDuty => ({
          rotatedDescriptionFl: type == 0 ? control.value : null,
          rotatedDescriptionSl: type == 1 ? control.value :null,
          code: type == 2 ? control.value :null,
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


