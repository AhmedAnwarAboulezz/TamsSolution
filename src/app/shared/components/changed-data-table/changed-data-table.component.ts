import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ActionsInterface } from '../data-table/models/actions.interface';
import { ColumnsInterface } from '../data-table/models/columns.interface';
import { TableOptionsInterface } from '../data-table/models/options.interface';
import { TableUrlInterface } from '../data-table/models/table-url.interface';

@Component({
  selector: 'app-changed-data-table',
  templateUrl: './changed-data-table.component.html',
  styleUrls: ['./changed-data-table.component.scss']
})
export class ChangedDataTableComponent implements OnInit {

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
  constructor(    public loaderService: LoaderService
    ) { }

  ngOnInit() {
  }

  addRow(row?: any) {
    this.add.emit(row);
  }
}
