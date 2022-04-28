import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LockleavesService extends HttpService {
  protected get baseUrl(): string {
    return 'Locations/';
  }
  getUsers(): Observable<any> {
    return this.http.get(this.serverUrl + 'Users/GetAllUserDropDown');
  }
}
