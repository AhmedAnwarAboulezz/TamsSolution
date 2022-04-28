import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsermangmentsService extends HttpService {
  protected get baseUrl(): string {
    return 'usermangments/';
  }
  getGroups(): Observable<any> {
    return this.http.get(this.serverUrl + 'groups/GetDropdownList');
  }
  setUserIsLogedOut(): Observable<any> {
    return this.http.get(this.serverUrl + 'Users/SetUserIsLogedOut');
  }

  getLocations(): Observable<any> {
    return this.http.get(this.serverUrl + 'locations/GetDropdownList');
  }
  getEmployeeImage(): Observable<any> {
    return this.http.get(this.serverUrl + 'employees/GetImage', { responseType: 'text' });
  }
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getGroups());
    sources.push(this.getLocations());
    return forkJoin(sources);
  }
}
