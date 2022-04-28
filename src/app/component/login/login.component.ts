import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { BaseComponent } from '../BaseComponent';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TreeNode } from 'angular-tree-component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  invalidLogin: boolean;
  // tslint:disable-next-line:variable-name
  Organizations_Data: any = false;
  logoFl: any;
  logoSl: any;
  hide = true;
  showChangeOrganization = true;

  constructor(
    private authenticationService: AuthService,
    fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public localizationService: LocalizationService,
    public http: HttpClient,
    public storageService: StorageService,

    public httpService: HttpService,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {
    super();
    let code = this.activatedRoute.snapshot.queryParamMap.get('code');
    if ((code == null || code == '')) {
      this.router.navigate(['/initialize']);
    }
    this.form = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false, Validators.required]
    });
  }

  ngOnInit() {

    let screenName = this.localizationService.lang == 'ar' ? 'الدخول' : 'Login';
    this.titleService.setTitle(screenName);
    this.OrganizationsData();
    this.getOrganizationByCode();
    this.ShowChangeOrganizationButton();
  }
  getOrganizationByCode() {
    let code = this.activatedRoute.snapshot.queryParamMap.get('code');

    let languageStorage = localStorage.getItem('language');
    let tokenStorage = localStorage.getItem('token');
    if (!tokenStorage) {
      this.service.get(this.APIs.init('Organizations', code).GetCode).subscribe(res => {
        this.service.Organizations(res);
        localStorage.setItem('Organizations_data', JSON.stringify(res));
        if (!languageStorage) {
          localStorage.setItem('language', res.primaryLanguage.toLowerCase());
        }
      }, error => {
        this.router.navigate(['/initialize']);
        localStorage.removeItem('Organizations_data');
      }
      );
    }
  }
  ShowChangeOrganizationButton() {   
      this.authenticationService.OrganizationCount()
      .subscribe(result => {
        if (result == false) {
          this.showChangeOrganization = false;
        }        
      });
    }

  OrganizationsData() {

    this.service.OrganizationsData$.subscribe(async (res) => {
      if (res) {

        this.Organizations_Data = res;
        this.logoFl = this.sanitizer.bypassSecurityTrustResourceUrl(res['logoURLFl']);
        this.logoSl = this.sanitizer.bypassSecurityTrustResourceUrl(res['logoURLSl']);

      } else {
        // tslint:disable-next-line:variable-name
        let Organizations_data = localStorage.getItem('Organizations_data');
        Organizations_data = JSON.parse(Organizations_data);

        if (Organizations_data) {

          this.Organizations_Data = Organizations_data;
          this.logoFl = this.sanitizer.bypassSecurityTrustResourceUrl(Organizations_data['logoURLFl']);
          this.logoSl = this.sanitizer.bypassSecurityTrustResourceUrl(Organizations_data['logoURLSl']);
        }
      }
    });
  }

  authorize() {
    if (localStorage.getItem('Organizations_data') === null) {
      this.getOrganizationByCode();
    }
    let val = this.form.value;
    // tslint:disable-next-line:variable-name
    let Organizations_data = JSON.parse(localStorage.getItem('Organizations_data'));

    val.organizationId = Organizations_data ? Organizations_data.id : null;

    this.authenticationService.login(val)
      .subscribe(result => {
        if (result) {
          let url = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
          
          url ? this.router.navigate([url]) : this.router.navigate(['/main']);
          this.invalidLogin = false;
          localStorage.setItem('RememberMe', JSON.stringify(this.form.value.rememberMe));

        } else {
          this.invalidLogin = true;
          localStorage.setItem('RememberMe', JSON.stringify(false));

        }
      });
  }

  changeLanguage(culture: string) {
    this.localizationService.changeLang(culture);
    let screenName = culture == 'ar' ? 'الدخول' : 'Login';
    this.titleService.setTitle(screenName);
  }
  changeorganization()
  {
    localStorage.removeItem('Organizations_data');
    this.router.navigate(['/initialize']);
  }



}
