import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RotatedDutiesService extends HttpService {
  protected get baseUrl(): string {
    return 'RotatedDuties/';
  }
  isExist(model: any){
    return this.http.post(this.serverUrl + 'RotatedDuties/IsExist', model);
  }
}
