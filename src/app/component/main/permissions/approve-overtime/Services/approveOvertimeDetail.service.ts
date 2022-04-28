import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ApproveOvertimeDetailsService extends HttpService {
  protected get baseUrl(): string {
    return 'ApproveOverTimeDetails/';
  }
  Fill(filter: any): Observable<any> {
    return this.http.post(this.serverUrl + 'ApproveOverTimeDetails/Fill', filter);
  }
  getOverTimeTypes(): Observable<any> {
    return this.http.get(this.serverUrl + `OverTimeOrders/GetOverTimeTypeDropdown`);
  }
}
