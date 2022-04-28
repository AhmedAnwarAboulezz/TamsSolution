import { AdminManger } from './../../../../../models/adminManger';
import { AdministrativeLevel } from 'src/app/models/administrativeLevel';
import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AdminmanagersService } from '../services/adminmanagers.service';
import { Shell } from 'src/app/component/shell';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { TreeComponent } from 'src/app/shared/components/tree/components/tree/tree.component';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
@Component({
  selector: 'app-adminmanger',
  templateUrl: './adminmanger.component.html',
  styleUrls: ['./adminmanger.component.scss']
})
export class AdminmangerComponent extends BaseEditComponent implements OnInit {
  @ViewChild(TreeComponent, null) tree: TreeComponent;
  header = DatePickerHeader;

  form: FormGroup;
  model: AdminManger = {};
  id: string;
  url = 'adminMangers/GetAllPaged';
  get Service(): AdminmanagersService { return Shell.Injector.get(AdminmanagersService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminmangerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      adminId: [this.model.adminId, Validators.required],
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate]  

    });
  }
  ngOnInit() {

  }

  onchange(event) {
  }
  selectedNodes(event) {

  }

  // closeConfirm(event) {
  //   super.close(event);
  //   if (event.buttonType === 'Save') {
  //     this.isNew = true;
  //     this.tree.loadData([], true);
  //   }
  // }
  onAddSave(event) {
    let result = { form: this.form.value, buttonType: event };
    super.close(result);
  }

  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }
}
