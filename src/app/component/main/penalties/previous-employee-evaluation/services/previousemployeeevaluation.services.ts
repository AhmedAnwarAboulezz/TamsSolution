import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PreviousEmployeeEvaluationService extends HttpService {
  protected get baseUrl(): string {
    return 'EmployeeEvaluations/';
  }
  getAllGrades(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeEvaluations/GetAllGrades');
  }

  getuploadeddata(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'EmployeeEvaluations/UploadFile', data);
  }
  SaveEmployeeEvaluationsList(employeeLogs: any): Observable<any> {
    return this.http.post(this.serverUrl + 'EmployeeEvaluations/AddList', employeeLogs);
  }
}
