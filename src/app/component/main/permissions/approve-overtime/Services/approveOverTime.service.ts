import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ApproveOvertimeService extends HttpService {
  protected get baseUrl(): string {
    return 'ApproveOverTimes/';
  }
  GetApproveOverTimeByDescriptionFl(descriptionFl:any): Observable<any> {
    return this.http.get(`${this.serverUrl}ApproveOverTimes/GetByDescriptionFl/${descriptionFl}`);
  }

}
