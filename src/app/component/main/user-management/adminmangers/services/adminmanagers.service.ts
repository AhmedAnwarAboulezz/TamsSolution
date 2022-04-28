import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminmanagersService extends  HttpService {
  protected get baseUrl(): string {
    return 'AdminMangers/';
  }


  getAdminManagerById(id:any): Observable<any> {
    return this.http.get(this.serverUrl + `AdminMangers/Get/${id}`);

  }
  addadminmanger(adminmanger:any): Observable<any> {
    return this.http.post(this.serverUrl + 'AdminMangers/Add', adminmanger);

  }
  editadminmanger(adminmanger:any): Observable<any> {
    return this.http.put(this.serverUrl + 'AdminMangers/Update', adminmanger);
  }
 deleteAdminManager(id:any): Observable<any> {
    return this.http.delete(this.serverUrl + `AdminMangers/Delete/${id}`);
  }

  getCurrentAdminmanger(adminId:any): Observable<any> {
    return this.http.get(this.serverUrl + `AdminMangers/GetCurrentAdminManager/${adminId}`);

  }

}
