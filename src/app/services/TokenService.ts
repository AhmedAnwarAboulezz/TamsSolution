import { Injectable } from '@angular/core';
import { LocalizationService } from './localization/localization.service';
import { Shell } from '../component/shell';
import { DataService } from './data.service';
import { ConfigService } from 'ngx-envconfig';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly JWT_TOKEN = 'token';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  constructor(
    private service: DataService, 
    private configService: ConfigService
    ) 
  {   
   }
   async refreshToken() {
    let serverUrl = this.configService.get('host');
    let tokens: Tokens ={
      token: this.getJwtToken(),
      refreshToken: this.getRefreshToken()
    }
    let refreshtokens: Tokens = await this.service.post(serverUrl+'Authentication/RefreshTokenForWeb/refresh-token',tokens).toPromise();
    this.storeJwtToken(refreshtokens.token);
    return refreshtokens;
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
   getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
   storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

   storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

   removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
  

 
}

export class Tokens{
  token?:string;
  refreshToken?:string;
  message?:string;
  errorType?: number;
}


