import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLogAuditService extends HttpService {
  protected get baseUrl(): string {
    return 'SolveLogs/';
  }
  getUsers(): Observable<any> {
      return this.http.get(this.serverUrl + 'Users/GetAllUserDropDownWithDeletedData');
  }

  getAuditDetails(solveAuditId : any): Observable<any> {
    return this.http.get(this.serverUrl + `SolveLogs/GetDetailsById/${solveAuditId}`);
  }

  getLogtypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeLogs/GetLogTypes');
  }

}
