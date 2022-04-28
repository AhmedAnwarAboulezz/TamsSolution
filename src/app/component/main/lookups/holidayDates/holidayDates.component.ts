import { HolidayDateComponent } from './holidayDate/holidayDate.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { HolidayDatesService } from './Services/holidayDates.services';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-holidayDates',
  templateUrl: './holidayDates.component.html',
  styleUrls: ['./holidayDates.component.scss']
})

export class HolidayDatesComponent extends BaseListComponent implements OnInit {

  get Service(): HolidayDatesService { return Shell.Injector.get(HolidayDatesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'holidayDates.holidayDates',
    componentName: 'HolidayDatesComponent'
  };

  public columns: ColumnsInterface[] = [

    {
      field: 'field.PublicholidayNames',
      dropdownFilterName: 'holidayId',
      header: 'holidayDates.holidayName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      sortName:'field.holidayField',
      isfield:true

    },
    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'holidayDates.startDate',
      filterMode: 'date',
      customCell: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'holidayDates.endDate',
      filterMode: 'date',
      customCell: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'field.countryName',
      dropdownFilterName: 'countryId',
      header: 'holidayDates.countryName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      sortName:'field.countryField',
      isfield:true
    },
    {
      field: 'noteField',
      header: 'rotatedDuties.note',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
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
    this.Lookups();

  }
  addEvent(model: any) {
    super.add(HolidayDateComponent, model);
  }

  Lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {      
      this.columns[0].filterDropdown = data[1];
      this.columns[3].filterDropdown = data[0];

    });
  }
  
}
