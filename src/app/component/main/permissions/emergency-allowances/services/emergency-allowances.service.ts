import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmergencyAllowancesService extends HttpService {
  protected get baseUrl(): string {
    return 'emergencyallowances/';
  }
  getAllowanceTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'AllowanceTypes/GetDropdownList');
  }
  getEmergencyAllowanceDescriptionType(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmergencyAllowances/GetDropdownList');
  }
  getAdminLeveles(): Observable<any> {
    return this.http.get(this.serverUrl + 'AdministrativeLevels/GetAll');
  }
  getLocations(): Observable<any> {
    return this.http.get(this.serverUrl + 'Locations/GetAll');
  }
  
  
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getAllowanceTypes());
    sources.push(this.getEmergencyAllowanceDescriptionType());
    sources.push(this.getAdminLeveles());
    sources.push(this.getLocations());
    return forkJoin(sources);
  }
}
