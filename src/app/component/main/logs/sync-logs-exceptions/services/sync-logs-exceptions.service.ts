import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SyncLogsExceptionsService  extends HttpService {
  protected get baseUrl(): string {
    return 'SyncLogsExceptions/';
  }
  getSyncLogsExceptionTypes() :Observable<any> {
    return this.http.get(this.serverUrl + 'SyncLogsExceptions/GetSyncLogsExceptionTypes');
  }
  getTriggerTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'BreakSettings/GetTriggerTypes');
  }
  getLokkups(): Observable<any>{
    const sources = [];
    sources.push(this.getSyncLogsExceptionTypes());     
     sources.push(this.getTriggerTypes());
    return forkJoin(sources);
  }
}
