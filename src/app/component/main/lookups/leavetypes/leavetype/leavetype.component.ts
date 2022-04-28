
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Leavestype } from '../../../../../models/Leavestype';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { LeavetypesService } from '../Services/leavetypes.services';
@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.scss']
})


export class LeavetypeComponent extends BaseEditComponent implements OnInit {
  model: Leavestype = {};
  id: string;
  url = 'LeavesTypes/GetAllPaged';
  get Service(): LeavetypesService { return Shell.Injector.get(LeavetypesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<Leavestype>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({

      id: [this.model.id],
      code: [this.model.code],
      leaveTypeFL: [this.model.leaveTypeFL,[ Validators.required,this.removeSpaces]],
      leaveTypeSL: [this.model.leaveTypeSL,this.removeSpaces],
    });
  }

  ngOnInit() {
  }

}