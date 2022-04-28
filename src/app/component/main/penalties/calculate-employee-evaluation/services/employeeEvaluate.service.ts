import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEvaluateService extends HttpService {
  protected get baseUrl(): string {
    return 'EmployeeEvaluations/';
  }

  getEmployeeEvaluations(id): Observable<any> {
    return this.http.get(this.serverUrl + `EmployeeEvaluations/GetCalculateEvaluation/${id}`);
  }
  SetAllSearchResultIntoGrid(searchValue: any): Observable<any> {
    return this.http.post(this.serverUrl + 'EmployeeEvaluations/SetAllSearchResultIntoGrid', searchValue);
  } 
  UpdateEmployeeCalculateEvaluation(employeeEvaluation: any): Observable<any> {
    return this.http.post(this.serverUrl + 'EmployeeEvaluations/UpdateEmployeeCalculateEvaluation', employeeEvaluation);
  } 

  getAllGrades(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeEvaluations/GetAllGrades');
  }
  getAllPreviousEmployeeEvaluation(employeeId, year): Observable<any> {
    return this.http.get(this.serverUrl + `EmployeeEvaluations/GetAllPreviousEmployeeEvaluation/${employeeId}/${year}`);
  }
}
