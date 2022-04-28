import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LateRegulationsService extends HttpService {
  protected get baseUrl(): string {
    return 'LateRegulations/';
  }
  getdeductionGroupTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'DeductionGroupTypes/GetDropdownList');
  }

  getAllContracts(): Observable<any> {
    return this.http.get(this.serverUrl + 'ContractTypes/GetDropdownList');
  }
  getDeductionCategories(): Observable<any> {
    return this.http.get(this.serverUrl + 'DeductionCategories/GetDropdownList');
  }
  getDeductionUnit(): Observable<any> {
    return this.http.get(this.serverUrl + 'DeductionUnits/GetDropdownList');
  }
  getLateRegulationById(LateRegulationId): Observable<any> {
    return this.http.get(this.serverUrl + `LateRegulations/Get/${LateRegulationId}`);

  }
  getLookups(): Observable<any> {
    const sources = [];
    sources.push(this.getdeductionGroupTypes());
    sources.push(this.getAllContracts());
    sources.push(this.getDeductionCategories());
    sources.push(this.getDeductionUnit());
    return forkJoin(sources);
  }
  isExist(model: any){
    return this.http.post(this.serverUrl + 'LateRegulations/IsExist', model);
  }
}
