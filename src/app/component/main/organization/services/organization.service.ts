import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends HttpService {
  protected get baseUrl(): string {
    return 'OrganizationLicenses/';
  }

    getLicenseByOrgId(orgId:any): Observable<any> {
    return this.http.get(this.serverUrl + `OrganizationLicenses/Get/${orgId}`);
  }
  getOrganizatiolicenseScreen(orgId:any): Observable<any> {
    return this.http.get(this.serverUrl + `OrganizationLicenses/GetOrganizatiolicenseScreen/${orgId}`);
  }
  GetOrganizationSetting(orgId:any): Observable<any> {
    return this.http.get(this.serverUrl + `OrganizationLicenses/GetOrganizationSetting/${orgId}`);
  }
  GetAllTimeZones(): Observable<any> {
    return this.http.get(this.serverUrl + 'Organizations/GetTimeZones');
  }
  GetAllPrimaryKey(): Observable<any> {
    return this.http.get(this.serverUrl + 'OrganizationLicenses/GetAllPrimaryKey');
  }
  GetAllADKey(): Observable<any> {
    return this.http.get(this.serverUrl + 'OrganizationLicenses/GetAllADKey');
  }
  GetAllNationalties(): Observable<any> {
    return this.http.get(this.serverUrl + 'Nationalities/GetAll');
  }
  getWeekDays(): Observable<any> {
    return this.http.get(this.serverUrl + 'WeekDays/GetDropdownList');
  }

  getLeaveTypes(): Observable<any> {
    return this.http.get(this.serverUrl + 'LeavesTypes/GetDropdownList');
  }
  getAllFullDayPermissions(): Observable<any> {
    return this.http.get(this.serverUrl + 'FullDayPermissions/GetDropdownList');
  }
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.GetAllPrimaryKey());
    sources.push(this.GetAllADKey());
    sources.push(this.GetAllNationalties());
    sources.push(this.getWeekDays());
    sources.push(this.getLeaveTypes());
    sources.push(this.getAllFullDayPermissions());

    return forkJoin(sources);
  }

  getUploadedDataForLicence(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'Organizations/UploadFile', data);
  }
  getuploadedDataForServer(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'Users/UploadServerLicense', data);
  }

  getuploadedDataForPassword(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'Users/UpdateAdminPassword', data);
  }
  getuploadeddata2(data: any): Observable<any> {
    
    return this.http.post(this.serverUrl + 'Devices/UploadFile', data);
  }
  UpdateSettingOrganization(data: any): Observable<any> {
    return this.http.put(this.serverUrl + 'OrganizationLicenses/UpdateSettingOrganization', data);
  }
  UpdateSettingActualWorking(data: any): Observable<any> {
    return this.http.post(this.serverUrl + 'Organizations/AddSettingActualWorking', data);
  }
  GetSettingActualWorking(orgId:any): Observable<any> {
    return this.http.get(this.serverUrl + `Organizations/GetSettingActualWorking/${orgId}`);
  }
}
