import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService extends HttpService {
  protected get baseUrl(): string {
    return 'Audits/';
  }
  getUsers(): Observable<any> {
    return this.http.get(this.serverUrl + 'Users/GetAllUserDropDown');
  }
  getScreens(): Observable<any> {
    return this.http.get(this.serverUrl + 'ScreenGroupsAuthorities/GetScreensDropDown');
  }
  getActions(): Observable<any> {
    return this.http.get(this.serverUrl + 'Audits/GetAllActions');
  }
  getAuditDetails(id, currentLang): Observable<any> {
    return this.http.get(this.serverUrl + `Audits/GetChanges/${id}/${currentLang}`);
  }
  getAuditRangeDetails(id, currentLang): Observable<any> {
    return this.http.get(this.serverUrl + `Audits/GetRangeChanges/${id}/${currentLang}`);
  }  
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getUsers());
    sources.push(this.getScreens());
    sources.push(this.getActions());
    return forkJoin(sources);
  }



}
