import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportExcelService extends HttpService {
  protected get baseUrl(): string {
    return 'EmployeeLogSheets/';
  }

  getuploadeddata(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'EmployeeLogSheets/UploadFile', data);
  }
  SaveEmployeeLogList(employeeLogs: any): Observable<any> {
    return this.http.post(this.serverUrl + 'EmployeeLogSheets/AddList', employeeLogs);
  }
}
