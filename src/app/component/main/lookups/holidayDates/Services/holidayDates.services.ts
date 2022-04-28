import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayDatesService extends HttpService {
  protected get baseUrl(): string {
    return 'HolidayDates/';
  }
  getCountries(): Observable<any> {
    return this.http.get(this.serverUrl + 'Countries/GetAll');
  }
  getHolidaies(): Observable<any> {
    return this.http.get(this.serverUrl + 'Holidays/GetDropdownList');
  }
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getCountries());
    sources.push(this.getHolidaies());
    return forkJoin(sources);
  }
}
