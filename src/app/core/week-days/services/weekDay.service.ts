import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeekDayService extends HttpService {
  protected get baseUrl(): string {
    return 'WeekDays/';
  }
  getWeekEnds(): Observable<any> {
    return this.http.get(this.serverUrl + 'WeekDays/GetAll');
  }

}
