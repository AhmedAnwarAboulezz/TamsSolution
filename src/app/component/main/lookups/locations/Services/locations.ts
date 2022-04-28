import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService extends HttpService {
  protected get baseUrl(): string {
    return 'Locations/';
  }
  getLookup(): Observable<any> {
    return this.http.get(this.serverUrl + 'Countries/GetAll');
 }

 getLocationProof(locationId : any): Observable<any> {
  return this.http.get(this.serverUrl + `Locations/GetProof/${locationId}`);
}


 

 AddLocationProof(data): Observable<any> {
  return this.http.post(this.serverUrl + 'Locations/AddLocationProof', data);
}
}
