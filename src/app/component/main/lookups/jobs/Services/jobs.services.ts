import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService extends HttpService {
  protected get baseUrl(): string {
    return 'Jobs/';
  }
}
