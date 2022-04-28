import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../BaseComponent';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Title } from '@angular/platform-browser';
import { ForgetPasswordModel } from './model/forgetPassword';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})

export class ForgetPasswordComponent extends BaseComponent implements OnInit {
  showLoader: boolean;
  form: FormGroup; 
  forgetPasswordModel:ForgetPasswordModel={};
  constructor(private fb: FormBuilder,
    private authenticationService: AuthService,
    private router: Router,
    public localizationService: LocalizationService,
    private titleService: Title) {
    super();
    this.form = fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      organizationCode: this.fb.control('', [Validators.required])

    });
  }

  ngOnInit() {
    let screenName = this.localizationService.lang == 'ar' ? "نسيت كلمة المرور" : "Forget Password";
    this.titleService.setTitle(screenName); 
  }

  sendMail() {
    //event.preventDefault();
    this.showLoader = true;
    this.forgetPasswordModel.email=this.form.value.email;
    this.forgetPasswordModel.organizationCode=this.form.value.organizationCode;
    this.authenticationService.forgetPassword( this.forgetPasswordModel)
      .subscribe(result => {
        console.log(result)
       this.alertService.showSuccess(this.localize.translate.instant('ForgetPassword.successfullySendMail'));
        this.showLoader = false;
       var that = this;
       setTimeout(function () {
         that.gotologin();
       }, 3000);
      }, error => {
        this.showLoader = false;
      });
  }
  gotologin() {
    this.router.navigate(['/login']);
  }
  GoToUrl(OrgID: any) {
    if (OrgID == '' || OrgID == null) {
      OrgID = 'Apex';
    }
    let currentUrl = this.router.url;
    this.router.navigate(['login'], { queryParams: { code: OrgID } });
  }
}
