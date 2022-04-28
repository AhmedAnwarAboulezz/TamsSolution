
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { HomeService } from '../component/main/home/services/home.service';
import { LocalizationService } from '../services/localization/localization.service';
import { Shell } from '../component/shell';
import { AlertService } from '../services/AlertService';

@Injectable()
export class AuthGuard implements CanActivate {
  path: import ('@angular/router').ActivatedRouteSnapshot[];
  route: import ('@angular/router').ActivatedRouteSnapshot;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(activatedRoute: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      localStorage.removeItem('token');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}

@Injectable()
export class AuthGuardLoginPage implements CanActivate {
  path: import ('@angular/router').ActivatedRouteSnapshot[];
  route: import ('@angular/router').ActivatedRouteSnapshot;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
   let rememberMe = JSON.parse(localStorage.getItem('RememberMe'));
   if(rememberMe != null && rememberMe)
   {
      if (this.authService.isLoggedIn()) 
      {
        this.router.navigate(['/main/home']);
        return false;
      }
   }
   return true;
  }
}


@Injectable()
export class AuthGuardCheckPage implements CanActivate {
  path: import ('@angular/router').ActivatedRouteSnapshot[];
  route: import ('@angular/router').ActivatedRouteSnapshot;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }

  constructor(
    private router: Router,
    private authService: AuthService,
    private homeService:HomeService
  ) { }



  async canActivate(activatedRoute: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    return true;
    // const isloggedFromOtherDevice: any = await this.homeService.IsLoginFromOtherDeviceRequest().toPromise();
    // if(isloggedFromOtherDevice){
    //     localStorage.removeItem('token');
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    //     this.Alert.showError(this.localize.translate.instant('Message.LogedFromOtherDevice'));  
    //     return false;
    // }
    // else{
    //   return true;
    // }
  }
}