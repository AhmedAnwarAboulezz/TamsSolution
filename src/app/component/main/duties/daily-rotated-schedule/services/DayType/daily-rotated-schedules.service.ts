import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyRotatedSchedulesService extends HttpService {
  protected get baseUrl(): string {
    return 'DailyRotatedSchedules/';
  }

  getDayTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'DayTypes/GetAll');
  }

  getRotatedDuties(): Observable<any> {
    return this.http.get(this.serverUrl + 'RotatedDuties/GetAll');
  }

  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getDayTypes());
    sources.push(this.getRotatedDuties());
    return forkJoin(sources);
  }

  apply(data): Observable<any> {
    return this.http.post(this.serverUrl + 'DailyRotatedSchedules/Apply', data);
  }
  isExist(model: any){
    return this.http.post(this.serverUrl + 'DailyRotatedSchedules/IsExist', model);
  }
}
