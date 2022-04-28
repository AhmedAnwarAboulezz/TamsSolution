import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveRegulationsService extends HttpService {
  protected get baseUrl(): string {
    return 'LeaveRegulations/';
  }
  getCountries(): Observable<any> {
    return this.http.get(this.serverUrl + 'Countries/GetAll');
  }
  getLeaveTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'LeavesTypes/GetDropdownList');
  }
  getGenders() {
    return this.http.get(this.serverUrl + 'genders/GetAll');
  }
  getReligions(): Observable<any> {
    return this.http.get(this.serverUrl + 'religions/GetAll');
  }
  getAttachments() {
    return this.http.get(this.serverUrl + 'AttachmentsTypes/GetAll');
  }

  getBalanceWays(): Observable<any> {
    return this.http.get(this.serverUrl + 'LeaveRegulations/GetDropdownListForBalanceWay');
  }
  getGridLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getCountries());
    sources.push(this.getLeaveTypes());
    return forkJoin(sources);
  }
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getCountries());
    sources.push(this.getLeaveTypes());
    sources.push(this.getGenders());
    sources.push(this.getReligions());
    sources.push(this.getAttachments());
    return forkJoin(sources);
  }

  isExist(model: any){
    return this.http.post(this.serverUrl + 'LeaveRegulations/IsExist', model);
  }
}
