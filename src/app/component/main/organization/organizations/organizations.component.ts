import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { Organization } from 'src/app/models/Organization';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { AlertService } from 'src/app/services/AlertService';
import { Shell } from 'src/app/component/shell';
import { PreviousLeavesBalancesService } from '../../leaves/previous-leaves-balances/services/previous-leaves-balances.service';
import { OrganizationService } from '../services/organization.service';
import { Router } from '@angular/router';
import { TimeZones } from 'src/app/models/timezones';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent extends BaseComponent implements OnInit {
  base64textString = '';
  form: FormGroup;
  fileForm: FormGroup;
  fileName: string = '';
  fileForm2: FormGroup;
  fileName2: string = '';
  selectedFile = './assets/img/emptyphoto.PNG';

  timeZones:TimeZones[];
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
    this.GetLookup();
  }
GetLookup(){
  this.Service.GetAllTimeZones().subscribe((result) => {
    this.timeZones=result;

  });
}
  initForm() {
    let organization = JSON.parse(localStorage.getItem('Organizations_data')) as Organization;  
    this.form = this.fb.group({
      id: [organization.id],
      organizationNameSl: [organization.organizationNameSl],
      organizationNameFl: [organization.organizationNameFl],
      code: [organization.code],
      alternativeEmail: [organization.alternativeEmail,Validators.email],
      primaryLanguage: [organization.primaryLanguage],
      secondaryLanguage: [organization.secondaryLanguage],
      logoURLFl: [organization.logoURLFl],
      logoURLSl: [organization.logoURLSl],  
      isPromise:[organization.isPromise], 
      nickName: [organization.nickName, Validators.required],
      registrationEmail: [organization.registrationEmail,Validators.email],
      timeZoneId: [organization.timeZoneId],
    });
    this.fileForm = this.fb.group({
      fileInput: [null, Validators.required],
    });
    this.fileForm2 = this.fb.group({
      fileInput: [null, Validators.required],
    });
  }

  onSelectedFilesChangedFl(inputImage: any) {
    let oldImage = this.form.value.logoURLFl;
    try {
      const file: File = inputImage.files[0];
      if (file.size > 2000000) {
        this.alertService.showError('Sorry, File Max Size is 2MB');
        inputImage.value = null;
      } else {
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          this.form.value.logoURLFl = event.target.result;
        });
        reader.readAsDataURL(file);
      }
      
    } catch (error) {
      this.form.value.logoURLFl = oldImage;
    }
  }
  onSelectedFilesChangedSl(inputImage: any) {
    let oldImage = this.form.value.logoURLFl;
    try {
      const file: File = inputImage.files[0];
      if (file.size > 2000000) {
        this.alertService.showError('Sorry, File Max Size is 2MB');
        inputImage.value = null;
      } else {
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          this.form.value.logoURLSl = event.target.result;

        });
        reader.readAsDataURL(file);
      }
      
    } catch (error) {
      this.form.value.logoURLSl = oldImage;
    }
  }
  edit() {
    this.service.put(this.APIs.init('Organizations').Update, this.form.value)
      .subscribe(() => {
        this.alertService.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
        localStorage.setItem('Organizations_data', JSON.stringify(this.form.value));        
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
         this.router.navigate(['/main/organizations']));
      });
  }



  uploadFile(fileInput: any) {
    this.fileForm.controls.fileInput.setValue(null);
    this.fileName = "None";
    if (fileInput.target.files && fileInput.target.files[0]) {

      let fileToUpload = fileInput.target.files[0];
      const formData = new FormData();
      this.fileName = fileToUpload.name;
      formData.append('file', fileToUpload, fileToUpload.name);
      let file = formData.getAll('file');
      if (file.length > 0) 
      {
        // if (file[0]['size'] > 8823 && file[0]['size'] < 2100999) 
        // {
        //   this.fileForm.controls.fileInput.setValue(formData);
        //   console.log("file form = ", this.fileForm);
        // } 
        // else 
        // {
        //   this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmptyOrGreatSize'));
        // }
        this.fileForm.controls.fileInput.setValue(formData);
        console.log("file form = ", this.fileForm);
      } 
      else 
      {
        this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmpty'));
        this.Alert.showError(this.localize.translate.instant('Message.uploadfile'));
      }
    }
  }
  onUploadSheet()
  {
    this.openConfirmDialog("license");    
  }


  uploadFile2(fileInput: any) {
    this.fileForm2.controls.fileInput.setValue(null);
    this.fileName2 = "None";
    if (fileInput.target.files && fileInput.target.files[0]) {

      let fileToUpload = fileInput.target.files[0];
      const formData = new FormData();
      this.fileName2 = fileToUpload.name;
      formData.append('file', fileToUpload, fileToUpload.name);
      let file = formData.getAll('file');
      if (file.length > 0) 
      {
        this.fileForm2.controls.fileInput.setValue(formData);
        console.log("file form = ", this.fileForm2);
      } 
      else 
      {
        this.Alert.showError(this.localize.translate.instant('Message.excelSheetEmpty'));
        this.Alert.showError(this.localize.translate.instant('Message.uploadfile'));
      }
    }
  }
  onUploadSheet2()
  {
    this.openConfirmDialog("server");    
  }

  setData(type: string){
    this.loaderService.show();
    if(type == "server"){
      this.Service.getuploadedDataForServer(this.fileForm.value.fileInput).subscribe(data => {      
        this.loaderService.hide();
        this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
      }, error => {
        this.loaderService.hide();
        this.Alert.showError(this.localize.translate.instant('Message.noDataFound'));
      }); 
    }
    else{
      this.Service.getUploadedDataForLicence(this.fileForm.value.fileInput).subscribe(data => {      
        this.loaderService.hide();
        this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
      }, error => {
        this.loaderService.hide();
        this.Alert.showError(this.localize.translate.instant('Message.noDataFound'));
      }); 
    }
    
  }
  openConfirmDialog(type: string): void {
    let confirmTitle = "organizations.needConfirmation";
    let confirmMessage = "organizations.acceptSheet";
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { message : confirmMessage, title : confirmTitle }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == undefined || result.data == false) 
      {  return;  }
        this.setData(type);          
    });
  }
}
