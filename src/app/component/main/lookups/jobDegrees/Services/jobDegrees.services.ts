import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class JobDegreesService extends HttpService {
  protected get baseUrl(): string {
    return 'JobDegrees/';
  }
}
