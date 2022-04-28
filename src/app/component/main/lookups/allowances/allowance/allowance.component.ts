import { AllowanceType } from './../../../../../models/allowanceType';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Allowance } from './../../../../../models/allowance';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { AllowancesService } from '../Services/allowances.services';
import { Shell } from 'src/app/component/shell';
import { AllowanceSettingComponent } from '../allowance-setting/allowance-setting.component';

@Component({
  selector: 'app-allowance',
  templateUrl: './allowance.component.html',
  styleUrls: ['./allowance.component.scss']
})
export class AllowanceComponent extends BaseEditComponent implements OnInit {
  model: Allowance = {};
  allowanceTypes: AllowanceType[];
  id: string;
  url = 'Allowances/GetAllPaged';
  saveBtn: boolean = false;
  get Service(): AllowancesService { return Shell.Injector.get(AllowancesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AllowanceComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getAllowanceTypes();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = this.resetForm(this.model);
    this.dialogRef.afterClosed().subscribe(result => {
      if (this.saveBtn == true && this.isNew == true) 
      {
        this.openDetails();
      }
    });
  }

  ngOnInit() {
  }




  onAddSave(event) {
    this.saveBtn = event.buttonType === 'SaveClose' ? true : false;
    this.close(event, this.resetForm(new Allowance()));
  }
  openDetails(){
    this.Service.getAllowanceByName(this.form.value.allowanceNameFl).subscribe((res: any) => {
      let result =  { data: res, isViewDetils: false };
      this.openViewDetail(AllowanceSettingComponent, result);
     });
  }
  getAllowanceTypes(): void {
    this.Service.getAllowanceType().subscribe((data: any) => {
     this.allowanceTypes = data;
    });
  }

  resetForm(model:Allowance): any{
    let resetForm = this.fb.group({   
      id: [model.id],
      allowanceTypeId: [model.allowanceTypeId, Validators.required],
      allowanceNameFl: [model.allowanceNameFl, [Validators.required,this.removeSpaces]],
      allowanceNameSl: [model.allowanceNameSl,this.removeSpaces],
    });
    return resetForm;
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
}
