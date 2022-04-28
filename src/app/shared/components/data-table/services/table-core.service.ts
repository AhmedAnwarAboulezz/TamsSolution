import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { LoadOpts } from '../models/LoadOpts';
import { AlertService } from 'src/app/services/AlertService';
import { Shell } from 'src/app/component/shell';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { AttendanceSearch } from 'src/app/models/attendanceSearch';

@Injectable({
  providedIn: 'root'
})
export class TableCoreService {
  public pageOptions: LoadOpts = {
    count: -1,
    offset: 1,
    limit: 10,
    sortDirection: 'ascending',
    sortField: 'id'

  };

  public search: string;
  public filter: any = {};
  public filterType: any = {};
  public searchNew: {};
  public searchNew$: BehaviorSubject<{}> = new BehaviorSubject({});

  public tableData: any[] = [];
  public exportTableData: any[] = [];

  get alertService(): AlertService { return Shell.Injector.get(AlertService); }
  constructor(
    private http: HttpService,
    public localize: LocalizationService
  ) { }

  /**
   * Get The Grid data from a givin link to the endpoint
   */
  getAllData(url: string, searchValues?: any): Observable<any> {
    this.tableData = [];
    const options = {
      limit: this.pageOptions.limit,
      offset: this.pageOptions.offset == 0 ? 1 : this.pageOptions.offset,
      sortDirection: this.pageOptions.sortDirection,
      sortField: this.pageOptions.sortField
    };

    let newFilter = {
      filteringDto: this.filter,
      searchValues
    };

    return this.http.postQueryParamsReq(url, searchValues ? newFilter : this.filter, options).pipe(
      take(1),
      map((resp: any) => {
        this.tableData = resp.list;
        this.pageOptions.count = resp.count;
        this.pageOptions.offset = options.offset + 1;
        this.pageOptions = { ...this.pageOptions };
      })
    );

  }

  reRenderTable(url: string, searchValues?: any): void {
    this.tableData = [];
    this.getAllData(url, searchValues)
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
        this.alertService.showSuccess(this.localize.translate.instant('Message.DeleteSuccess'));
        --this.pageOptions.offset;
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

  exportAllData(url: string): Observable<any> {
    let options2 = {
      limit: 1,
      offset: 0,
      sortDirection: this.pageOptions.sortDirection,
      sortField: this.pageOptions.sortField
    };
    return this.http.postQueryParamsReq(url, this.filter, options2);

  }

  /**
   * Export the table content
   */
  exportTable(url: string, selectedColumns: string[]): Observable<any> {
    return this.http
      .postReq(url, {
        visableColumns: selectedColumns,
        search: this.searchNew$.value
      })
      .pipe(
        take(1),
        map((resp: any) => {
          if (!resp.success) {
            return;
          }
          window.location.href = 'http://' + resp.data;
        })
      );
  }

}
