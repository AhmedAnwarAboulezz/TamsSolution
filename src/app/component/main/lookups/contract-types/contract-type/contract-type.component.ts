
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractType } from 'src/app/models/contracttype';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { ContractTypesService } from '../Services/contract-types.service';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-contractType',
  templateUrl: './contract-type.component.html',
  styleUrls: ['./contract-type.component.scss']
})
export class ContractTypeComponent extends BaseEditComponent implements OnInit {

  model: ContractType = {};
  id: string;
  url = 'ContractTypes/GetAllPaged';
  get Service(): ContractTypesService { return Shell.Injector.get(ContractTypesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractTypeComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      contractTypeFL: [this.model.contractTypeFL, [Validators.required,this.removeSpaces]],
      contractTypeSL: [this.model.contractTypeSL,this.removeSpaces]
    });
  }
  ngOnInit() {
  }
}
