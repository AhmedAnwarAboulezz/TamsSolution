import { Router } from '@angular/router';

import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadOptions } from './models/LoadOptions';
import { Result } from './models/Result';
import { DatePipe } from '@angular/common';
import { DeleteConfirmationComponent } from 'src/app/component/main/delete-confirmation/delete-confirmation.component';
import { AuthService } from 'src/app/services/auth.service';
import { DeleteDialogComponent } from 'src/app/shared/components/data-table/components/Delete-dialog.component';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss'],
  providers: [DatePipe]
})
export class TableDetailsComponent implements OnInit, AfterViewInit {

  // receive the observable as a paramterized function to pass the filter object to it
  @Input() dataService: (x: LoadOptions) => Observable<Result>;
  @Input() columnHeader: {};
  @Input() columnTypes: any;
  @Input() componentName: string;
  @Output() editClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() viewClick: EventEmitter<string> = new EventEmitter<string>();
  @Input() reload: EventEmitter<any> = new EventEmitter<any>();
  @Input() hasCheckBox: boolean;
  @Input() checkedItemValue: boolean;
  @Output() editCheck: EventEmitter<any> = new EventEmitter<any>();
  @Input() checkedList: any[] = [];
  @Input() hasEditAndDelete: boolean;
  @Input() disabledIds: any[] = [];
  @Input() checkedAllChecked: boolean;
  @Input() checkedAllDisable: boolean;

  currentPageIds: any[];
  newChecked = [];
  localList: any = [];
  listCount = 0;
  objectKeys = Object.keys;
  // todo
  // initialize this array with edit delete and view buttons and pass a key in the passed array of columns to view each one
  columns: string[];
  currentRoute: string;
  displayedColumns: string[];
  // to control show or hide buttons
  containView: boolean;
  containEdit: boolean;
  containDelete: boolean;
  dateKey: string[] = [];
  dateTimeKey: string[] = [];
  timeKey: string[] = [];
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  roles: { canDelete: any; canUpdate: any; canAdd?: boolean; canPrint?: boolean; };

  constructor(private route: Router,private paginatorIntl: MatPaginatorIntl,  public translate: TranslateService,

    public dialog: MatDialog, private datePipe: DatePipe, private authService: AuthService) {
    this.currentRoute = this.route.url.substring(0, this.route.url.length - 3);
  }
  ngOnInit() {
    this.paginatorIntl.itemsPerPageLabel = this.translate.instant('pageSize');
    this.getColumnTypes(this.columnTypes);
    let permissions = this.authService.getPermissions(this.componentName);
    this.roles = {
      canAdd: permissions.add,
      canUpdate: permissions.update,
      canDelete: permissions.delete,
      canPrint: permissions.print,
    };
    this.columns = this.objectKeys(this.columnHeader);
    if (this.hasEditAndDelete == null) { this.hasEditAndDelete = true; }

    if (this.columns.includes('view')) {
      this.containDelete = false;
      this.containEdit = false;
      this.containView = true;
      // remove view column from array and concat it like edit and delete *don't know why it crash*
      this.columns.shift();
      this.displayedColumns = this.columns.concat(['view']);
    } else {
      this.containView = false;
      this.containDelete = this.hasEditAndDelete && this.roles.canDelete;
      this.containEdit = this.hasEditAndDelete && this.roles.canUpdate;

      if (this.containDelete && this.containEdit) {
        this.displayedColumns = this.columns.concat(['edit', 'delete']);
      } else if (this.containEdit) {
        this.displayedColumns = this.columns.concat(['edit']);
      } else if (this.containDelete) {
        this.displayedColumns = this.columns.concat(['delete']);
      } else {
        this.hasEditAndDelete = false;
        this.displayedColumns = this.columns.concat(['empty']);

      }
      if (this.componentName !== 'EmployeeLogsSheet' && this.componentName !== 'Devices') {
        this.displayedColumns.unshift('index');
      }
    }
  }

  ngAfterViewInit() {
    this.RenderTable();

  }

  delete(id) {
    
    this.openDeleteDialog(id);
  }

  edit(element) {
    this.editClick.emit(element);
  }

  checkAll(event) {
    if (event == true) {

      this.checkedAllChecked = true;
      this.checkedItemValue = true;
      //let newChecked = [];
      this.currentPageIds.forEach(item => {
        if(!this.newChecked.includes(item)){
          this.newChecked.push(item);
        }
      });

      this.checkedList = this.newChecked.filter((item) => {
        if (this.disabledIds.includes(item)) {
          return false;
        }
        return true;
      });
    } else {
      this.checkedAllChecked = false;
      this.checkedItemValue = false;
      this.checkedList = [];
    }
    this.editCheck.emit(this.checkedList);
  }
  checkk(element, event) {
    if (event.checked) {
      this.checkedList.push(element.id);
      if (this.checkedList.length == this.currentPageIds.length) {
        this.checkedAllChecked = true;
      }
    } else {
      this.checkedAllChecked = false;
      for (let i = 0; i < this.checkedList.length; i++) {
        if (this.checkedList[i] != null) {
          if (this.checkedList[i] == element.id) {
            this.checkedList.splice(i, 1);
          }
        }
      }
    }
    this.editCheck.emit(this.checkedList);
  }
  RenderTable() {
    // listen on sorting or pagination event
    merge(this.sort.sortChange, this.paginator.page, this.reload).pipe(      
      switchMap(() => {        
        // pass filter paging and sorting object to the dataservice input which takes this object
        return this.dataService({
          offset: this.paginator.pageIndex + 1,
          limit: this.paginator.pageSize,
          // if sort is not exist select default column
          sortField: (this.sort.active) ? this.sort.active : 'id',
          sortDirection: (this.sort.direction) ? this.sort.direction : 'ascending',
          filter: {}
        });
      })).subscribe(e => {
        // after that bind the data to the offline data list
        this.listCount = e.count;
        this.localList = e.list;
        this.checkedAllChecked = false;
        this.currentPageIds = e.list.map(element => element.id);
      //  this.localList =  this.localList.slice(1, 10);
        if ((this.dateKey.length != 0 && this.dateKey != undefined) ||
          (this.dateTimeKey.length != 0 && this.dateTimeKey != undefined) ||
          (this.timeKey.length != 0 && this.timeKey != undefined)) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.localList.length; i++) {
            if (this.dateKey.length != 0 && this.dateKey != undefined) {
              this.dateKey.forEach(x => {
                this.localList[i][x] = this.datePipe.transform(this.localList[i][x], 'd/M/y');
              });
            }
            if (this.dateTimeKey.length != 0 && this.dateTimeKey != undefined) {
              this.dateTimeKey.forEach(x => {
                this.localList[i][x] = this.datePipe.transform(this.localList[i][x], 'd/M/y h:mm:ss a');
              });
            }
            if (this.timeKey.length != 0 && this.timeKey != undefined) {
              this.timeKey.forEach(x => {
                this.localList[i][x] = this.datePipe.transform(this.localList[i][x], 'h:mm:ss a');
              });
            }
          }
        }

      });
  }

  openDeleteDialog(id: string): void {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: { id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== '') {
        
        this.deleteClick.emit(id);
      }
    });
  }

  getColumnTypes(columnTypes?): void {
    if (columnTypes != null || columnTypes != undefined) {
      Object.keys(columnTypes).forEach((key => {
        if (columnTypes[key] == 'Date') {
          this.dateKey.push(key);
        }
        if (columnTypes[key] == 'DateTime') {
          this.dateTimeKey.push(key);
        }
        if (columnTypes[key] == 'Time') {
          this.timeKey.push(key);
        }
      }));
    }

  }
}
