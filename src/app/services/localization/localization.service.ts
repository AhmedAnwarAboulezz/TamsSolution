import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class LocalizationService {

  public lang: any;
  public currentLang: any;
  public translate: TranslateService;
  public multiLang: boolean = false;
  flLang;
  slLang;
  changeLanguageEvent$: EventEmitter<string> = new EventEmitter<string>();
  constructor(private translateService: TranslateService, private adapter: DateAdapter<any>) {
    this.translate = translateService;
    this.lang = localStorage.getItem('language') != null ? localStorage.getItem('language') : 'en';
    this.currentOrgLanguage();

  }

  async setDefaultLanguage() {
    this.translate.addLangs(['en', 'fr', 'ar']);
    this.translate.setDefaultLang('en');
    const browserLang = this.lang ? this.lang : this.translate.getBrowserLang();
    await this.translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'en');
    this.changeHtmlDirection(browserLang);
  }

  changeLang(lang) {
    this.lang = lang;
    this.currentOrgLanguage();
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.changeHtmlDirection(lang);

  }



  changeHtmlDirection(lang) {
    if (lang !== 'ar') {
    } else if (lang === 'ar') {

    }
  }

  isEnglish(): boolean {
    const currentLang = this.translate.currentLang;
    if (currentLang === 'en') {
      return true;
    } else {
      return false;
    }
  }

  currentOrgLanguage() {
    let Organizations_data = JSON.parse(localStorage.getItem('Organizations_data'));
    if (Organizations_data != null) {
      let flLang = Organizations_data['primaryLanguage'];
      this.flLang = flLang;
      let slLang = Organizations_data['secondaryLanguage'];
      this.slLang = slLang;
      if (slLang != null && slLang != "") {
        this.multiLang = true;
      }
      else {
        this.multiLang = false;
      }
      if (slLang != null && slLang != "")
      {
        this.currentLang = this.lang.toLowerCase() == slLang.toLowerCase() ?
        "Sl" : this.lang.toLowerCase() == flLang.toLowerCase() ? "Fl" : "";
      }
      
    }
    else{
      this.currentLang = "Fl";
    }

  }

}
