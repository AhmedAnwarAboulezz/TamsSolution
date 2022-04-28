import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportFilterService extends HttpService {
  protected get baseUrl(): string {
    return 'CrystalReports/';
  }

  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getLocations());
    sources.push(this.getJobs());
    sources.push(this.getContracts());
    sources.push(this.getQualifications());
    sources.push(this.getDutyTypes());
    sources.push(this.getServiceStatus());
    sources.push(this.getStatus());
    sources.push(this.getLeaveTypes());
    sources.push(this.getPartialPermissionTypes());
    sources.push(this.getFullDayPermissions());
    sources.push(this.getAllowanceType());
    sources.push(this.GetAllNationalties());
    sources.push(this.getLogTypes());
    sources.push(this.getDevices());

    
    return forkJoin(sources);
  }
  GetAllNationalties(): Observable<any> {
    return this.http.get(this.serverUrl + 'Nationalities/GetAll');
  }

  getLocations(): Observable<any> {
    return this.http.get(this.serverUrl + 'Locations/GetAll');
  }
  getJobs(): Observable<any> {
    return this.http.get(this.serverUrl + 'Jobs/GetAll');
  }
  getDutyTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'DutyTypes/GetAll');
  }
  getContracts(): Observable<any> {
    return this.http.get(this.serverUrl + 'ContractTypes/GetAll');
  }
  getQualifications(): Observable<any> {
    return this.http.get(this.serverUrl + 'Qualifications/GetAll');
  }
  getDuties(dutyTypeId): Observable<any> {
    return this.http.get(this.serverUrl + `DutyTypes/GetAllDutiesByTypeId/${dutyTypeId}`);
  }
  getServiceStatus(): Observable<any> {
    return this.http.get(this.serverUrl + 'ServiceStatuses/GetDropdownList');
  }
  getStatus(): Observable<any> {
    return this.http.get(this.serverUrl + 'Reports/GetAllStatus');
  }
  getLeaveTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'LeavesTypes/GetDropdownList');
  }
  getLogTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'EmployeeLogs/GetLogTypes');
  }
  getDevices(): Observable<any> {
    return this.http.get(this.serverUrl + 'Devices/GetAll');
  }
  
  getPartialPermissionTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'PartialPermissionTypes/GetDropdownList');
  }
  getFullDayPermissions(): Observable<any> {
    return this.http.get(this.serverUrl + 'FullDayPermissions/GetDropdownList');
  }
  getAllowanceType(): Observable<any> {
    return this.http.get(this.serverUrl + 'AllowanceTypes/GetAll');
  }

  downLoadFile(data: any, type: string, fileExtension: string, reportName: string) {
    let blob = new Blob([data], { type });      
    if(fileExtension !== 'pdf')
    {
      //download file with name
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl;
      a.download = reportName+'.'+fileExtension;
      a.click();
      URL.revokeObjectURL(objectUrl);
    }
    else
    {
      //open new tab
      let blob = new Blob([data], { type });
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') 
      {
        alert('Please disable your Pop-up blocker and try again.');
      }
    }
  }
  generateReport(action, reportFilter): Observable<any> {
    return this.http.post(`${this.serverUrl}${this.baseUrl}${action}`, reportFilter,
      { responseType: 'arraybuffer' }
    );
  }
}
