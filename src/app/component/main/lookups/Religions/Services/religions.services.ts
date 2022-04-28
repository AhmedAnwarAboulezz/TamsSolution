import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReligionsService extends HttpService {
  protected get baseUrl(): string {
    return 'Religions/';
  }
  
}
