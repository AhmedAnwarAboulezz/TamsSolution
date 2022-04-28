import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class OvertimeService extends HttpService {
  protected get baseUrl(): string {
    return 'OverTimeOrders/';
  }
  getOverTimeByDesicionNumber(desicionNumber:any): Observable<any> {
    return this.http.get(`${this.serverUrl}OverTimeOrders/GetByDesicionNumber/${desicionNumber}`);
  }
}
