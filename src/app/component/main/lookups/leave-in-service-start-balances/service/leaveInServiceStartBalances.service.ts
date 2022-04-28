import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "src/app/services/http/http.service";

@Injectable({
    providedIn: 'root'
  })
export class LeaveInServiceStartBalancesService extends HttpService {
    protected get baseUrl(): string {
      return 'LeaveInServiceStartBalances/';
    }
    
    getLeaveRegulation(): Observable<any> {
      return this.http.get(this.serverUrl +'LeaveRegulations/GetDropdownListWithoutFilterTimesPerService');    
    }
    getLeaveRegulationById(id): Observable<any> {
      return this.http.get(`${this.serverUrl}LeaveRegulations/Get/${id}`);    
    }
    
  }