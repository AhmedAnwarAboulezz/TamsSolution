import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Observable } from 'rxjs';
import { HttpServiceBaseService } from 'src/app/component/base/services/HttpServiceBase';
@Injectable({
  providedIn: 'root'
})

/**
 * Manipulate the HTTP requests for the whole app
 * handle the main POST, GET, UPDATE, DELETE methods
 */
export abstract class HttpService extends HttpServiceBaseService {

  public serverUrl = this.configService.get('host');
  public logoutHub = this.configService.get('LogoutHub');

  constructor(public http: HttpClient, private configService: ConfigService) {
    super();
  }

  /**
   * Get request using angular httpClient module
   */
  getLookup(url: string, data?: any) {
    return this.http.get(this.serverUrl + url, data);
  }

  /**
   * Post request using angular httpClient module
   */
  postReq(url: string, data: any) {

    return this.http.post(this.serverUrl + this.baseUrl + url, data);
  }

  /**
   *  Post Request For Custom Component services
   */
  customPostReq(url: string, data: any) {
    return this.http.post(this.serverUrl + url, data);
  }

  postQueryParamsReq(url: string, data: any, params?: any) {
    return this.http.post(this.serverUrl + url, data, { params });
  }
  /**
   * Get request using angular httpClient module
   */
  getReq(url: string, data?: any) {

    return this.http.get(this.serverUrl + this.baseUrl + url, data);
  }

  /**
   * Get request using angular httpClient module
   */
  getPaged(url: string, data: any): Observable<any> {
    return this.http.post(this.serverUrl + url, data);
  }

  /**
   * Get request using angular httpClient module
   */
  getQueryReq(url: string, params?: any) {
    return this.http.get(this.serverUrl + url, { params });
  }
  /**
   * Get request using angular httpClient module
   * you can bass a parameter (data) in the url separated by '/'
   */
  getHeaderReq(url: string, data: string) {
    return this.http.get(this.serverUrl + url + '/' + data);
  }

  /**
   * PUT request using angular httpClient module
   * you can bass a parameter (data) in the url separated by '/'
   */
  putReq(url: string, data?: any) {
    return this.http.put(this.serverUrl + this.baseUrl + url, data);
  }

  deleteReq(url: string, data?: any) {
    return this.http.delete(this.serverUrl + url + '/' + data);
  }
}
