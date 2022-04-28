import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './component/login/login.component';

import { APIs } from './services/shared';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';
import { TokenInterceptor } from './interceptors/tokenInterceptor';
import { AuthGuard, AuthGuardCheckPage, AuthGuardLoginPage } from './guards/auth-guard.service';
import { CoreModule } from 'src/app/core/core.module';

import { RecaptchaModule } from 'ng-recaptcha';
import { TreeModule } from 'angular-tree-component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ConfigModule } from 'ngx-envconfig';
import { environment } from 'src/environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/TokenService';
import { StoreModule } from '@ngrx/store';
import { organizationReducer } from './component/store/organization.reducer';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    NotfoundComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    HttpClientModule,
    HttpModule,
    RecaptchaModule,
    CoreModule,
    StoreModule.forRoot({ organizationdata: organizationReducer }),

    TreeModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    
    MatPasswordStrengthModule,
    ConfigModule.forRoot(environment)
  ],
  exports: [TranslateModule],
  providers: [APIs, DataService, AuthGuard, AuthGuardLoginPage,AuthGuardCheckPage,TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
      //deps: [Router, AuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
