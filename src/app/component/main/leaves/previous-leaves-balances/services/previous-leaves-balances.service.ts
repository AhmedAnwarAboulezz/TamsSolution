import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreviousLeavesBalancesService extends HttpService {
  protected get baseUrl(): string {
    return 'PreviousLeavesBalances/';
  }

  getLeaveRegulation(employeeIds): Observable<any> {
    
    return this.http.get(this.serverUrl +`LeaveRegulations/GetDropdownListforBalance/${employeeIds}`);
  }
  getLeaveRegulationGrid(): Observable<any> {
    return this.http.get(this.serverUrl +'LeaveRegulations/GetDropdownListWithoutFilter');    
  }
  getLeaveRegulationById(id): Observable<any> {
    return this.http.get(this.serverUrl +`LeaveRegulations/GetLeaveRegulationBalancesById/${id}`);    
  }


  getuploadeddata(data: any): Observable<any> {
    
    return this.http.post(this.serverUrl + 'PreviousLeavesBalances/UploadFile', data);
  }


  SavePreviousLeavesBalancesList(PreviousLeavesBalances: any): Observable<any> {
    return this.http.post(this.serverUrl + 'PreviousLeavesBalances/SaveList', PreviousLeavesBalances);
  }

  postFormData(url: string, fileData:any, item?: any): Observable<any> {
    
    var data: any = new FormData();
    data.append("leaveId", item.leaveId);
    data.append("year", item.year);
    data.append("fileData", fileData);
  
    const httpOption = {
      headers: new HttpHeaders({ reportProgress: 'true', observe: 'events' })
    };
    return this.http.post<any>(this.serverUrl + url, data, httpOption);

  }


  lockYearLeaves2(lockDto: any): Observable<any> {
    return this.http.post(this.serverUrl + 'PreviousLeavesBalances/LockAllLeavesPerYear', lockDto);
  }

  AutoCalcYearLeaves(lockDto: any): Observable<any> {
    return this.http.post(this.serverUrl + 'PreviousLeavesBalances/AutoCalculateAllLeavesPerYear', lockDto);
  }

  AutoCalcPerYearLeaveEmployee(lockDto: any): Observable<any> {
    return this.http.post(this.serverUrl + 'PreviousLeavesBalances/AutoCalculatePerLeaveAndEmployee', lockDto);
  }

  RemoveCalcPerYear(lockDto: any): Observable<any> {
    return this.http.post(this.serverUrl + 'PreviousLeavesBalances/DeleteCalculatedBalancePerYear', lockDto);
  }
}
