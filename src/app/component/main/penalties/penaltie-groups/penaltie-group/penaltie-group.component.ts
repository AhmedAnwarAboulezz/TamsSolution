import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { PenaltieGroup } from 'src/app/models/penaltiegroup';
import { PenaltieGroupService } from '../services/penaltiegroup.services';

@Component({
  selector: 'app-penaltie-group',
  templateUrl: './penaltie-group.component.html',
  styleUrls: ['./penaltie-group.component.scss']
})


export class PenaltieGroupComponent extends BaseEditComponent implements OnInit {
  model: PenaltieGroup = {};
  templateDaysArray: number[] = [];
  penaltieGroupDetailsArray: any;
  id: string;
  url = 'PenaltieGroups/GetAllPaged';
  penaltieGroupCodes = [
    { val: 1, name: '1'},
    { val: 2, name: '2' },
    { val: 3, name: '3' },
    { val: 4, name: '4' },
    { val: 5, name: '5' },
    { val: 6, name: '6' }
  ];
  get Service(): PenaltieGroupService { return Shell.Injector.get(PenaltieGroupService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<PenaltieGroupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
   
      id: [this.model.id],
      penaltieGroupCode: [this.model.penaltieGroupCode, [Validators.required,this.removeSpaces]],
      penaltieGroupFl: [this.model.penaltieGroupFl,[Validators.required,this.removeSpaces]],
      penaltieGroupSl: [this.model.penaltieGroupSl,[Validators.required,this.removeSpaces]],
      contentCount: [this.model.contentCount,[Validators.required,this.removeSpaces]],
      isForSupervisoryJob: [this.model.isForSupervisoryJob != null ? this.model.isForSupervisoryJob : false],
      penaltieGroupDetails: this.getFormArray(this.model.penaltieGroupDetails)
    });
    this.penaltieGroupDetailsArray = this.form.get('penaltieGroupDetails') as FormArray;
    for (let i = 1; i <= this.model.contentCount; i++) {
      this.templateDaysArray.push(i);
    }

  }
  getFormArray(list): FormArray {
    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    } else {
      for (var i = 0; i < this.model.contentCount; i++) {
        array.push(this.fb.group(list[i]));
      }
    }
    return array;
  }
  onTemplateDaysChange() {
debugger;
    //this.isChanged = false;
    let value = this.form.value.contentCount;
    let array = this.form.get('penaltieGroupDetails') as FormArray;
    if (this.form.value.penaltieGroupDetails.length == 0) {
      this.templateDaysArray = [];
      for (let i = 1; i <= value; i++) {
        this.templateDaysArray.push(i);
        array.push(this.fb.group({contentFl: '', contentSl: '', penaltieGroupId: this.model.id}));
      }
    }
    else if (this.form.value.penaltieGroupDetails.length > this.form.value.contentCount) {
      let dailyLength = this.form.value.penaltieGroupDetails.length;
      for (let i = dailyLength - 1; i >= value; i--) {
        this.templateDaysArray.splice(i);
        array.removeAt(i);
      }
    }
    else {
      let dailyLength = this.form.value.penaltieGroupDetails.length;
      for (let i = dailyLength + 1; i <= value; i++) {
        this.templateDaysArray.push(i);
        array.push(this.fb.group({contentFl: '',  contentSl: '', penaltieGroupId: this.model.id}));
      }
    }
  }
  onAddSave(event) {
    debugger;
    let result = { form: this.form.value, buttonType: event };
    if (event == 'Save') {
      this.templateDaysArray = [];
      let array = this.form.get('penaltieGroupDetails') as FormArray;
      array.clear();

    }
    this.close(result);
  }
  ngOnInit() {
  }

}
