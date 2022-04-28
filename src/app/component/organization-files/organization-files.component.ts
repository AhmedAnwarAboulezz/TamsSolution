import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/Organization';
import { AlertService } from 'src/app/services/AlertService';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { BaseComponent } from '../BaseComponent';
import { OrganizationService } from '../main/organization/services/organization.service';
import { Shell } from '../shell';

@Component({
  selector: 'app-organization-files',
  templateUrl: './organization-files.component.html',
  styleUrls: ['./organization-files.component.scss']
})



export class OrganizationFilesComponent extends BaseComponent implements OnInit {
  base64textString = '';
  fileForm: FormGroup;
  fileName = '';
  fileForm2: FormGroup;
  fileName2 = '';

  fileForm3: FormGroup;
  fileName3 = '';

  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Service(): OrganizationService { return Shell.Injector.get(OrganizationService); }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public loaderService: LoaderService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let organization = JSON.parse(localStorage.getItem('Organizations_data')) as Organization;
    this.fileForm = this.fb.group({
      fileInput: [null, Validators.required],
    });
    this.fileForm2 = this.fb.group({
      fileInput: [null, Validators.required],
    });

    this.fileForm3 = this.fb.group({
      fileInput: [null, Validators.required],
    });
  }

  uploadFile(fileInput: any) {
    this.fileForm.controls.fileInput.setValue(null);
    this.fileName = 'None';
    if (fileInput.target.files && fileInput.target.files[0]) {

      let fileToUpload = fileInput.target.files[0];
      const formData = new FormData();
      this.fileName = fileToUpload.name;
      formData.append('file', fileToUpload, fileToUpload.name);
      let file = formData.getAll('file');
      if (file.length > 0) {
        this.fileForm.controls.fileInput.setValue(formData);
        console.log('file form = ', this.fileForm);
      } else {
        this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmpty'));
        this.Alert.showError(this.localize.translate.instant('Message.uploadfile'));
      }
    }
  }
  onUploadSheet() {
    this.openConfirmDialog('license');
  }

  uploadFile2(fileInput: any) {
    this.fileForm2.controls.fileInput.setValue(null);
    this.fileName2 = 'None';
    if (fileInput.target.files && fileInput.target.files[0]) {

      let fileToUpload = fileInput.target.files[0];
      const formData = new FormData();
      this.fileName2 = fileToUpload.name;
      formData.append('file', fileToUpload, fileToUpload.name);
      let file = formData.getAll('file');
      if (file.length > 0) {
        this.fileForm2.controls.fileInput.setValue(formData);
        console.log('file form = ', this.fileForm2);
      } else {
        this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmpty'));
        this.Alert.showError(this.localize.translate.instant('Message.uploadfile'));
      }
    }
  }
  onUploadSheet2() {
    this.openConfirmDialog('server');
  }


  uploadFile3(fileInput: any) {
    this.fileForm3.controls.fileInput.setValue(null);
    this.fileName3 = 'None';
    if (fileInput.target.files && fileInput.target.files[0]) {

      let fileToUpload = fileInput.target.files[0];
      const formData = new FormData();
      this.fileName3 = fileToUpload.name;
      formData.append('file', fileToUpload, fileToUpload.name);
      let file = formData.getAll('file');
      if (file.length > 0) {
        this.fileForm3.controls.fileInput.setValue(formData);
        console.log('file form = ', this.fileForm3);
      } else {
        this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmpty'));
        this.Alert.showError(this.localize.translate.instant('Message.uploadfile'));
      }
    }
  }
  onUploadSheet3() {
    this.openConfirmDialog('password');
  }

  setData(type: string) {
    this.loaderService.show();
    if (type == 'server') {
      this.Service.getuploadedDataForServer(this.fileForm2.value.fileInput).subscribe(data => {
        
        this.loaderService.hide();
        this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
      }, error => {
        

        this.loaderService.hide();
        this.Alert.showError(this.localize.translate.instant('Message.noDataFound'));
      });
    }
    else if (type == 'license') {
      this.Service.getUploadedDataForLicence(this.fileForm.value.fileInput).subscribe(data => {
        this.loaderService.hide();
        this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
        localStorage.removeItem('Organizations_data');
        localStorage.removeItem('token');
        this.router.navigate(['/initialize']);
      }, error => {
        this.loaderService.hide();
        this.Alert.showError(this.localize.translate.instant('Message.noDataFound'));
      });
    }
    else{
      
      this.Service.getuploadedDataForPassword(this.fileForm3.value.fileInput).subscribe(data => {
        
        this.loaderService.hide();
        this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
      }, error => {
        this.loaderService.hide();
        this.Alert.showError(this.localize.translate.instant('Message.fileError'));
      });
    }

  }
  openConfirmDialog(type: string): void {
    let confirmTitle = 'organizations.needConfirmation';
    let confirmMessage = type == 'server' ? 'organizations.acceptSheetServer'
                               : type == 'license' ? 'organizations.acceptSheet'
                               :'organizations.acceptSheetPassword';
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { message: confirmMessage, title: confirmTitle }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == undefined || result.data == false) { return; }
      this.setData(type);
    });
  }
}
