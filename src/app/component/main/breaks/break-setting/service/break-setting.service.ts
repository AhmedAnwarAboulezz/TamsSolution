import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class BreakSettingService extends HttpService {
  protected get baseUrl(): string {
    return 'BreakSettings/';
  }

  getTriggerTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'BreakSettings/GetTriggerTypes');
  }
  getBreakSettings(organizationid): Observable<any> {
    return this.http.get(this.serverUrl + 'BreakSettings/GetBreakSettings/'+organizationid);
  }
  addBreakSetting(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'BreakSettings/Add', data);
  }
  updateBreakSetting(data: any): Observable<any> {
    return this.http.put(this.serverUrl + 'BreakSettings/Update', data);
  }
}
