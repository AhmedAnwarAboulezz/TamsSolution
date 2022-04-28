import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsencesregulationsService  extends HttpService{
  protected get baseUrl(): string {
    return 'AbsencesRegulations/';
  }
  getAbsencsregulationById(AbsencsregulationId): Observable<any> {
    return this.http.get(this.serverUrl + `Absencesregulations/Get/${AbsencsregulationId}`);

  }
}
