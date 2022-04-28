import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';
import { ReportFilter } from 'src/app/models/report-filter';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends HttpService {
  protected get baseUrl(): string {
    return 'Reports_CrystalReports/';
  }

  GetDashboardTotal(): Observable<any> {
    return this.http.get(this.serverUrl + 'Reports/GetDashboardCounts');
  }

  GetEmployeesTotalPermissionsForToday(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeePermissions/GetEmployeesTotalPermissionsForToday');
  }
  GetEmployeesLeavesForToday(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeLeaves/GetEmployeesLeavesForToday');
  }
  GetEmployeeFullDayPermissionForToday(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeFullDayPermissions/GetEmployeeFullDayPermissionForToday');
  }
  GetEmployeesAllowancesForToday(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeAllowances/GetEmployeesAllowancesForToday');
  }
  GetEmployeeDutyForToday(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeDuties/GetEmployeeDutyForToday');
  }
  GetEmployeeShiftForToday(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeDuties/GetEmployeeShiftForToday');
  }
  GetPublicHolidaysCalender(): Observable<any> {
    return this.http.get(this.serverUrl + 'HolidayDates/GetHolidayDatesCalender');
  }

  GetAdminstrativeWithOutManger(): Observable<any> {
    return this.http.get(this.serverUrl + 'AdminMangers/AdminstrativeWithOutManger');
  }
  GetInCompletDateforEmployee(): Observable<any> {
    return this.http.get(this.serverUrl + 'Employees/InCompletDateforEmployee');
  }
  GetEmployeeTemporaryAdminstrationExpire(): Observable<any> {
    return this.http.get(this.serverUrl + 'Employees/EmployeeTemporaryAdminstrationExpire');
  }
  GetEmployeeExpire(): Observable<any> {
    return this.http.get(this.serverUrl + 'Employees/EmployeeExpire');
  }
  GetEmployeeFullDayExpire(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeFullDayPermissions/EmployeeFullDayExpire');
  }


  IsLoginFromOtherDeviceRequest(): Observable<any> {
    return this.http.get(this.serverUrl + 'Users/IsLoginFromOtherDeviceRequest');
  }


  getCardsData(): Observable<any> {
    const sources = [];
    sources.push(this.GetDashboardTotal());
    sources.push(this.GetEmployeesTotalPermissionsForToday());
    sources.push("9");
    sources.push("5");
    return forkJoin(sources);
  }
  
  getEmployeeData(): Observable<any> {
    const sources = [];
    sources.push(this.GetInCompletDateforEmployee());
    sources.push(this.GetEmployeeTemporaryAdminstrationExpire());
    sources.push(this.GetAdminstrativeWithOutManger());
    sources.push(this.GetEmployeeExpire());
    sources.push(this.GetEmployeeFullDayExpire());
    
    
    return forkJoin(sources);
  }
  
  

}
