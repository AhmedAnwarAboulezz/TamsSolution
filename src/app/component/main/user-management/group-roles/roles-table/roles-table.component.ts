import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { GroupRole } from 'src/app/models/GroupRole';
import { SelectionModel } from '@angular/cdk/collections';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss']
})
export class RolesTableComponent implements OnInit, OnChanges {
  @Input() list: GroupRole[];
  @Input() isReport: boolean;

  displayedColumns: string[];
  dataSource;
  view;
  add;
  update;
  delete;
  print;
  all;

  ngOnChanges(): void {
    this.initDataSource();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(selection: string) {
    let list = this.dataSource.data;
    if (selection == 'all') {
      for (let item of list) {
        if (item['view'] == false) return false;
        if (item['add'] == false) return false;
        if (item['update'] == false) return false;
        if (item['delete'] == false) return false;
        if (item['print'] == false) return false;
      }
      return true;
    }

    const numSelected = list.filter(e => e[selection]).length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(selection: string, event) {
    if (selection == 'all') {
      for (let item of this.dataSource.data) {
        item['view'] = event.checked;
        item['add'] = event.checked;
        item['update'] = event.checked;
        item['delete'] = event.checked;
        item['print'] = event.checked;
      }
    } else {
      this.dataSource.data.forEach(row => row[selection] = event.checked);
    }
  }

  initDataSource() {
    let dataSource = new MatTableDataSource<GroupRole>(this.list);
    this.view = new SelectionModel<GroupRole>(true, []);
    this.add = new SelectionModel<GroupRole>(true, []);
    this.update = new SelectionModel<GroupRole>(true, []);
    this.delete = new SelectionModel<GroupRole>(true, []);
    this.print = new SelectionModel<GroupRole>(true, []);
    this.all = new SelectionModel<GroupRole>(true, []);
    this.dataSource = dataSource;
  }

  rowHasValue(row): boolean {
    return row.view || row.add || row.update || row.delete || row.print;
  }

  isRowChecked(row) {
    return row.view && row.add && row.update && row.delete && row.print;
  }

  columnHasValue(selection): boolean {
    let list = this.dataSource.data;

    if (selection == 'all') {
      for (let item of list) {
        if (item['view'] == true) { return true; }
        if (item['add'] == true) { return true; }
        if (item['update'] == true) { return true; }
        if (item['delete'] == true) { return true; }
        if (item['print'] == true) { return true; }
      }
    } else {
      for (let item of list) {
        if (item[selection] == true) { return true; }
      }
    }
    return false;
  }

  checkAll(row, event) {
    if (!event) {
      return;
    }

    row.view = event.checked;
    row.add = event.checked;
    row.update = event.checked;
    row.delete = event.checked;
    row.print = event.checked;
  }

  getDataSource() {
    return this.dataSource.data;
  }

  constructor(public localize: LocalizationService) {

  }

  ngOnInit() {

    if (!this.isReport) {
      this.displayedColumns = ['screenName', 'view', 'add', 'update', 'delete', 'print', 'all'];
    } else {
      this.displayedColumns = ['screenName', 'view'];
    }
  }

}
