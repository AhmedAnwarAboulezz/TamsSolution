import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/AlertService';
import { HttpService } from 'src/app/services/http/http.service';
import { LoadOpts } from '../../data-table/models/LoadOpts';
import { Shell } from 'src/app/component/shell';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Injectable({
  providedIn: 'root'
})
export class TableCoreDetailService {

  public pageDetailOptions: LoadOpts = {
    count: -1,
    offset: 1,
    limit: 50,
    sortDirection: 'ascending',
    sortField: 'id'

  };

  public tableDetailData: any[] = [];
  get alertDetailService(): AlertService { return Shell.Injector.get(AlertService); }
  constructor(private http: HttpService,
              public localizeDetail: LocalizationService) { }

  /**
   * Get The Grid data from a givin link to the endpoint
   */
  getAllData(url: string): Observable<any> {
    this.tableDetailData = [];
    const options = {
      limit: this.pageDetailOptions.limit,
      offset: this.pageDetailOptions.offset == 0 ? 1 : this.pageDetailOptions.offset,
      sortDirection: this.pageDetailOptions.sortDirection,
      sortField: this.pageDetailOptions.sortField
    };
    return this.http.postReq(url, options).pipe(
      take(1),
      map((resp: any) => {
        this.tableDetailData = resp.list;
        this.pageDetailOptions.count = resp.count;
        // i think this cause the error of paging so i have to decrase it by 1 in base edit component
        this.pageDetailOptions.offset = options.offset + 1;
        this.pageDetailOptions = { ...this.pageDetailOptions };

      })
    );
  }

  reRenderTable(url: string): void {
    this.tableDetailData = [];
    this.getAllData(url)
      .pipe(take(1))
      .subscribe(() => { });
  }

  /**
   * Delete Single Item with given URL and Item ID
   */
  deleteItem(url: string, id: string): Observable<any> {
    return this.http.deleteReq(url, id).pipe(
      take(1),
      map(() => {
        this.alertDetailService.showSuccess(this.localizeDetail.translate.instant('Message.DeleteSuccess'));
        --this.pageDetailOptions.offset;
      })
    );
  }

  /**
   * Delete Selected Items with given URL and Items IDs
   */
  deleteSelectedItems(url: string, ids: number[]): Observable<any> {
    return this.http.putReq(url, ids).pipe(
      take(1),
      map((resp: any) => {
        if (!resp.success) { return; }
      })
    );
  }
}
