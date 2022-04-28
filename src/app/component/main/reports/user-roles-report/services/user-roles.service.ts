import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService extends HttpService {
  protected get baseUrl(): string {
    return 'Audits/';
  }
  getUsers(): Observable<any> {
    return this.http.get(this.serverUrl + 'Users/GetAllUserDropDown');
  }
  getScreens(): Observable<any> {
    return this.http.get(this.serverUrl + 'ScreenGroupsAuthorities/GetScreensDropDown');
  }
 
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getUsers());
    sources.push(this.getScreens());
    return forkJoin(sources);
  }

  getReport(searchInput): Observable<any> {
    return this.http.post(this.serverUrl + 'CrystalReports/GetUserRolesReport', searchInput, { responseType: 'arraybuffer' });
  }
  // downLoadFile(data: any, type: string) {
  //   let blob = new Blob([data], { type });
  //   let url = window.URL.createObjectURL(blob);
  //   let pwa = window.open(url);
  //   if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
  //     alert('Please disable your Pop-up blocker and try again.');
  //   }
  // }

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



}
