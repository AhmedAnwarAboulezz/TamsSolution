import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeePenaltiesService extends HttpService {
  protected get baseUrl(): string {
    return 'EmployeePenalties/';
  }
  getPenaltiesTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'PenaltiesTypes/GetDropdownList');
  }
}
