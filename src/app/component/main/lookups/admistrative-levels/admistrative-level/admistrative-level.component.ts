import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { AdministrativeLevel } from 'src/app/models/administrativeLevel';
import { Shell } from 'src/app/component/shell';
import { AdminstrativeLevelsService } from '../Services/adminstrative-levels.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TreeComponent } from 'src/app/shared/components/tree/components/tree/tree.component';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { TreeNode } from 'src/app/shared/components/tree/models/tree';

@Component({
  selector: 'app-admistrative-level',
  templateUrl: './admistrative-level.component.html',
  styleUrls: ['./admistrative-level.component.scss']
})
export class AdmistrativeLevelComponent extends BaseEditComponent implements OnInit {
  @ViewChild(TreeComponent, null) tree: TreeComponent;
  model: AdministrativeLevel = {};
  id: string;
  url = 'AdministrativeLevels/GetAllPaged';
  get Service(): AdminstrativeLevelsService { return Shell.Injector.get(AdminstrativeLevelsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AdmistrativeLevelComponent>,
    public http: HttpClient,
    public storageService: StorageService,
    public httpService: HttpService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);

    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({

      id: [this.model.id],
      admLevelFl: [this.model.admLevelFl, [Validators.required,this.removeSpaces]],
      admLevelSl: [this.model.admLevelSl,this.removeSpaces],
      admEmail: [this.model.admEmail, Validators.email],
      parentId: [this.model.parentId],
      isParent: [this.model.isParent]
    });
    if (!this.model.isParent) {
      this.form.controls.isParent.setValue(false);
    }
  }

  ngOnInit() {
  }

  closeConfirm(event) {
    
    if (!event.form.isParent) { event.form.isParent = false; }
    if (this.isNew) {
      this.submitNew(event.form, event.buttonType);
    } else {
      this.submitUpdate(event.form, event.buttonType);
    }
    if (event.buttonType === 'Save') {
      this.isNew = true;
    }
  }

  submitNew(model: any, buttonType?: any, resetForm?: any): void {
    this.Service.postReq('Add', model).subscribe((result: any) => {
      if (result != null) {
        this.Alert.showError(this.localize.translate.instant('Message.AddError'));
        return false;
      }
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable(this.url);
      this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
      this.onNoClick(buttonType, resetForm);
      this.storageService.removeStorgeByKey("TheTree");
      this.tree.loadData([], true);
    }, error => {
      this.Alert.showError(this.getErrorMessage(error));
    });
  }

  submitUpdate(model: any, buttonType?: any, resetForm?: any): void {
    this.Service.putReq('Update', model).subscribe((result: any) => {

      if (result != null) {
        this.Alert.showError(this.localize.translate.instant('Message.UpdateError'));
        return false;
      }
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable(this.url);
      this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      this.onNoClick(buttonType, resetForm);
      this.storageService.removeStorgeByKey("TheTree");
      this.tree.loadData([], true);
    }, error => {
      this.Alert.showError(this.getErrorMessage(error));
    });
  }

}
