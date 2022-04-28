import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService extends HttpService {
  protected get baseUrl(): string {
    return 'Countries/';
  }

  getLookup(): Observable<any> {
     return this.http.get(this.serverUrl + 'Countries/GetAll');
  }
}
