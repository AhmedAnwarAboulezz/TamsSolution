import {
  Component, OnInit, Input,
  OnDestroy, Output, ViewEncapsulation, ViewChild
} from '@angular/core';
import { TableUrlInterface } from './models/table-url.interface';
import { ColumnsInterface } from './models/columns.interface';
import { ActionsInterface } from './models/actions.interface';
import { TableOptionsInterface } from './models/options.interface';
import { TableCoreService } from './services/table-core.service';
import { take, debounceTime, takeUntil } from 'rxjs/operators';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { MatDialog, MatDatepicker } from '@angular/material';
import { DeleteDialogComponent } from './components/Delete-dialog.component';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ExcelService } from './services/excel.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { fedra } from './font';
import { img } from './img';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/AlertService';
import { Shell } from 'src/app/component/shell';
import { DownloadFilesService } from '../downloadfile/service/DownloadFiles.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { TreeNode } from '../tree/models/tree';
import { ShowTreeComponent } from 'src/app/component/main/lookups/admistrative-levels/show-tree/show-tree.component';
import { DatePickerHeader } from '../datepicker-header.component';
import moment, { Moment } from 'moment';
import { Table } from 'primeng/table';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { error } from 'console';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, OnDestroy {

  @ViewChild(Table, null) dataTable2: Table;

  /* input variables */
  @Input() tableData: any;
  @Input() data: any[];
  @Input() url: TableUrlInterface;
  @Input() columns: ColumnsInterface[];
  @Input() actions: ActionsInterface[];
  @Input() id = 'id';
  @Input() options: TableOptionsInterface;
  @Input() searchValues: any;
  @Input() isSearchable = true;
  @Input() showTree: false;

  /* output variables */
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewDetail: EventEmitter<any> = new EventEmitter<any>();

  /* private variables */
  exportData: any[];
  selectedColumns: ColumnsInterface[] = [];
  columnData: any[] = [];
  filteredArray: string[] = [];
  columnsHeaders: any[] = [];
  columnsBody: any[] = [];
  clientSide: boolean;
  listForm: FormGroup;
  columnFormArray: FormArray;
  columnsOrder: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private firstInit: boolean; // To trigger the first time data load
  selectedRows: any[];
  roles: any;
  filter: any = {};
  logo: any;
  header = DatePickerHeader;
  pageSize = 10;
  rowArray: [] = [];
  rerender = false;
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }

  get DownLoadService(): DownloadFilesService { return Shell.Injector.get(DownloadFilesService); }

  searchFilters: SearchFilter[] = [];
  @ViewChild('FilterModal', { static: true }) FilterModal: any;
  @ViewChild('SortModal', { static: true }) SortModal: any;

  mobilePageOptions = {
    sortDirection: 'ascending',
    sortField: 'id'
  };
  
  constructor(
    private fb: FormBuilder,
    private excelService: ExcelService,
    public tableCore: TableCoreService,
    public dialog: MatDialog,
    public storageService: StorageService,
    public localize: LocalizationService,
    public authService: AuthService,
    public router: Router,
    public http: HttpClient,
    public httpService: HttpService,
    public loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaderService.show();
    this.tableCore.filter = {};
    this.setColumnOrderKey();
    this.getColumns();
    this.getDataFromService();
    this.columnSearchInput();
    this.buildEditableForm();
    this.options = {
      add: true,
      print: false,
      search: true,
      reorder: false,
      loading: false,
      details: true,
      check: false,
      columnSearch: true,
      editable: false,
      ...this.options
    };
    let permissions = this.authService.getPermissions(this.tableData.componentName);
    this.roles = {
      canAdd: permissions.add,
      canUpdate: permissions.update,
      canDelete: permissions.delete,
      canPrint: permissions.print,
    };
  }

  setColumnOrderKey(): void {
    this.columnsOrder = this.tableData.componentName;
  }

  resetFilter() {
    this.rerender = true;
    this.tableCore.searchNew$.next({});
    this.tableCore.search = '';
    this.tableCore.pageOptions = {
      count: -1,
      offset: 0,
      limit: 10,
      sortDirection: 'ascending',
      sortField: 'id'
    };
    this.tableCore.filter = {};
    this.tableCore.filterType = {};
    this.firstInit = false;
    this.searchFilters = [];
    this.getTableData();
  }
  getColumns(): void {
    let columnsInStorage = JSON.parse(this.storageService.get(this.tableData.componentName));
    if (columnsInStorage != null || columnsInStorage != undefined) {
      this.selectedColumns = [...columnsInStorage.filter(x => !x.editable)];
    } else {
      this.selectedColumns = [...this.columns.filter(x => !x.editable)];
    }
    this.updateSelectedColumnsAPI();
    this.setUnselectedColumns();
  }

  setFieldName(field:string):string{
    let rr = field.includes('field.') ? this.localize.translate.instant(field).slice(0, -2) : field;
    return `${rr}${this.localize.currentLang}`;
  }

  /* set the unselected columns property to false in the original columns array to be unselected in the drop down */
  setUnselectedColumns(): void {
    let diff = this.columns.filter(this.comparer(this.selectedColumns));
    diff.forEach(item => item.selector = false);
  }

  comparer(otherArray) {
    return (current) => {
      return otherArray.filter((other) => {
        return other.field == current.field;
      }).length == 0;
    };
  }

  saveColumnsOrder(event: { columns: any; }): void {
    this.storageService.set(this.tableData.componentName, JSON.stringify(event.columns));
  }

  showOrHideColumns(column: ColumnsInterface) {
    if (column.selector === false) {
      let index = this.selectedColumns.findIndex(item => item.field == column.field);
      this.selectedColumns.splice(index, 1);
      // if columns are 1 then make it disabled
      if (this.selectedColumns.length == 1) {
        let x = this.selectedColumns[0];
        x.disable = true;
        let lastColumnIndex = this.columns.indexOf(x);
        this.columns.splice(lastColumnIndex, 1);
        this.columns = [...this.columns, x];
      }
    } else {
      this.selectedColumns = [...this.selectedColumns, column];
      // if columns are mor than one then make all of them non disabled
      if (this.selectedColumns.length > 1) {
        this.selectedColumns.forEach(x => x.disable = false);
        this.selectedColumns = [...this.selectedColumns];
      }
    }
    let diff = this.columns.filter(this.comparer(this.selectedColumns));
    // after showing or hiding a column save the displayed(selected columns) to storage
    this.storageService.set(this.tableData.componentName, JSON.stringify(this.selectedColumns));
  }

  ngOnDestroy() {
    this.tableCore.searchNew$.next({});
    this.tableCore.search = '';
    this.tableCore.pageOptions = {
      count: -1,
      offset: 0,
      limit: 10,
      sortDirection: 'asc',
      sortField: 'id'
    };
    this.firstInit = false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /* Get the Table Data from the Service */
  getTableData(): void {
    let pageSizeInStorage = JSON.parse(this.storageService.get(this.tableData.componentName + 'pageSize'));
    if (pageSizeInStorage != null || pageSizeInStorage != undefined) {
      this.pageSize = pageSizeInStorage;
    }
    this.tableCore.pageOptions.limit = this.pageSize;
    if (this.url && this.url.getAll) {

      this.loaderService.show();
      this.tableCore
        .getAllData(this.url.getAll, this.searchValues)
        .pipe(take(1))
        .subscribe(() => {

          this.data = this.tableCore.tableData;
          this.rerender = false;
          this.loaderService.hide();

        }, () => {
          this.rerender = false;
          this.loaderService.hide();
        });
    }
  }

  getDataFromService() {
    if (!this.clientSide) {
      this.getTableData();
    }
  }

  buildEditableForm() {
    if (!this.options.editable) { return; }
    this.columnFormArray = this.fb.array([]);
  }

  createRowFormArray() {
    return this.fb.group({});
  }

  /* Create Array of strings from selected columns */
  updateSelectedColumnsAPI(): void {
    this.filteredArray = [];
    this.selectedColumns.map(col => this.filteredArray.push(col.field));
  }

  /* Delete a Single Item from the Table */
  delete(id: string): void {
    if (this.url.delete) {
      this.tableCore
        .deleteItem(this.url.delete, id)
        .pipe(
          take(1)
        )
        .subscribe(x => { this.getTableData(); }, error => {
          this.Alert.showError(this.getErrorMessage(error));
        });
    }
    if (this.url.delete == 'AdministrativeLevels/delete') {
      this.storageService.removeStorgeByKey('TheTree');
    }
  }

  loadtree() {
    let urltree = 'AdministrativeLevels/GetTree';
    let Treedata: any;
    this.http.get<TreeNode[]>(this.httpService.serverUrl + urltree).subscribe((res: TreeNode[]) => {
      Treedata = res;
      this.storageService.removeStorgeByKey('TheTree');
      this.storageService.setItem('TheTree', JSON.stringify(Treedata));
    });
  }
  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { id },
      disableClose: true

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == undefined) {
        return;
      }
      this.delete(id);
    });
  }

  // export server side
  export(): void {
    if (this.url.export) {
      this.tableCore
        .exportTable(this.url.export, this.filteredArray)
        .subscribe();
    }
  }

  getErrorMessage(error): string {
    let message = '';

    if (error.status === 400) {

      let errors: Array<any> = error.error.errors;

      if (errors instanceof Object) {
        Object.keys(errors).forEach((key) => {
          message += errors[key][0] + '\n';
        });
      } else if (typeof error.error === 'string') {
        // the error is validation error BadRequest('error message')
        message = error.error;
      } else {
        message = 'Bad Request';
      }

    } else if (error.status === 500) {
      message = 'Unexpected error happened.';
    }

    return message;
  }
  /**
   * Fire When The Table Page Changes
   */
  setPage(pageInfo: any): void {
    this.storageService.set(this.tableData.componentName + 'pageSize', JSON.stringify(pageInfo.rows));
    this.tableCore.pageOptions.offset = pageInfo.first / pageInfo.rows + 1;
    this.tableCore.pageOptions.limit = pageInfo.rows;
    this.getTableData();
  }
  /**
   * Fire on sort
   */
  customSort(event?: any) {
    this.tableCore.pageOptions.sortField = event.field;
    this.tableCore.pageOptions.sortDirection = event.order == 1 ? 'ascending' : 'descending';
    this.tableCore.pageOptions.offset = 0;
    this.getTableData();
  }
  /**
   * Search For Each Table Column
   */
  columnSearchHandle(searchValue: any, colId: string, filterMode?: string): void {
    let searchCol = this.searchFilters.find(a=>a.colId == colId);
    if(searchCol !== undefined && searchCol !== null) {searchCol.searchValue = searchValue; searchCol.filterMode = filterMode;}
    else{ 
      this.searchFilters.push({
        colId: colId,
        searchValue: searchValue,
        filterMode: filterMode
      });
     }
    if (filterMode != null && filterMode == 'number' && parseInt(searchValue) < 0) {
      return;
    }
    let col = this.localize.translate.instant(colId);
    this.tableCore.pageOptions.offset = 0;
    if (filterMode != null && filterMode == 'text') {
      let filtertypename = this.tableCore.filterType[col] != null ? this.tableCore.filterType[col] : 0;
      this.tableCore.filter[col] = { name: searchValue, isContain: filtertypename };
    } else {
      this.tableCore.filter[col] = searchValue;
    }
    this.tableCore.searchNew$.next(this.tableCore.filter[col]);
  }

  /**
   * Search Filter type for string "Contain/Start/End" For Each Table Column
   */
  columnSearchHandleType(searchType: any, colId: string): void {
    let col = this.localize.translate.instant(colId);
    this.tableCore.pageOptions.offset = 0;
    this.tableCore.filterType[col] = searchType;
    let coreFilter = this.tableCore.filter[col];
    if (coreFilter != null) {
      coreFilter.isContain = searchType;
    }
    this.tableCore.searchNew$.next(this.tableCore.filter[col]);
  }

  /**
   * Search Functionality for Each Column with typing
   * Then call the backend to get the matched search criteria
   */
  columnSearchInput(): void {
    this.tableCore.searchNew$
      .pipe(
        debounceTime(1000),
        // distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (!this.clientSide) {
          this.firstInit ? this.getTableData() : (this.firstInit = true);
        }
      });
  }
  addRow(row?: any) {
    this.add.emit(row);
  }
  openViewDetail(row?: any) {
    this.viewDetail.emit(row);
  }

  getXlsxColumnHeaders() {
    this.columnsHeaders = [];
    this.selectedColumns
      .filter(col => col.print == true)
      .map(col => this.columnsHeaders.push(this.localize.translate.instant(col.header)));
  }

  getPdfColumnHeaders() {
    this.columnsHeaders = [];
    this.selectedColumns
      .filter(col => col.print == true)
      .map(col => this.columnsHeaders.push(this.localize.translate.instant(col.header)));
    if (this.localize.lang == 'ar') {
      this.columnsHeaders = [...this.columnsHeaders].reverse();
    } else {
      this.columnsHeaders = [...this.columnsHeaders];
    }
  }

  GetTableRowsForFiles(typeName: string) {
    this.columnData = [...this.exportData.map(data => {
      let row = [] as any[];
      this.selectedColumns.forEach(e => {
        if (e.print) {
          let fieldName = e.printField === undefined ? this.localize.translate.instant(e.field) : e.printField;
          if (data[fieldName] === false) {
            const no = this.localize.lang == 'ar' ? 'لا' : 'No';
            row.push(no);

          } else if (data[fieldName] === true) {
            const yes = this.localize.lang == 'ar' ? 'نعم' : 'Yes';
            row.push(yes);
          } else {
            row.push(data[fieldName]);
          }
        }
      });
      if (typeName == 'pdf') {
        if (this.localize.lang === 'ar') {
          row = [...row].reverse();
        }
      } else if (typeName == 'excel') {
      }
      return [...row];
    })];
    return this.columnData;
  }

  async getPrintableColumnsData() {

    let allData = await this.tableCore.exportAllData(this.url.getAll).pipe(take(1)).toPromise();
    let allDataList = allData.list;
    return allDataList;
  }

  async exportPdf() {
    let organizationsData = localStorage.getItem('Organizations_data');
    organizationsData = JSON.parse(organizationsData);
    if (organizationsData && organizationsData['logoURLSl'] && organizationsData['logoURLFl']) {
      this.logo = this.localize.lang == 'ar' ? (organizationsData['logoURLSl']) : (organizationsData['logoURLFl']);
    } else {
      this.logo = img;
    }
    this.getPdfColumnHeaders();
    let data2 = await this.getPrintableColumnsData();
    this.exportData = data2;
    let data = this.GetTableRowsForFiles('pdf');
    const font = fedra;
    const image = this.logo;
    // for setting image in header on left or right
    let doc = this.initializeDoc();
    let fileName = this.localize.translate.instant(this.tableData.name);
    let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    // let doc = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
    doc.addFileToVFS('fedra-Regular.ttf', font);
    doc.addFont('fedra-Regular.ttf', 'fedra', 'normal');
    doc.setFont('fedra');
    // add header logo and company name
    const imageDirection = this.localize.lang == 'ar' ? pageWidth - 55 : 10;
    const companyNameDirection = this.localize.lang == 'en' ? pageWidth - 30 : 15;
    const companyName = this.localize.lang == 'en' ? organizationsData['organizationNameFl'] : organizationsData['organizationNameSl'];
    doc.addImage(image, 'PNG', imageDirection, 0, 40, 20);
    doc.text(companyName, companyNameDirection, 15);
    doc.autoTable({
      headStyles: { fontStyle: 'fedra' },
      head: [this.columnsHeaders],
      body: data,
      // global style
      styles: {
        font: 'fedra',
        // halign: this.localize.lang == 'ar' ? 'right' : 'left',
        halign: 'center',
      },
      // column specific style
      columnStyles: {
        font: 'fedra',
        text: {
          cellWidth: 'auto'
        }
      },
      // style for header image
      margin: {
        top: 20
      }
    });
    doc.setTextColor(100);

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      this.localize.lang == 'ar' ?
        doc.text('صفحة ' + String(i) + ' من ' + String(pageCount), doc.internal.pageSize.width / 2, pageHeight - 7, {
          align: 'center'
        }) :
        doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, pageHeight - 7, {
          align: 'center'
        });
    }
    doc.setPage(1);
    doc.setFontSize(20);
    doc.text(fileName, pageWidth / 2, 10, 'center');
    doc.save(`${fileName}.pdf`);
  }
  initializeDoc(): jspdf {
    if (this.columns.length <= 3) {

      return new jspdf('p', 'mm', 'a4');
    } else {
      return new jspdf('l', 'mm', 'a4');
    }

  }

  async getXlsxPrintableColumnsData() {

    let data2 = await this.getPrintableColumnsData();
    this.exportData = data2;
    let data = this.GetTableRowsForFiles('excel');
    this.getXlsxColumnHeaders();
    this.columnData.unshift(this.columnsHeaders);
    return this.columnData;
  }

  async exportExcel() {
    let rtl = false;
    await this.getXlsxPrintableColumnsData();
    if (this.localize.lang === 'ar') {
      rtl = true;
    } else {
      rtl = false;
    }
    let fileName = this.localize.translate.instant(this.tableData.name);
    this.excelService.exportAsExcelFile(this.columnData, fileName, rtl);
  }

  displayTree() {
    this.dialog.open(ShowTreeComponent, {
      width: '1000px',
      panelClass: 'my-dialog',
      direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr'),
      disableClose: true
    });
  }

  onOpen(datepicker: MatDatepicker<Moment>) {
    let matCalendar = document.getElementsByClassName('mat-calendar')[0];
    let button = document.createElement('mat-button');
    button.style.color = 'white';
    button.style.backgroundColor = '#3f51b5';
    button.className = 'mat-button';
    button.style.bottom = '5px';
    button.style.position = 'absolute';
    button.style.left = '120px';
    button.style.height = '20px';
    button.style.padding = '0';
    button.style.border = '0';
    button.style.textAlign = 'center';
    button.style.lineHeight = '20px';

    button.addEventListener('click', function () {

      const today = moment().utcOffset(0);
      today.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      today.toISOString();
      today.format();
      datepicker.select(today);
      datepicker.close();
    }, false);

    let today = 'Today';
    if (this.localize.lang != 'en') {
      today = 'الـيــــوم';
    }

    let text = document.createTextNode(today);
    button.appendChild(text);

    matCalendar.appendChild(button);
  }


  showMobileFilter(){
    this.openDialog(this.FilterModal);
  }
  showMobileSort(){
    this.mobilePageOptions.sortDirection = this.tableCore.pageOptions.sortDirection;
    this.mobilePageOptions.sortField = this.tableCore.pageOptions.sortField;
    this.openDialog(this.SortModal);

  }
  openDialog(modalTemplate: any) {
    this.dialog.open(modalTemplate, {
      width: '100%',
      panelClass: 'my-dialog',
      direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr')
    });
  }

  getTextColValue(col){
    let ee = this.searchFilters.find(a=>a.colId == col);
    return ee!== undefined ? ee.searchValue : "";    
  }
  getDropDownColValue(col){
    let ee = this.searchFilters.find(a=>a.colId == col);
    return ee!== undefined ? ee.searchValue : "";    
  }
  getDateColValue(col){
    let ee = this.searchFilters.find(a=>a.colId == col);
    return ee!== undefined ? ee.searchValue : null;    
  }

  onNoClick(){
    this.dialog.closeAll();
  }

  setColumnSearchType(searchType: any, colId: string): void {
    let col = this.localize.translate.instant(colId);
    this.tableCore.pageOptions.offset = 0;
    this.tableCore.filterType[col] = searchType;
    let coreFilter = this.tableCore.filter[col];
    if (coreFilter != null) {
      coreFilter.isContain = searchType;
    }
  }

  setColumnSearchObject(searchValue: any, colId: string, filterMode?: string): void {
    let searchCol = this.searchFilters.find(a=>a.colId == colId);
    if(searchCol !== undefined && searchCol !== null) {searchCol.searchValue = searchValue; searchCol.filterMode = filterMode;}
    else{ 
      this.searchFilters.push({
        colId: colId,
        searchValue: searchValue,
        filterMode: filterMode
      });
     }
  }
  columnsSearchHandleLoop(searchValue: any, colId: string, filterMode?: string): void {
    if (filterMode != null && filterMode == 'number' && parseInt(searchValue) < 0) {
      return;
    }
    let col = this.localize.translate.instant(colId);

    this.tableCore.pageOptions.offset = 0;
    if (filterMode != null && filterMode == 'text') {
      let filtertypename = this.tableCore.filterType[col] != null ? this.tableCore.filterType[col] : 0;
      this.tableCore.filter[col] = { name: searchValue, isContain: filtertypename };
    } else {
      this.tableCore.filter[col] = searchValue;
    }
    //this.tableCore.searchNew$.next(this.tableCore.filter[col]);
  }
  searchMobile(){

    this.searchFilters.forEach((item:SearchFilter) => {
      if(item.searchValue !== undefined && item.searchValue !== null){
        this.columnsSearchHandleLoop(item.searchValue,item.colId,item.filterMode);
      }
    });
    console.log("table filter is => ", this.tableCore.filter);   
    this.getTableData();
    this.onNoClick();
  }

  sortMobile(){
    this.tableCore.pageOptions.sortField = this.mobilePageOptions.sortField;
    this.tableCore.pageOptions.sortDirection = this.mobilePageOptions.sortDirection;
    this.tableCore.pageOptions.offset = 0;
    this.getTableData();  
    this.onNoClick();  
  }
}

export class SearchFilter{
  searchValue?: any;
  colId?: string;
  filterMode?: string;
}
