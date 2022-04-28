import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAlowancesService extends HttpService {
  protected get baseUrl(): string {
    return 'employeeAllowances/';
  }
  getAllowancesGrid(): Observable<any> {
    return this.http.get(this.serverUrl + 'Allowances/GetDropdownList');
  }
  getAllowances(): Observable<any> {
    return this.http.get(this.serverUrl + 'Allowances/GetAll');
  }
  getWeekDays(): Observable<any> {
    return this.http.get(this.serverUrl + 'WeekDays/GetDropdownList');
  }
 


  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getAllowancesGrid());  
    sources.push(this.getWeekDays());

    return forkJoin(sources);
  }
}
