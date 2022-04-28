import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor(private http: HttpService) {}

  getData(url: string, option: any): Observable<any> {
    return this.http.customPostReq(url, option);
  }
}
