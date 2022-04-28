import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkFlowService extends HttpService {
  protected get baseUrl(): string {
    return 'WorkflowTemplate/';
  }

  getManagerCodes(): Observable<any> {
    return this.http.get(this.serverUrl + 'MangerCode/GetDropDownList');
  }
  getRequestTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'RequestType/GetAllAuthorized');
  }
  getLeaveTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'LeavesTypes/GetDropdownList');
  }
  getPermissions(): Observable<any> {
    //return this.http.get(this.serverUrl + 'PartialPermissionTypes/GetDropdownListMobile');
    return this.http.get(this.serverUrl + 'PartialPermissionTypes/GetDropdownList');

  }
  getFullDayPermission(): Observable<any> {
    return this.http.get(this.serverUrl + 'FullDayPermissions/GetDropdownList');

  }
  getOvertimes(): Observable<any> {
    return this.http.get(this.serverUrl + 'OverTimeOrders/GetAllDropdown');
  }
  addDetails(data): Observable<any> {
    return this.http.post(this.serverUrl + 'WorkflowTemplate/AddDetails', data);
  }
  getWeekDays(): Observable<any> {
    return this.http.get(this.serverUrl + 'WeekDays/GetDropdownList');
  }
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getManagerCodes());
    sources.push(this.getRequestTypes());
    sources.push(this.getLeaveTypes());
    sources.push(this.getPermissions());
    sources.push(this.getOvertimes());
    sources.push(this.getFullDayPermission());

    

    return forkJoin(sources);
  }

  getWorkFlowByName(nameFl:any): Observable<any> {
    return this.http.get(`${this.serverUrl}WorkflowTemplate/GetByName/${nameFl}`);
  }
}