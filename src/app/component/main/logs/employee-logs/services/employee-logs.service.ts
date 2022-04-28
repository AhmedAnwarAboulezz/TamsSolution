import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLogsService extends HttpService {
  protected get baseUrl(): string {
    return 'EmployeeLogs/';
  }

  getLogtypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeLogs/GetLogTypes');
  }
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getLogtypes());
    return forkJoin(sources);
  }
}
