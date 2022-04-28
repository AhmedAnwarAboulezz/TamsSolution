import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends HttpService {
  protected get baseUrl(): string {
    return 'Employees/';
  }
  getGridLookup(): Observable<any> {
    const sources = [];   
    sources.push(this.getGenders());
    sources.push(this.getServiceStatus());
    sources.push(this.getLocations());
    sources.push(this.getJobs());
    sources.push(this.getJobDegrees());
    sources.push(this.getContractTypes());
    

    
    return forkJoin(sources);
  }
  getLookup(): Observable<any> {
    const sources = [];   
    sources.push(this.getServiceStatus());
    sources.push(this.getNationalities());
    sources.push(this.getReligions());
    sources.push(this.getGenders());
    sources.push(this.getMartialStatus());
    sources.push(this.getQualifications());
    return forkJoin(sources);
  }
  getServiceStatus(): Observable<any> {
    return this.http.get(this.serverUrl + 'ServiceStatuses/GetDropdownList');
  }
  getNationalities(): Observable<any> {
    return this.http.get(this.serverUrl + 'Nationalities/GetDropdownList');
  }
  getReligions(): Observable<any> {
    return this.http.get(this.serverUrl + 'Religions/GetDropdownList');
  }
  getGenders(): Observable<any> {
    return this.http.get(this.serverUrl + 'Genders/GetDropdownList');
  }
  getMartialStatus(): Observable<any> {
    return this.http.get(this.serverUrl + 'MartialStatus/GetDropdownList');
  }
  getQualifications(): Observable<any> {
    return this.http.get(this.serverUrl + 'Qualifications/GetDropdownList');
  }
  getEmployee(id: any): Observable<any> {
    return this.http.get(this.serverUrl + `Employees/Get/${id}`);
  }
  getEmployeeByName(nameFl:any): Observable<any> {
    return this.http.get(`${this.serverUrl}Employees/GetByName/${nameFl}`);
  }

  getEmployeeImage(employeeId: any): Observable<any> {
    return this.http.get(this.serverUrl + `Employees/GetImageWithEmployeeId/${employeeId}`, {responseType: 'text'});
  }
  





  getLocations() {
    return this.http.get(this.serverUrl + 'locations/GetDropdownList');
  }

  getContractTypes() {
    return this.http.get(this.serverUrl + 'contractTypes/GetDropdownList');
  }

  getJobs() {
    return this.http.get(this.serverUrl + 'jobs/GetDropdownList');
  }

  getJobDegrees() {
    return this.http.get(this.serverUrl + 'jobDegrees/GetDropdownList');
  }



  isExist(model: any){
    return this.http.post(this.serverUrl + 'Employees/IsExist', model);

  }
}
