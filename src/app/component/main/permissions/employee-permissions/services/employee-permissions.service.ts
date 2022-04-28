import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeePermissionsService extends HttpService {
  protected get baseUrl(): string {
    return 'EmployeePermissions/';
  }
  getPartialPermissionTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'PartialPermissionTypes/GetDropdownList');
  }
  getPermissionTimes(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeePermissions/GetPermissionTimes');
  }

  getPermissionBalance(permissionBalanceParam): Observable<any>{
    return this.http.post(this.serverUrl + 'EmployeePermissions/GetPermissionBalance', permissionBalanceParam);
  }

  getEmployeeDutyTime(dutyTimeEmployee): Observable<any>{
    return this.http.post(this.serverUrl + 'EmployeeDuties/GetDutyTime', dutyTimeEmployee);
  }

  getEmployeeLogs(dayTimeEmployee): Observable<any>{
    
    return this.http.post(this.serverUrl + 'EmployeeAttedanceLogs/GetEmployeeLogs', dayTimeEmployee);
  }

  getPartialPermissionsByEmpId(employeeId): Observable<any> {
    return this.http.get(`${this.serverUrl}PartialPermissionTypes/GetDropdownListForEmployee/${employeeId}`);    
  }


  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getPartialPermissionTypes());
    sources.push(this.getPermissionTimes());

    return forkJoin(sources);
  }

  

  
}
