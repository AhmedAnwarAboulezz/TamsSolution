import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationSettingServices extends HttpService {
  protected get baseUrl(): string {
    return 'EvaluationSettings/';
  }

  UpdateEvaluationSetting(data: any): Observable<any> {
    return this.http.put(this.serverUrl + 'EvaluationSettings/UpdateEvaluationSetting', data);
  }
  UpdateEmployeeEvaluationSetting(data: any): Observable<any> {
    return this.http.put(this.serverUrl + 'EvaluationSettings/UpdateEmployeeEvaluationSetting', data);
  }
  GetEvaluationSetting(orgId :any): Observable<any> {
    return this.http.get(this.serverUrl + `EvaluationSettings/GetEvaluationSetting/${orgId}`);
  }
  GetEmployeeEvaluationSetting(orgId :any): Observable<any> {
    return this.http.get(this.serverUrl + `EvaluationSettings/GetEmployeeEvaluationSetting/${orgId}`);
  }
}
