import { Screen } from './../models/Screen';
import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { DataService } from 'src/app/services/data.service';
import { APIs } from './APIs';
import 'rxjs/add/operator/map';
import { Menu } from '../models/Menu';
import { Permissions } from '../models/Permissions';
import { AlertService } from './AlertService';
import { Shell } from '../component/shell';
import { TokenService } from './TokenService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'token';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  // private loggedUser: string;
  currentUser: any;
  screens;
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private APIs: APIs,
    private service: DataService,
    public tokenService: TokenService) {

    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
    return this.service.post(this.APIs.init('Authentication').Authenticate, credentials)
      .map(result => {
        if (result && result.token) {

          this.tokenService.storeTokens(result);
          // localStorage.setItem('groups', JSON.stringify(result.groups));
          let jwt = new JwtHelper();
          this.currentUser = jwt.decodeToken(this.tokenService.getJwtToken());
          if (result.infoMessage !== "" && result.infoMessage != null) {
            this.Alert.showInformation(result.infoMessage);
          }
          return true;
        }
        return false;
      });
  }

  signUp(data) {
    return this.service.post(this.APIs.init('Users').addUser, data);
  }

  changepassword(data) {
    return this.service.post(this.APIs.init('Users').ChangePassword, data);
  }

  forgetPassword(data) {
    return this.service.post(this.APIs.init('UserMangments/ForgetPassword').customEndPoint, data);
  }

  logout() {
    this.currentUser = null;
    this.tokenService.removeTokens();
  }

  getPermissions(componentName: string): Permissions {
    const screensAuthorities: Menu[] = JSON.parse(localStorage.getItem('ScreensAuthorities')) as Menu[];

    for (let item of screensAuthorities) {
      const roles = item.childerns.find(e => e.componentName.toLowerCase() == componentName.toLowerCase());

      if (roles) {
        if ((componentName === 'ImportExcel') && roles.permissions.add) {
          roles.permissions.add = false;
        }
        return roles.permissions;
      }
    }
    return { view: false, add: false, update: false, delete: false, print: false };
  }

  loadScreenAuthorities() {
    this.service.getList(this.APIs.init('UserMangments/GetScreensAuthorities').customEndPoint)
      .subscribe((result: Menu[]) => {
        this.screens = result;
        localStorage.setItem('ScreensAuthorities', JSON.stringify(result));
      });
  }

  GetOrganizations() {
    return this.service.get(this.APIs.init('Organizations/GetAll').customEndPoint);
  }
  OrganizationCount() {
    return this.service.get(this.APIs.init('Organizations/OrganizationCount').customEndPoint);
  }
  isLoggedIn(token: string = 'token') {
    // return !!this.tokenService.getJwtToken();
    return (token == 'token' ? !!this.tokenService.getJwtToken() : tokenNotExpired(token));
  }
}
