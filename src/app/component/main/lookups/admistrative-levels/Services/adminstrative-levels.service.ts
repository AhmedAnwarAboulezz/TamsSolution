import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminstrativeLevelsService extends HttpService {
  protected get baseUrl(): string {
    return 'AdministrativeLevels/';
  }

 
}
