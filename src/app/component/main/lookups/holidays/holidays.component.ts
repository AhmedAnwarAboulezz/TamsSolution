import { HolidayComponent } from './holiday/holiday.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { holidaysService } from './Services/holidays.services';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})

export class HolidaysComponent extends BaseListComponent implements OnInit {

  get Service(): holidaysService { return Shell.Injector.get(holidaysService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'holidaies.holidays',
    componentName: 'HolidaysComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'holidaies.code',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    
    {
      field: 'publicHolidayNameFl',
      header: 'holidaies.publicHolidayNameFL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'publicHolidayNameSl',
      header: 'holidaies.publicHolidayNameSL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    }
    
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      isView: false
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }
  addEvent(model: any) {
    super.add(HolidayComponent,model);
  }
}
