import { Injectable } from '@angular/core';
import * as data from './../../assets/data/endpoint-show-loader.json';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalizationService } from '../services/localization/localization.service';
import { LoaderService } from '../services/loader/loader.service';
import { finalize} from 'rxjs/operators';
import { RequestContent } from '../models/RequestContent.js';
import { from, Subject } from 'rxjs';
import { TokenService } from '../services/TokenService';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AlertService } from '../services/AlertService';




@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  result: RequestContent[];
  private isRefreshing = false;
  private token: any;
  private refreshTokenSubject: Subject<any> = new Subject<any>();;
 // get Alert(): AlertService { return Shell.Injector.get(AlertService); }

  constructor(
      public localize: LocalizationService, 
      public loaderService: LoaderService,
      public tokenService: TokenService,
      private router: Router,
      private alertService: AlertService
    ) {

  }
  // public getJSON(): Observable<any> {
  //   return this.http.get('./assets/endpoint-show-loader.json');
  // }
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showAndHideLoader(request, 1);
    this.token = this.tokenService.getJwtToken();
    let lang = this.localize.lang;
    switch (lang) {
      case 'ar': {
        lang = 'ar-EG';
        break;
      }
      case 'en': {
        lang = 'en-US';
        break;
      }
      case 'fr': {
        lang = 'fr-FR';
        break;
      }
      default: {
        lang = 'en-US';
        break;
      }
    }

    request = this.addToken(request, this.token, lang);
    // return next.handle(request).pipe(
    //   tap(evt => {
    //       if (evt instanceof HttpResponse) {
    //           if(evt != null) {
    //             this.showAndHideLoader(request, 0);
    //            }  
    //       }
    //   }));
    // return next.handle(request).pipe(catchError((error: any): Observable<any> => {
    //   
    //   if (error instanceof HttpErrorResponse && error.status === 401) {
    //     return this.handle401Error(request, next);
    //   } else {
    //     return throwError(error);
    //   }
    // }));
    //let rrr = tokenNotExpired("token");
    //alert(rrr);
    // if(request.url.includes('/assets/') || request.url.includes('Organizations/')){

    // }
    if(request.url.includes('/assets/') 
    || request.url.includes('Organizations/') 
    || request.url.includes('Authentication/') 
    || request.url.includes('SetUserIsLogedOut')
    || request.url.includes('Users/ResetPassword')
    || request.url.includes('UserMangments/ForgetPassword')    
    || tokenNotExpired("token"))
    {
      return this.handleRequest(request, next);
     }
    else
    {      
        let refreshTimeoutToken =  this.refreshTimeoutToken(request, next, lang);  
        return from(refreshTimeoutToken);      
    }   
    
  }

  handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(finalize(() => {
      this.showAndHideLoader(request, 0);
      //this.loaderService.hide();
    })
    );
  }

  private addToken(request: HttpRequest<any>, token: string, lang?:any) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        lang: lang ? lang : 'en-US',
        currentLang: this.localize.currentLang
      }
    });
  }
  
  private async refreshTimeoutToken(request: HttpRequest<any>, next: HttpHandler,  lang?:any): Promise<HttpEvent<any>>  {
    if (!this.isRefreshing) 
    {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token =  await (this.tokenService.refreshToken());
      this.token = token.token;
      this.showAndHideLoader(request, 0);
      this.isRefreshing = false;
      if(token.errorType != null)
      {
        this.tokenService.removeTokens();
        this.router.navigate(['/login']);
        this.alertService.showError(token.message);       
        return null;
      }
       this.refreshTokenSubject.next(token.token); 
    } 
    else
    {
      await this.delay(3000);
    }
    request = this.addToken(request, this.token, lang);
    return this.handleRequest(request, next).toPromise();
  }

  requestConfiguration(request) {
    this.showAndHideLoader(request, 1);
  }

  showAndHideLoader(request, type: number){
    this.result = data['default'];
    //hide = 0
    if (type == 0){
      this.result.forEach(element => {
        if (request.url.toLowerCase().includes(element.url.toLowerCase()) && request.method.toLowerCase() == element.method.toLowerCase()) {
          // alert("hide "+ request.url);
          this.loaderService.hideArray();
        } 
      });
    }

    //show = 1
    else if (type == 1){
      this.result.forEach(element => {
        if (request.url.toLowerCase().includes(element.url.toLowerCase()) && request.method.toLowerCase() == element.method.toLowerCase()) {
          // alert("show "+ request.url);
          this.loaderService.showArray();
        } 
      });
    }
  }

  delay(ms: number) {
    return new Promise( resolve => {
      setTimeout(resolve, ms);
    } );
  }
  
}


