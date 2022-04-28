import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from '../models/tree';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  constructor(public httpService: HttpService, public http: HttpClient, public storageService: StorageService) { }

  getTreeNodes(): string {
    return this.storageService.get('TheTree');
  }
  getTreeExpand(expandDto: any): Observable<any> {
    let url = 'AdministrativeLevels/GetTree';
    return this.http.post<TreeNode[]>(this.httpService.serverUrl + url, expandDto);
  }
  loadtree(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.httpService.serverUrl + 'AdministrativeLevels/GetTree');
  }
  loadfulltree(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(this.httpService.serverUrl + 'AdministrativeLevels/GetFullTree');
  }
}
