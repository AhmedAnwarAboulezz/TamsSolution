import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService  extends HttpService{
  protected get baseUrl(): string {
    return 'Devices/';
  }
   getuploadeddata(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'Devices/UploadFile', data);
  }
  SaveDevicesList(devices: any): Observable<any> {
    return this.http.post(this.serverUrl + 'Devices/AddList', devices);
  }

}
