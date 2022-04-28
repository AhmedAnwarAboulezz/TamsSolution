import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAttendanceReportService extends HttpService {
  protected get baseUrl(): string {
    return ' Reports/';
  }
  getEmployeeAttendance(startDate, endDate): Observable<any> {
    let parameter = { startDate, endDate };
    return this.http.post(this.serverUrl + 'Reports/GetEmployeeReport', parameter);
  }
}
