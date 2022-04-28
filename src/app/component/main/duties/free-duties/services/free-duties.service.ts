import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreeDutiesService extends HttpService {
  protected get baseUrl(): string {
    return 'FixedDuties/';
  }
  getLookup(): Observable<any> {
      return this.http.get(this.serverUrl + 'DutyTypes/GetDropdownList');
  }
  isExist(model: any){
    return this.http.post(this.serverUrl + 'FixedDuties/IsExist', model);
  }
  getDutyByMainData(dutyData): Observable<any>{
    return this.http.post(this.serverUrl + 'FixedDuties/GetByMainData', dutyData);
  }
}



