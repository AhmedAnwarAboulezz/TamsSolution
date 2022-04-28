import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDutiesService extends HttpService {
  protected get baseUrl(): string {
    return 'EmployeeDuties/';
  }
  getDutyTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'DutyTypes/GetDropdownList');
 }
 getDutyTypesFixed(): Observable<any> {
  return this.http.get(this.serverUrl + 'FixedDuties/GetAllFixedDutyPeriod');
}
 getAllDutiesById(DutyId): Observable<any> {
   return this.http.get(this.serverUrl + `DutyTypes/GetAllDutiesByTypeId/${DutyId}`);
 }

 getAllDuties(): Observable<any> {
  return this.http.get(this.serverUrl + 'DutyTypes/GetAllDutiesDropdownList');
}

getLookup(): Observable<any> {
  const sources = [];
  sources.push(this.getDutyTypes());
  sources.push(this.getAllDuties());
  return forkJoin(sources);
}


}
