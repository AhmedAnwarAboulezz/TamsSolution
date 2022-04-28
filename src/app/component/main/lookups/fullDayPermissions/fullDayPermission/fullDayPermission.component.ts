import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FullDayPermission} from '../../../../../models/FullDayPermission';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { FullDayPermissionsService } from '../Services/fullDayPermissions.services';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-fullDayPermission',
  templateUrl: './fullDayPermission.component.html',
  styleUrls: ['./fullDayPermission.component.scss']
})


export class FullDayPermissionComponent extends BaseEditComponent implements OnInit {
  model: FullDayPermission = {};
  id: string;
  url = 'FullDayPermissions/GetAllPaged';
  get Service(): FullDayPermissionsService { return Shell.Injector.get(FullDayPermissionsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<FullDayPermissionComponent>,
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
        fullDayPermissionFL: [this.model.fullDayPermissionFL,[ Validators.required,this.removeSpaces]],
        fullDayPermissionSL: [this.model.fullDayPermissionSL,this.removeSpaces],
    });
  }

  ngOnInit() {
  }

}