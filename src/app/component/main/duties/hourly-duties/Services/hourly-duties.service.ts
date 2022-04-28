import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class HourlyDutiesService extends HttpService {
  protected get baseUrl(): string {
    return 'HoursRotateds/';
  }
  isExist(model: any){
    return this.http.post(this.serverUrl + 'HoursRotateds/IsExist', model);
  }
}
