import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { TreeComponent } from 'src/app/shared/components/tree/components/tree/tree.component';
import {  WorkflowRequest, WorkflowRequestTypes, WorkflowTemplate } from 'src/app/models/workflowTemplate';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { WorkFlowService } from '../services/workflow.service';
import { RequestTypeEnum } from 'src/app/enums/RequestTypeEnum';

@Component({
  selector: 'app-assign-stages',
  templateUrl: './assign-stages.component.html',
  styleUrls: ['./assign-stages.component.scss']
})


export class AssignStagesComponent extends BaseEditComponent implements OnInit {
  @ViewChild(TreeComponent, null) tree: TreeComponent;

  templateDaysArray: number[] = [];
  requestTypes:[] = [];
  allOvertimes:[] = [];
  allLeaves:[] = [];
  allPermissions:[] = [];
  allFullDaysPermission:[] = [];

  allRequests:[] = [];
  model: WorkflowTemplate = {};
  id: string;
  url = 'WorkflowTemplate/GetAllPaged';
  requestType:any;
  workflowTemplateRequestType:any;
  requestTypeEnum = RequestTypeEnum;
  header = DatePickerHeader;
  get Service(): WorkFlowService { return Shell.Injector.get(WorkFlowService); }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignStagesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    super(dialogRef);
    if (this.data) 
    {
      
      this.model = this.data.workflow;
      this.requestTypes = data.requestTypes;
      this.allLeaves = data.leaves;
      this.allFullDaysPermission = data.fullDayPermision;
      this.allPermissions = data.permissions.filter(a=>a.isAllowed == true);
      this.allOvertimes = data.overtimes;
      this.isNew = false;
    }
    if (this.model.workflowTemplateRequestType !== undefined && this.model.workflowTemplateRequestType.some(e => typeof e === 'object'))
    {
      this.workflowTemplateRequestType = this.model.workflowTemplateRequestType.map(({ requestTypeDetailsId }: any) => (requestTypeDetailsId));
      this.requestType = this.model.workflowTemplateRequestType.map(({ requestTypeId }: any) => (requestTypeId))[0];
    }
    if (this.model.workflowTemplateAdministrative !== undefined &&  this.model.workflowTemplateAdministrative.some(e => typeof e === 'object')) 
    {
      this.model.workflowTemplateAdministrative = this.model.workflowTemplateAdministrative.map(({ administrativeLevelId }: any) => (administrativeLevelId));
    }
    this.form = fb.group({
      workflowId: [this.model.id],
      workflowRequestTypeId: [this.requestType, Validators.required],
      workflowRequestTypes: [this.workflowTemplateRequestType, Validators.required],
      workflowAdminstrations: [this.model.workflowTemplateAdministrative, Validators.required],
    });
    this.onTypeChange(this.requestType, 'init');
  }

  ngOnInit() {

  }

  // lookups(): void {
  //   this.Service.getRequestTypes().subscribe((data: any) => {
  //     this.requestTypes = data;
  //   });
  //   this.Service.getLeaveTypes().subscribe((data: any) => {
  //     this.allLeaves = data;
  //   });
  //   // this.Service.getLeaveTypes().subscribe((data: any) => {
  //   //   this.allLeaves = data;
  //   // });
  //   // this.Service.getLeaveTypes().subscribe((data: any) => {
  //   //   this.allLeaves = data;
  //   // });
  // }

  onTypeChange(event:any, process?:string)
  {
    this.setRequired('workflowRequestTypes');
    
    if(process !== 'init')
    {
      this.form.controls['workflowRequestTypes'].setValue(null);
    }
    if(event == this.requestTypeEnum.Leave || event == this.requestTypeEnum.LeaveReturn)
    {
      this.allRequests = this.allLeaves;
    }
    else if(event == this.requestTypeEnum.PartialPermission)
    {
      this.allRequests = this.allPermissions;
    }
    else if(event == this.requestTypeEnum.FullDayPermision)
    {
      this.allRequests = this.allFullDaysPermission;
    }
    else if(event == this.requestTypeEnum.Overtime)
    {
      this.removeRequired('workflowRequestTypes');
      this.form.controls['workflowRequestTypes'].setValue(null);
      this.allRequests = [];
    }
  }


  setRequired(columnName: string) {
    this.form.controls[columnName].setValidators([Validators.required])
    this.form.controls[columnName].updateValueAndValidity();
  }
  removeRequired(columnName: string) {
    this.form.controls[columnName].clearValidators()
    this.form.controls[columnName].updateValueAndValidity();
  }


  onAddSave(event: any) {
    if (!event.form.isParent) { event.form.isParent = false; }
    let result = new WorkflowRequest();
    result.workFlowId = this.form.value.workflowId;
    
    const test = this.form.value.workflowAdminstrations;
    if (this.form.value.workflowAdminstrations.some(e => typeof e === 'object'))
    {
      result.workflowTemplateAdministrative = test.map(
        (e: any) => ({ administrativeLevelId: e.data, workflowTemplateId: this.form.value.workflowId }));
    }
    else 
    {
      result.workflowTemplateAdministrative = test.map(
        (e: any) => ({ administrativeLevelId: e, workflowTemplateId: this.form.value.workflowId }));
    }
    let overtimeResult: WorkflowRequestTypes[] = [];
    let overtimeitem: WorkflowRequestTypes = { requestTypeDetailsId: this.form.value.workflowRequestTypeId, workflowTemplateId: this.form.value.workflowId, requestTypeId: this.form.value.workflowRequestTypeId};
    overtimeResult.push(overtimeitem);
    result.workflowTemplateRequestType = this.form.value.workflowRequestTypeId == this.requestTypeEnum.Overtime? overtimeResult :
    this.form.value.workflowRequestTypes.map((e: any) => ({ requestTypeDetailsId: e, workflowTemplateId: this.form.value.workflowId, requestTypeId: this.form.value.workflowRequestTypeId})).filter(q => q.requestTypeDetailsId != 0);
    console.log("Result", result);
    this.Service.addDetails(result).subscribe((data: any) => {
      if (data != null) {
        this.Alert.showError(this.localize.translate.instant('Message.AddError'));
        return false;
      }
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable(this.url);
      this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
      this.tree.loadData([], true);
      this.dialogRef.close();
    }, error => {
      this.Alert.showError(this.getErrorMessage(error));
    });

    // this.close(event, this.resetForm(new WorkflowTemplate()));
    // if (event.buttonType === 'Save') {
    //   this.isNew = true;
    //   this.tree.loadData([], true);
    // }
  }

  
  // resetForm(model: WorkflowTemplate): any {
  //   let resetForm = this.fb.group({
  //     workflowId: [model.id],
  //     workflowRequestTypeId: [this.requestType, Validators.required],
  //     workflowRequestTypes: [this.workflowTemplateRequestType, Validators.required],
  //     workflowAdminstrations: [model.workflowTemplateAdministrative],
  //   });
  //   return resetForm;
  // }



}
