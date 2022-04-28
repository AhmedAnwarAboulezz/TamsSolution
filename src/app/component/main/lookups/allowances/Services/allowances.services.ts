import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllowancesService extends HttpService {
  protected get baseUrl(): string {
    return 'Allowances/';
  }

  getAllowanceType(): Observable<any> {
    return this.http.get(this.serverUrl + 'AllowanceTypes/GetAll');
  }
  getAllowanceByName(nameFl:any): Observable<any> {
    return this.http.get(`${this.serverUrl}Allowances/GetByName/${nameFl}`);
  }
  getAllowanceCanReplace(allowanceId, allowanceTypeId, allowanceSettingId): Observable<any> {
    return this.http.get(`${this.serverUrl}Allowances/GetAllowancesForReplacement`, {
      params: { allowanceId, allowanceTypeId, allowanceSettingId }
    });
  }
}
