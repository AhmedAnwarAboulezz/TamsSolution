import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';
import { getuid } from 'process';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeavesService extends HttpService {
  protected get baseUrl(): string {
    return 'EmployeeLeaves/';
  }
  
  getLeaveRegulation(): Observable<any> {
    return this.http.get(this.serverUrl +'LeaveRegulations/GetDropdownListWithoutFilter');    
  }
  getLeaveRegulationByEmpId(employeeId): Observable<any> {
    return this.http.get(`${this.serverUrl}LeaveRegulations/GetDropdownList/${employeeId}`);    
  }
  getSalaryLeave(): Observable<any> {
    return this.http.get(this.serverUrl + 'SalaryLeaves/GetDropdownList');
  }


  getAvailableBalance(leaveRegulationId, employeeId, id, leaveStartDate,leaveEndDate): Observable<any> {
    if(id == null){
      id = "00000000-0000-0000-0000-000000000000";
    }
    return this.http.post(`${this.serverUrl}EmployeeLeaves/GetAvailableBalance`, { leaveRegulationId, employeeId, id, leaveStartDate, leaveEndDate})

    // if(id == null){
    //   id = "00000000-0000-0000-0000-000000000000";
    // }
    // return this.http.get(`${this.serverUrl}EmployeeLeaves/GetAvailableBalance/${leaveRegulationId}/${employeeId}/${id}`);
  }

  getActualDays(employeeId, leaveRegulationId, startDate, endDate): Observable<any> {
    return this.http.post(`${this.serverUrl}EmployeeLeaves/GetActualDays`, { employeeId, leaveRegulationId, startDate, endDate })
  }
}
