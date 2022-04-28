import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OvertimeDatesService extends HttpService {
  protected get baseUrl(): string {
    return 'OverTimeDates/';
  }
  getLeaveTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'LeavesTypes/GetDropdownList');
  }
}
