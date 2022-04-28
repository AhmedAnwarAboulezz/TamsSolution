import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenCloseYearService extends HttpService {
  protected get baseUrl(): string {
    return 'OpenCloseYear/';
  }
  getUsers(): Observable<any> {
    return this.http.get(this.serverUrl + 'Users/GetAllUserDropDown');
  }
  getActionTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'OpenCloseYear/GetAllActionTypes');
  }
  getLockTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'OpenCloseYear/GetAllLockTypes');
  }
}
