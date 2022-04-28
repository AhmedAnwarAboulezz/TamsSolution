import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService extends HttpService {
  protected get baseUrl(): string {
    return '';
  }


getCurrentAddress(lnglat: any): Observable<any> {
  return this.http.post(this.serverUrl + 'Locations/GetLocationAddress', lnglat);
}

}
