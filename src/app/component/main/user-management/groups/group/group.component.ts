import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Group } from 'src/app/models/group';
import { GroupsService } from '../services/groups.service';
import { Shell } from 'src/app/component/shell';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent extends BaseEditComponent {
  model: Group = {};
  id: string;
  url = 'Groups/GetAllPaged';
  resetedForm:any;
  get Service(): GroupsService { return Shell.Injector.get(GroupsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<GroupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = this.resetForm(this.model);
   
  }

  resetForm(model:Group): any{
    
    let resetForm = this.fb.group({   
      id: [model.id],
      code: [model.code],
      groupFL: [model.groupFL, Validators.required],
      groupSL: [model.groupSL],
      active: [model.active ? model.active : false]
    });
    return resetForm;
  }


  onClose(event){
  this.close(event, this.resetForm(new Group()));
  }
}
