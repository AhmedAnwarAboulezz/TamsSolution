import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadFilesService extends HttpService {
  protected get baseUrl(): string {
    return '';
  }

  downloadfile(filename, serviceName): Observable<any> {
    if (serviceName == "Permissions") {
      return this.http.get(this.serverUrl + `EmployeeAllowances/DownLoadFile/${filename}`, {
        responseType: 'arraybuffer'
      });
    }
    else if (serviceName == "Leaves") {
      return this.http.get(this.serverUrl + `EmployeeLeaves/DownLoadFile/${filename}`, {
        responseType: 'arraybuffer'
      });
    }

  }


}
