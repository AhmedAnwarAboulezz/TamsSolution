import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { AttendanceSearchImage } from "src/app/models/attendanceSearch";
import { HttpService } from "src/app/services/http/http.service";

@Injectable({
    providedIn: 'root'
  })
  export class ReviewLogsService extends HttpService {
    protected get baseUrl(): string {
      return 'EmployeeDeviceLogMobiles/';
    }
    getLogtypes(): Observable<any> {
      return this.http.get(this.serverUrl + 'EmployeeLogs/GetLogTypes');
    }
    getLookup(): Observable<any> {
      const sources = [];
      sources.push(this.getLogtypes());     
       sources.push(this.getRemark());
      return forkJoin(sources);
    }
    getActionImageMobile(search: AttendanceSearchImage): Observable<any> {
      return this.http.post(this.serverUrl + 'EmployeeDeviceLogMobiles/GetActionImageMobile',search, {responseType: 'text'});
    }
    getEmployeeImage(employeeId: any): Observable<any> {
      return this.http.get(this.serverUrl + `Employees/GetImageWithEmployeeId/${employeeId}`, {responseType: 'text'});
    }
    getRemark(): Observable<any> {
      return this.http.get(this.serverUrl + 'EmployeeLogs/GetDropdownList');
    }


    ApproveLogReview(approveLogReview: any): Observable<any> {
      return this.http.post(this.serverUrl + 'EmployeeDeviceLogMobiles/ApproveLogReview',approveLogReview, {responseType: 'text'});
    }
}