import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { HttpClient } from '@angular/common/http';
import { WeekEmployee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends HttpService {

  // private fields
  get baseUrl(): string {
    return 'EmployeeFixedDutyPeriods/';
  }

  getDuties(): Observable<any> {
    return this.http.get(this.serverUrl + 'FixedDuties/GetAllFixedDutyPeriod');
  }

  save(employees: any[]): Observable<any> {
    return this.postReq('AddMonth', employees);
  }
  setOldEmployeeDutyService(fixedPeriodDutyCalender: any[]): Observable<any> {
    return this.postReq('SetOldEmployeeDuty', fixedPeriodDutyCalender);
  }

}
