import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationOvertimeRegulationsService extends HttpService {

  protected get baseUrl(): string {
    return 'OrganizationOvertimeRegulations/';
  }
  getTerminalIp(): Observable<any> {
    return this.http.get(this.serverUrl + 'Devices/GetAll');
  }
}
