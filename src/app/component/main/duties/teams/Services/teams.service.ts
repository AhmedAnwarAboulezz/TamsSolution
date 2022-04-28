import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends HttpService {
  protected get baseUrl(): string {
    return 'Teams/';
  }
  getTeamByMainData(teamData): Observable<any>{
    return this.http.post(this.serverUrl + 'Teams/GetByMainData', teamData);
  }
}
