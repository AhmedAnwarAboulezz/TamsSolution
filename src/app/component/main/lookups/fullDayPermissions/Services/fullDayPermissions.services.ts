import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullDayPermissionsService extends HttpService {
  protected get baseUrl(): string {
    return 'FullDayPermissions/';
  }
  
}
