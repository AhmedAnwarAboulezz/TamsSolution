import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { DeleteDialogComponent } from '../data-table/components/Delete-dialog.component';
import { take, finalize } from 'rxjs/operators';
import { ColumnsInterface } from '../data-table/models/columns.interface';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { TableOptionsInterface } from '../data-table/models/options.interface';
import { ActionsInterface } from '../data-table/models/actions.interface';
import { TableUrlInterface } from '../data-table/models/table-url.interface';
import { TableCoreDetailService } from './services/table-core-detail.service';

@Component({
  selector: 'app-data-table-details',
  templateUrl: './data-table-details.component.html',
  styleUrls: ['./data-table-details.component.scss']
})
export class DataTableDetailsComponent implements OnInit, OnDestroy {

  @Input() tableDetailData: any;
  @Input() dataDetail: any[];
  @Input() urlDetail: TableUrlInterface;
  @Input() columnsDetail: ColumnsInterface[];
  @Input() actionsDetail: ActionsInterface[];
  @Input() idDetail = 'id';
  @Input() optionsDetail: TableOptionsInterface;

  @Output() addForDetail: EventEmitter<any> = new EventEmitter<any>();

  selectedDetailColumns: ColumnsInterface[] = [];
  columnDetailData: any[] = [];
  filteredDetailArray: string[] = [];
  columnsDetailHeaders: any[] = [];
  columnsDetailBody: any[] = [];
  clientSideDetail: boolean;
  listFormDetail: FormGroup;
  columnDetailFormArray: FormArray;
  private destroyDetail$: Subject<boolean> = new Subject<boolean>();
  selectedRows: any[];
  roles: any;
  filter: any = {};
  constructor(
    private fb: FormBuilder,
    public tableDetailCore: TableCoreDetailService,
    public dialogDetail: MatDialog,
    public localizeDetail: LocalizationService,
    public authServiceDetail: AuthService
  ) {
  }

  ngOnInit() {
    this.getColumns();
    this.getDataFromService();
    this.buildEditableForm();
    this.optionsDetail = {
      add: true,
      search: true,
      reorder: false,
      loading: false,
      details: true,
      check: false,
      columnSearch: true,
      editable: false,
      ...this.optionsDetail
    };
    let permissions = this.authServiceDetail.getPermissions(this.tableDetailData.componentName);
    this.roles = {
      canAdd: permissions.add,
      canUpdate: permissions.update,
      canDelete: permissions.delete,
      canPrint: permissions.print,
    };
  }

  getColumns(): void {
    this.selectedDetailColumns = [...this.columnsDetail];
    this.updateSelectedColumnsAPI();
  }

  showOrHideColumns(column: ColumnsInterface) {
    if (!column.selector) {
      let index = this.selectedDetailColumns.indexOf(column);
      this.selectedDetailColumns.splice(index, 1);
      // if columns are 1 then make it disabled
      if (this.selectedDetailColumns.length == 1) {
        let x = this.selectedDetailColumns[0];
        x.disable = true;
        let lastColumnIndex = this.columnsDetail.indexOf(x);
        this.columnsDetail.splice(lastColumnIndex, 1);
        this.columnsDetail = [...this.columnsDetail, x];
      }
    } else {
      this.selectedDetailColumns = [...this.selectedDetailColumns, column];
      // if columns are mor thean one then make all of them non disabled
      if (this.selectedDetailColumns.length > 1) {
        this.selectedDetailColumns.forEach(x => x.disable = false);
        this.selectedDetailColumns = [...this.selectedDetailColumns];
      }
    }
  }

  ngOnDestroy() {
    this.tableDetailCore.pageDetailOptions = {
      count: -1,
      offset: 0,
      limit: 50,
      sortDirection: 'asc',
      sortField: 'id'
    };
    this.destroyDetail$.next(true);
    this.destroyDetail$.unsubscribe();
  }

  /**
   * Get the Table Data from the Service
   */
  getTableData(): void {
    if (this.urlDetail && this.urlDetail.getAll) {
      this.tableDetailCore
        .getAllData(this.urlDetail.getAll)
        .pipe(take(1))
        .subscribe(() => {
          this.dataDetail = this.tableDetailCore.tableDetailData;
        });
    }
  }

  getDataFromService() {
    if (!this.clientSideDetail) {
      this.getTableData();
    }
  }

  buildEditableForm() {
    if (!this.optionsDetail.editable) { return; }
    this.columnDetailFormArray = this.fb.array([]);
  }

  createRowFormArray() {
    return this.fb.group({});
  }

  /**
   * Create Array of strings from selected columns
   */
  updateSelectedColumnsAPI(): void {
    this.filteredDetailArray = [];
    this.selectedDetailColumns.map(col => this.filteredDetailArray.push(col.field));
  }

  /**
   * Delete a Single Item from the Table
   */
  delete(id: string): void {
    if (this.urlDetail.delete) {
      this.tableDetailCore
        .deleteItem(this.urlDetail.delete, id)
        .pipe(
          take(1),
          finalize(() => this.getTableData())
        )
        .subscribe();
    }
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialogDetail.open(DeleteDialogComponent, {
      width: '350px',
      data: { id },
      disableClose:true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == undefined) {
        return;
      }
      this.delete(id);
    });
  }

  /**
   * Fire When The Table Page Changes
   */
  setPage(pageInfo: any): void {
    this.tableDetailCore.pageDetailOptions.offset = pageInfo.first / pageInfo.rows + 1;
    this.tableDetailCore.pageDetailOptions.limit = pageInfo.rows;
    this.getTableData();
  }
  /**
   * Fire on sort
   */
  customSort(event?: any) {
    this.tableDetailCore.pageDetailOptions.sortField = event.field;
    this.tableDetailCore.pageDetailOptions.sortDirection = event.order == 1 ? 'ascending' : 'descending';
    this.tableDetailCore.pageDetailOptions.offset = 0;
    this.getTableData();
  }

  addRow(row?: any) {
    this.addForDetail.emit(row);
  }
}
