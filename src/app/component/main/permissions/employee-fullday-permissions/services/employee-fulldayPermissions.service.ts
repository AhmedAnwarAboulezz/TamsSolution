import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFulldayPermissionsService extends HttpService {
  protected get baseUrl(): string {
    return 'EmployeeFulldayPermissions/';
  }
  getFullDayPermissions(): Observable<any> {
    return this.http.get(this.serverUrl + 'FullDayPermissions/GetDropdownList');
  }
  getWeekDays(): Observable<any> {
    return this.http.get(this.serverUrl + 'WeekDays/GetDropdownList');
  }
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getFullDayPermissions());
    sources.push(this.getWeekDays());
    return forkJoin(sources);
  }
}
