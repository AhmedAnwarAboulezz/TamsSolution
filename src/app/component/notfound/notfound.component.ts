import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/AlertService';
import { Shell } from '../shell';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})

export class NotfoundComponent implements OnInit {
  OrgID;
  showPage = false;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  constructor(
    public route: Router,
    private authenticationService: AuthService,
    private titleService: Title) {
    this.LoginUrl();
  }

  ngOnInit() {
    let screenName = this.localize.lang == 'ar' ? 'كود المؤسسة'
     : 'Organization Code';
    this.titleService.setTitle(screenName);
  }

  GoToUrl(OrgID: any) {
    if (OrgID == '' || OrgID == null) {
      this.Alert.showError(this.localize.translate.instant('Message.EnterCodeFirst'));

    }
    this.route.navigate(['login'], { queryParams: { code: OrgID } });
  }
  LoginUrl() {
    if (localStorage.getItem('Organizations_data') !== null) {
      let Organizations_data = JSON.parse(localStorage.getItem('Organizations_data'));
      let orgCode = Organizations_data.code;
      this.route.navigate(['login'], { queryParams: { code: orgCode } });

    }
    else{
      this.authenticationService.GetOrganizations()
      .subscribe(result => {
        if (result.length == 1) {
          let OrgID = result[0].code;
          this.route.navigate(['login'], { queryParams: { code: OrgID } });
        }
        this.showPage = true;
        
      });
    }



  }

}
