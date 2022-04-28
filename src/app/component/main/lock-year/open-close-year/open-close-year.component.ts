import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractType } from 'src/app/models/contracttype';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { ContractTypesService } from '../../lookups/contract-types/Services/contract-types.service';
import { OpenCloseYearService } from '../Services/openCloseYear.service';

@Component({
  selector: 'app-open-close-year',
  templateUrl: './open-close-year.component.html',
  styleUrls: ['./open-close-year.component.scss']
})
export class OpenCloseYearComponent extends BaseEditComponent implements OnInit {

  model: any = {};
  id: string;
  url = 'OpenCloseYear/GetAllPaged';

  leaves: any;
  years: any[] = [];
  actionTypes: any[] = [];
  lockYearTypes:any[]=[];


  get Service(): OpenCloseYearService { return Shell.Injector.get(OpenCloseYearService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<OpenCloseYearComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      lockYearTypeId: [this.model.lockYearTypeId, Validators.required],
      actionTypeId: [this.model.actionTypeId, Validators.required],
      year: [this.model.year ,Validators.required],
      notes: [this.model.notes]
    });
    this.getLookups();
  }
  ngOnInit() {
  }

  getLookups(){
    let year = new Date().getFullYear();
    for (let i = year - 10; i <= year; i++) {
      this.years.push(i);
    }
    // this.lockYearTypes = [
    //   { nameFl:'leaves', nameSl:'أجازات', id:'10000000-1000-1000-1000-100000000000' },
    //   { nameFl:'permissions', nameSl:'إستئذانات', id:'20000000-2000-2000-2000-200000000000' }
    //  ];
    //  this.actionTypes = [
    //   { nameFl:'Opened', nameSl:'مفتوح', id:'10000000-1000-1000-1000-100000000000' },
    //   { nameFl:'Closed', nameSl:'مغلق', id:'20000000-2000-2000-2000-200000000000' }
    // ];
    this.Service.getActionTypes().subscribe((data: any) => {
      this.actionTypes = data;
      if(this.isNew){
        this.actionTypes = this.actionTypes.filter(a=>a.id == '20000000-2000-2000-2000-200000000000');
        this.form.controls['actionTypeId'].setValue('20000000-2000-2000-2000-200000000000');
      }
    });
    this.Service.getLockTypes().subscribe((data: any) => {
      this.lockYearTypes = data;
    });

  }
}
