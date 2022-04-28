import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';
import { AttendanceSearch, AttendanceSearchImage } from 'src/app/models/attendanceSearch';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAttendanceService extends HttpService {
  protected get baseUrl(): string {
    return 'EmployeeAttedanceLogs/';
  }

  getuploadeddata(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'EmployeeLogSheets/UploadFile', data);
  }
  SaveEmployeeLogList(employeeLogs: any): Observable<any> {
    return this.http.post(this.serverUrl + 'EmployeeLogSheets/AddList', employeeLogs);
  }

  getLogtypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeLogs/GetLogTypes');
  }
  getRemark(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeLogs/GetDropdownList');
  }
  getEmployeeById(id:any): Observable<any> {
    return this.http.get(this.serverUrl + `Employees/Get/${id}`);
    
  }


  getLocations(): Observable<any> {
    return this.http.get(this.serverUrl + 'Locations/GetDropdownList');
  }
  getJobs(): Observable<any> {
    return this.http.get(this.serverUrl + 'Jobs/GetDropdownList');
  }

  getTerminalIp(): Observable<any> {
    return this.http.get(this.serverUrl + 'Devices/GetAll');
  }
  

  GetEmployeeLogsByDate(search: AttendanceSearch): Observable<any> {
    return this.http.post(this.serverUrl + 'EmployeeAttedanceLogs/GetEmployeeLogsByDate', search);
  }

  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getLogtypes());
    sources.push(this.getRemark());
    return forkJoin(sources);
  }


  getEmployeeAttendance(id): Observable<any> {
    return this.http.get(this.serverUrl + `EmployeeAttedanceLogs/GetById/${id}`);

  }

  getActionImage(search: AttendanceSearchImage): Observable<any> {
    return this.http.post(this.serverUrl + 'EmployeeDeviceLogMobiles/GetActionImage',search, {responseType: 'text'});
  }

  getStatus(): Observable<any> {
    return this.http.get(this.serverUrl + 'Reports/GetAllStatus');
  }

  reviewSolvedLogs(searchValue: any): Observable<any> {
    return this.http.post(this.serverUrl + 'SolveLogs/ReviewSolveLogs', searchValue);
  }
}
