import {
  WeekEmployee,
  Shift,
  MonthEmployee,
  Employee,
  ShiftDate,
  FixedPeriodDutyCalender,
  EmployeesDateDayDto,
} from './models/employee';
import { Component, OnInit } from '@angular/core';
import { Column } from './models/column';
import { ShiftModalComponent } from './components/shif-modal/shift-modal.component';
import { MatDialog, MatDatepicker } from '@angular/material';
import { Mode, Day, ShortHand, ColumnType, OptionType } from './models/enum';
import { AlertService } from 'src/app/services/AlertService';
import { Shell } from '../shell';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ShiftService } from './services/shift.service';
import { AssignEmployeeComponent } from './components/assign-employee/assign-employee.component';
import { CopyOptionsComponent } from './components/copy-options/copy-options.component';
import { DeleteOptionsComponent } from './components/delete-options/delete-options.component';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { DateFilter } from 'src/app/models/dateFilter';
import { Search } from './models/search';
import { EmployeeDutiesService } from '../main/duties/employee-duty/Services/employeeDuties.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { DeleteDialogComponent } from 'src/app/shared/components/data-table/components/Delete-dialog.component';
import { ResetModalComponent } from './components/reset-modal/reset-modal.component';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MoveToNextModelComponent } from './components/move-to-next-model/move-to-next-model.component';
declare var dateFormat: any;
@Component({
  selector: 'app-shifts-component',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
})
export class ShiftsComponent implements OnInit {
  /* Private Fields */
  selectedDate: Date = new Date();
  currentWeekDate: Date = new Date();
  isMonth: false;
  isWeek: false;

  startDate: any = new Date();
  endDate: any = new Date();
  showWeek = true;
  showMonth = false;
  weekEmployees: WeekEmployee[] = [];
  monthEmployees: MonthEmployee[] = [];
  weekColumns: Column[] = [];
  monthColumns: Column[] = [];
  weekKeys: string[] = [];
  monthKeys: string[] = [];
  weekEmployeeData: any[] = [];
  monthEmployeeData: any[] = [];
  employees: Employee[] = [];
  fixedPeriodDutyCalender: FixedPeriodDutyCalender[] = [];

  monthDaysCount: number;
  header = DatePickerHeader;
  dateFilters = new DateFilter();
  search = new Search();

  /* Services */
  get localize(): LocalizationService {
    return Shell.Injector.get(LocalizationService);
  }
  get Service(): EmployeeDutiesService {
    return Shell.Injector.get(EmployeeDutiesService);
  }
  get Alert(): AlertService {
    return Shell.Injector.get(AlertService);
  }
  constructor(
    public shiftService: ShiftService,
    public loaderService: LoaderService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getDaysOfCurrentWeek(this.selectedDate);
    this.getMonthDays(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth()
    );
    this.getKeysNames();

    this.FillSchedule();
  }

  /* change the day and reset the week */
  changeDay(event: Moment) {

    let date = event.toDate();
    this.selectedDate = new Date(date);
    if (this.showWeek) {
      this.getDaysOfCurrentWeek(this.selectedDate);
    } else {
      this.getMonthDays(this.selectedDate.getFullYear(),
        this.selectedDate.getMonth());
    }
    this.getMonthDaysNames();
    
   //this.SetOldData(false);
   this.loaderService.show();
   this.setStartAndEndDate();
   let testSearch = new Search();
   testSearch.advancedSearchDto = new advancedSearch();
   
   testSearch.dateFilterDto = this.dateFilters;
   testSearch.dateFilterDto.searchType = 'init';
   console.log("testSearch",testSearch);
   
   this.Service.postQueryParamsReq(
     'EmployeeFixedDutyPeriods/Fill',
     testSearch
   ).subscribe((response: any) => {
     this.loaderService.hide();    
     this.employees = response;
     this.initializeDataForChangeDay(response);
   });

   //this.FillSchedule();
   

  }
  /* switch month and week calendar */
  switchCalendar(type: string): string {
    
    if (type == 'month') {
      this.showMonth = true;
      this.showWeek = false;
      this.SetOldData(false);
      return 'green';
    }
    if (type == 'week') {
      this.showMonth = false;
      this.showWeek = true;
      this.SetOldData(false);
      return 'green';
    }
  }
  // shows if user click on delete duties button
  showClearModal(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.showWeek) {
          this.clearWeekEmployees();
        } else {
          this.clearMonthEmployees();
        }
      }
    });
  }
  // shows if user click on back arrow in calendar
  showResetDialog(): void {
    const dialogRef = this.dialog.open(ResetModalComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeAllEmployees();
        if(this.showMonth){
          this.getNextMonth('previous', false);
        }
        else{
          this.getNextWeek('previous', false);
        }
      }
    });
  }

  showMoveNextDialog(): void {
    const dialogRef = this.dialog.open(MoveToNextModelComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(this.showMonth){
          this.getNextMonth('next', false);
        }
        else{
          this.getNextWeek('next', false);
        }
      }
    });
  }

  clearWeekEmployees(): void {
    this.weekEmployees.forEach((employee) => {
      this.weekKeys.forEach((key) => {
        if (!employee[key].isDifferent) {
          employee[key].nameFl = '';
          employee[key].nameSl = '';
        }
      });
    });
  }
  clearMonthEmployees(): void {
    this.monthEmployees.forEach((employee) => {
      this.monthKeys.forEach((key) => {
        if (!employee[key].isDifferent) {
          employee[key].nameFl = '';
          employee[key].nameSl = '';
        }
      });
    });
  }

  protected openDialog(
    dialog: any,
    data: any,
    width: any,
    maxHeight?: any
  ): void {
    const dialogRef = this.dialog.open(dialog, {
      maxHeight,
      width,
      data,
      panelClass: 'my-dialog',
      direction: this.localize.lang === 'ar' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (
        dialog == AssignEmployeeComponent &&
        result.advancedSearch != null &&
        result.fill
      ) {
        this.loaderService.show();
        this.setStartAndEndDate();

        this.search.advancedSearchDto = result.advancedSearch;
        this.search.dateFilterDto = this.dateFilters;
        this.search.dateFilterDto.searchType = '';

        this.Service.postQueryParamsReq(
          'EmployeeFixedDutyPeriods/Fill',
          this.search
        ).subscribe((response: any) => {// result list of employee class "each employee with old shifts"
          this.loaderService.hide();
          response.forEach(element => {
            this.employees.push(element);
          });          
          console.log("employeeees = ", this.employees);
          
          this.initializeData(response);
        });
      }
    });
  }
  // set start date and end date in case of month and week
  setStartAndEndDate(): void {
    
    this.dateFilters.startDate = moment.parseZone(this.showWeek ? this.startDate
      : new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1)).format('L LT');
    this.dateFilters.endDate = moment.parseZone(this.showWeek ? this.endDate
      : new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0)).format('L LT');

  }

  openEmployeeModal(mode: string): void {
    this.openDialog(AssignEmployeeComponent, mode, '1100px');
  }
  /* initialize data it must be returned in that way from  the server */
  initializeData(response?: any[], copy?: boolean, copyShifts?: any[],isOverride?: boolean): void {
    
    console.log('resp', response);

    if(this.showWeek){
      this.weekEmployeeData = [];
      this.weekEmployeeData = response;      
      this.initializeWeekEmployees(copy, copyShifts,isOverride);
    }
    else{
      this.monthEmployeeData = [];
      this.monthEmployeeData = response;
      this.initializeMonthEmployees(copy, copyShifts,isOverride);
    }
  }
  initializeDataForChangeDay(response?: any[]): void {
    
    if(this.showWeek){
      this.weekEmployeeData = [];
      this.weekEmployeeData = response;
      this.initializeWeekEmployeesForChangeDay();
    }
    if(this.showMonth){
      this.monthEmployeeData = [];
      this.monthEmployeeData = response;
      this.initializeMonthEmployeesForChangeDay();
    }



  }
  // initialize week employees
  initializeWeekEmployees(copy?: boolean, copyShifts?: any[],isOverride?: boolean): void {
    
    if(this.weekEmployeeData.length== 0){
      this.weekEmployees = [];
      return;
    }
    this.weekEmployeeData.forEach((employee) => {
      
      let weekEmployee: WeekEmployee = {};
      weekEmployee.employeeId = employee.employeeId;
      weekEmployee.employeeName = employee.employeeName;
      weekEmployee.employeeNameAr = employee.employeeNameAr;
      weekEmployee.employeeNumber = employee.employeeNumber;
      weekEmployee.employeeType = 'Week';
      this.weekKeys.forEach(key => {
        let copyShift:any[] = [];
        if(copyShifts && copyShifts.length !== 0){
          copyShift = copyShifts.filter(a=>a.employeeId == employee.employeeId)[0].shifts;
        }
          let shift = this.mapShift(employee.shifts, key, copy, copyShift,isOverride);
          weekEmployee[key] = shift;
      });      
      this.checkIfWeekEmployeeIsAdded(weekEmployee);



    });
    this.mapCalenderEmployeeData('Week');

  }
  initializeWeekEmployeesForChangeDay(): void {
    this.weekEmployees = [];
    this.weekEmployeeData.forEach((employee) => {
      let weekEmployee: WeekEmployee = {};
      weekEmployee.employeeId = employee.employeeId;
      weekEmployee.employeeName = employee.employeeName;
      weekEmployee.employeeNameAr = employee.employeeNameAr;
      weekEmployee.employeeNumber = employee.employeeNumber;
      weekEmployee.employeeType = 'Week';
      this.weekKeys.forEach(key => {
        let copyShift = employee.shifts.find(x => x.propertyName == key);
        let shift:Shift = new Shift();
        shift.dayOfWeek = copyShift.dayOfWeek;
        shift.nameSl = copyShift.dutyDescriptionSl;
        shift.nameFl = copyShift.dutyDescriptionFl;
        shift.dutyId = copyShift.dutyId;
        shift.isDifferent = copyShift.isDifferent;
        weekEmployee[key] = shift;
      });      
      this.weekEmployees.push(weekEmployee);
    });

  }
  initializeMonthEmployeesForChangeDay(): void {
    this.monthEmployees=[];
    this.monthEmployeeData.forEach((employee) => {
      let monthEmployee: MonthEmployee = {};
      monthEmployee.employeeId = employee.employeeId;
      monthEmployee.employeeName = employee.employeeName;
      monthEmployee.employeeNameAr = employee.employeeNameAr;
      monthEmployee.employeeNumber = employee.employeeNumber;
      monthEmployee.employeeType = 'Month';
      this.monthKeys.forEach(key => {
        

        let copyShift = employee.shifts.find(x => x.propertyName == key);
        let shift:Shift = new Shift();
        shift.dayOfWeek = copyShift.dayOfWeek;
        shift.nameSl = copyShift.dutyDescriptionSl;
        shift.nameFl = copyShift.dutyDescriptionFl;
        shift.dutyId = copyShift.dutyId;
        shift.isDifferent = copyShift.isDifferent;
        monthEmployee[key] = shift;
      });
      this.monthEmployees.push(monthEmployee);
    });

  }

  mapCalenderEmployeeData(type: string){
    if(type == 'Week'){
      this.weekEmployees.forEach(we =>{
        this.weekKeys.forEach(day => {
          if(we[day] && we[day].dayOfWeek){
          let dayOfWeek = moment(we[day].dayOfWeek).format("DD/MM/YYYY").toString();
            let test = this.weekEmployeeData.find(a=>a.employeeId == we.employeeId).shifts.find(a=>(moment(a.dayOfWeek).format("DD/MM/YYYY").toString()) == dayOfWeek);
            test.dutyId = we[day].dutyId;
            test.dutyDescriptionFl = we[day].nameFl;
            test.dutyDescriptionSl = we[day].nameSl;
          }
        });        
      });
    }
    else{
      this.monthEmployees.forEach(we =>{
        this.monthKeys.forEach(day => {     
          if(we[day] && we[day].dayOfWeek){
            let dayOfMonth = moment(we[day].dayOfWeek).format("DD/MM/YYYY").toString();
            let test = this.monthEmployeeData.find(a=>a.employeeId == we.employeeId).shifts.find(a=>(moment(a.dayOfWeek).format("DD/MM/YYYY").toString()) == dayOfMonth);
            test.dutyId = we[day].dutyId;
            test.dutyDescriptionFl = we[day].nameFl;
            test.dutyDescriptionSl = we[day].nameSl;
          }

        });        
      });
    }

   
  }

  // check if the selected employee in week employee array from advanced search is in the list or not
  checkIfWeekEmployeeIsAdded(employee: WeekEmployee): void {
    
    const index = this.weekEmployees.findIndex(x => x.employeeId == employee.employeeId);
    if (index === -1) {
      this.weekEmployees.push(employee);
    } else {
      // this will remove current element and add the new one to make the shifst filled
      this.weekEmployees.splice(index, 1);
      this.weekEmployees.push(employee);
    }
  }
  // initialize month employees
  initializeMonthEmployees(copy?: boolean, copyShifts?: any[], isOverride?: boolean): void {
    
    this.monthEmployeeData.forEach((employee) => {
      let monthEmployee: MonthEmployee = {};
      monthEmployee.employeeId = employee.employeeId;
      monthEmployee.employeeName = employee.employeeName;
      monthEmployee.employeeNameAr = employee.employeeNameAr;
      monthEmployee.employeeNumber = employee.employeeNumber;
      monthEmployee.employeeType = 'Month';
      this.monthKeys.forEach(key => {
        let copyShift:any[] = [];
        if(copyShifts && copyShifts.length !== 0){
          copyShift = copyShifts.filter(a=>a.employeeId == employee.employeeId)[0].shifts;
        }
        let shift = this.mapShift(employee.shifts, key, copy, copyShift,isOverride);
        monthEmployee[key] = shift;
      });
      this.checkIfMonthEmployeeIsAdded(monthEmployee);
    });
    this.mapCalenderEmployeeData('Month');

  }
  // check if the selected employee in month employee array from advanced search is in the list or not
  checkIfMonthEmployeeIsAdded(employee: MonthEmployee): void {
    
    const index = this.monthEmployees.findIndex(x => x.employeeId == employee.employeeId);
    if (index === -1) {
      this.monthEmployees.push(employee);
    } else {
      // this will remove current element and add the new one to make the shifst filled
      this.monthEmployees.splice(index, 1);
      this.monthEmployees.push(employee);
    }
  }
  // map backend shift with frontend shift
  mapShift(empShifts?: any[], key?: string, copy?: boolean, copyShifts?: any[], isOverride?: boolean): Shift {
    let empShift = empShifts.find(x => x.propertyName == key);   
    let shift: Shift = {};
    if (empShift) {
      if(copy == true){
        let copyShift = copyShifts.find(x => x.propertyName == key);

        shift.dayOfWeek = empShift.dayOfWeek;
        shift.nameSl = ((isOverride == false &&  empShift.dutyId) || empShift.isDifferent) ? empShift.dutyDescriptionSl : copyShift.dutyDescriptionSl;
        shift.nameFl = ((isOverride == false &&  empShift.dutyId) || empShift.isDifferent) ? empShift.dutyDescriptionFl : copyShift.dutyDescriptionFl;
        shift.dutyId = ((isOverride == false &&  empShift.dutyId) || empShift.isDifferent) ? empShift.dutyId : copyShift.dutyId;
        shift.isDifferent =  (empShift.dutyId && empShift.isDifferent) ? true : copyShift.isDifferent;
        shift.isChanged = true;
      }
      else{
        shift.dayOfWeek = empShift.dayOfWeek;
        shift.nameSl = empShift.dutyDescriptionSl;
        shift.nameFl = empShift.dutyDescriptionFl;
        shift.dutyId = empShift.dutyId;
        shift.isDifferent = empShift.isDifferent;
        shift.isChanged = false;
      }  
    }    
    return shift;
  }
  /* set background color of the cell if its different duty */
  setBackGroundColor(shift: Shift) {
    if (shift.isDifferent) {
      return 'linear-gradient(60deg, #e81349, #e73318 , #e7183e)';
    }
  }
  /* get keys  names */
  getKeysNames() {
    this.getWeekDayNames();
    this.getMonthDaysNames();
  }
  /* get week days keys */
  getWeekDayNames(): void {
    let weekEmp = new WeekEmployee();
    this.weekKeys = Object.keys(weekEmp);
  }
  /* get month days keys */
  getMonthDaysNames(): void {
    
    let monthEmp = new MonthEmployee();
    this.monthKeys = Object.keys(monthEmp);
    this.getMonthDaysNumber();
  }
  /* remove the number of days from onth days keys depending on the month days number*/
  getMonthDaysNumber(): void {
    
    switch (this.monthDaysCount) {
      case 31: {
        return;
      }
      case 30: {
        this.removeMonthDays(30, 1);
        return;
      }
      case 29: {
        this.removeMonthDays(29, 2);
        return;
      }
      case 28: {
        this.removeMonthDays(28, 3);
        return;
      }
    }
  }
  /*remove the extra month days in the month days keys*/
  removeMonthDays(index?: number, dyasNumber?: number): void {
    this.monthKeys.splice(index, dyasNumber);
  }
  /* start date functions */
  /* get the all days of the month */
  getMonthDays(year?: number, month?: number) {
    let count = 0;
    let date = new Date(year, month, 1);
    let dates = new ShiftDate();
    while (date.getMonth() === month) {
      dates.dates.push(moment.parseZone(new Date(date)).format('L LT'));
      date.setDate(date.getDate() + 1);
      count++;
    }
    // set the number of month days to get the correct month days number
    this.monthDaysCount = dates.dates.length;
    this.initializeColumns(dates, ColumnType.Month);
  }
  /* get the start and end of the week and set the columns of the week grid */
  getDaysOfCurrentMonth(d?: Date, nextOrPrevious?: string) {  
      
    //let day = d.getDay();
    let dayDate = moment(d, 'DD-MM-YYYY').toDate();
    if (nextOrPrevious == 'next') 
    {
       dayDate = moment(d, 'DD-MM-YYYY').add(1, 'months').toDate();
    } 
    else 
    {
       dayDate = moment(d, 'DD-MM-YYYY').subtract(1, 'months').toDate();
    }
    let firstDay = new Date(dayDate.getFullYear(), dayDate.getMonth(), 1);
    let lastDay = new Date(dayDate.getFullYear(), dayDate.getMonth() + 1, 0);

    

    this.startDate = moment.parseZone(JSON.parse(JSON.stringify(this.dateFormatHelper(firstDay)))).format('L LT');
    this.selectedDate = dayDate;
    
    this.endDate = moment.parseZone(lastDay).format('L LT');
    let dates = new ShiftDate();
    let i = 0;
    let stDate = firstDay;
    while (stDate <= lastDay) {
      dates.dates.push(moment.parseZone(new Date(stDate)).format('L LT'));
      stDate.setDate(stDate.getDate() + 1);
    }
    this.currentWeekDate = dayDate;
    this.initializeColumns(dates, ColumnType.Month);
  }
  /* get the start and end of the week and set the columns of the week grid */
  getDaysOfCurrentWeek(d?: Date) {
    
    let day = d.getDay();
    let firstDay = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate() + (day == 6 ? 6 : -1) - day
    );

    let lastDay = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDate() + 6
    );
    this.startDate = moment.parseZone(JSON.parse(JSON.stringify(this.dateFormatHelper(firstDay)))).format('L LT');
    this.selectedDate = null;
    // set the selected date to the start of the next week or pervious week when date changes from arrows
    this.setSelectedDate(firstDay);
    this.endDate = moment.parseZone(lastDay).format('L LT');
    let dates = new ShiftDate();
    let i = 0;
    while (firstDay <= lastDay) {
      dates.dates.push(moment.parseZone(new Date(firstDay)).format('L LT'));
      i++;
      firstDay.setDate(firstDay.getDate() + 1);
      if (i == 7) {
        break;
      }
    }
    
    this.initializeColumns(dates, ColumnType.Week);
  }
  /* get next week */
  getNextWeek(nextOrPrevious?: string, copy?:boolean): void {
    
    let today = new Date(this.currentWeekDate);
    let nextWeek;
    if (nextOrPrevious == 'next') {
      nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    } else {
      nextWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    
    this.currentWeekDate = nextWeek;
    this.getDaysOfCurrentWeek(nextWeek);
    this.SetOldData(copy);
  }

  getNextMonth(nextOrPrevious?: string, copy?:boolean): void {
    
    let today = new Date(this.selectedDate);
    this.getDaysOfCurrentMonth(today, nextOrPrevious);
    this.SetOldData(copy);
  }
  /* set selected date on press next or previous */
  /* this removes utc component */
  setSelectedDate(firstDay?: Date): void {
    this.selectedDate = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDate() + 1);
  }
  /* set the columns of the week grid */
  initializeColumns(dates?: ShiftDate, columnType?: ColumnType) {
    
    let columns: Column[] = [];
    dates.dates.forEach((date) => {
      let stringDate = new Date(date).toDateString();
      let keys: string[] = stringDate.split(' ');
      let column: Column = {
        field:
          columnType == ColumnType.Week
            ? keys[0].toLowerCase()
            : 'day' + keys[2],
        header:
          columnType == ColumnType.Week
            ? this.setColumnHeader(keys[0], ShortHand.Long)
            : this.setColumnHeader(keys[0], ShortHand.Short),
        month: keys[1],
        day: keys[2],
        year: keys[3],
        columnDate: date,
      };
      columns.push(column);
    });
    
    if (columnType == ColumnType.Week) {
      this.weekColumns = [...columns];
    } else {
      this.monthColumns = [...columns];
    }
    console.log(" this.weekColumns == ",  this.weekColumns);
    
  }
  setColumnHeader(day?: string, shortHand?: ShortHand): string {
    switch (day) {
      case Day.Sat: {
        if (shortHand == ShortHand.Long) {
          return 'Saturday';
        }
        return 'Saturday';
      }
      case Day.Sun: {
        if (shortHand == ShortHand.Long) {
          return 'Sunday';
        }
        return 'Sunday';
      }
      case Day.Mon: {
        if (shortHand == ShortHand.Long) {
          return 'Monday';
        }
        return 'Monday';
      }
      case Day.Tue: {
        if (shortHand == ShortHand.Long) {
          return 'Tuesday';
        }
        return 'Tuesday';
      }
      case Day.Wed: {
        if (shortHand == ShortHand.Long) {
          return 'Wednesday';
        }
        return 'Wednesday';
      }
      case Day.Thu: {
        if (shortHand == ShortHand.Long) {
          return 'Thursday';
        }
        return 'Thursday';
      }
      case Day.Fri: {
        if (shortHand == ShortHand.Long) {
          return 'Friday';
        }
        return 'Friday';
      }
    }
  }
  /* get column date */
  /* week column date */
  getWeekColumnDate(day?: string): Date {
    let column = this.weekColumns.find((x) => x.field == day);
    if (column) {
      return column.columnDate;
    }
  }
  /* month column date */
  getMonthColumnDate(day?: string): Date {
    let column = this.monthColumns.find((x) => x.field == day);
    if (column) {
      return column.columnDate;
    }
  }
  /* end date functions */
  openShiftModal(
    employee?: any,
    day?: string,
    mode?: Mode,
    calendarType?: string,
    shift?: Shift
  ): void | boolean {
    if (shift.isDifferent) {
      return false;
    }
    const dialogRef = this.dialog.open(ShiftModalComponent, {
      width: '350px',
      data: { mode:mode, oldDutyId :shift.dutyId},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == undefined) {
        return;
      }
      this.addShift(employee, day, result.data, mode, calendarType);
    });
  }
  openCopyOptionsModal(nextOrPrevious?: string): void {
    const dialogRef = this.dialog.open(CopyOptionsComponent, {
      width: '500px',
      data: { currentdate:this.selectedDate, calendarType :this.showMonth ? "month" : "week"},

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result == ", result);
    
      this.selectedDate = result.date;
      if (this.showWeek) {
        this.getDaysOfCurrentWeek(this.selectedDate);
      } else {
        this.getMonthDays(this.selectedDate.getFullYear(),
          this.selectedDate.getMonth());
      }
      this.getMonthDaysNames();
      
      if(result.saveAndCopy){
        this.save();
      }
     this.SetOldData(true,result.isOverride);

    });
  }
  openDeleteOptionsModal(employee: any): void {
    const dialogRef = this.dialog.open(DeleteOptionsComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeOrResetEmployeeShifts(employee, result.option);
      } else {
        return false;
      }
    });
  }
  addShift(
    employee: any,
    day?: string,
    shift?: Shift,
    mode?: Mode,
    calendarType?: string
  ) {
    switch (mode) {
      case Mode.Cell: {
        this.addShiftPerCell(employee, day, shift);
        return;
      }
      case Mode.Horizontal: {
        this.addShiftAllHorizontal(employee, shift);
        this.mapCalenderEmployeeData(calendarType);
        return;
      }
      case Mode.Vertical: {
        this.addShiftVertical(day, shift, calendarType);
        this.mapCalenderEmployeeData(calendarType);
        return;
      }
    }

  }
  /*  Modifying Shifts functions */
  /* add duty for the whole week days */
  addShiftAllHorizontal(employee?: any, shift?: Shift): void {
    if (employee.employeeType == 'Week') {
      this.addShiftForAllWeek(employee, shift);
    } else {
      this.addShiftForAllMonth(employee, shift);
    }
  }
  /* add duty for all week days for one employee */
  addShiftForAllWeek(employee?: WeekEmployee, shift?: Shift): void {
    this.weekKeys.forEach((key) => {
      if (!employee[key].isDifferent) {
        employee[key] = this.assignNewShift(key, shift, 'Week');

      }
    });
  }
  /* add duty for all month days for one employee */
  addShiftForAllMonth(employee?: MonthEmployee, shift?: Shift): void {
    
    this.monthKeys.forEach((key) => {
      if (!employee[key].isDifferent) {
        employee[key] = this.assignNewShift(key, shift, 'Month');
      }
    });
  }
  /* add  duty for all employees in one day */
  addShiftVertical(day?: string, shift?: Shift, calendarType?: string): void {
    
    if (calendarType == 'Week') {
      this.addShiftForAllWeekEmployee(day, shift);
    } else {
      this.addShiftForAllMonthEmployee(day, shift);
    }
  }
  /* add duty for all employee in Week calender */
  addShiftForAllWeekEmployee(day?: string, shift?: Shift): void {
    this.weekEmployees.forEach((employee) => {
      if (!employee[day].isDifferent) {
        employee[day].isDifferent = false;
        employee[day].isChanged = true;
        employee[day] = shift;
        employee[day].dayOfWeek = dateFormat(this.getWeekColumnDate(day), 'isoDateTime', false);
      }
    });
  }
  /* add duty for all employee in month calender */
  addShiftForAllMonthEmployee(day?: string, shift?: Shift): void {
    this.monthEmployees.forEach((employee) => {
      if (!employee[day].isDifferent) {
        employee[day] = shift;
        employee[day].isDifferent = false;
        employee[day].isChanged = true;
        employee[day].dayOfWeek = dateFormat(this.getMonthColumnDate(day), 'isoDateTime', false);
      }
    });
  }
  /* add duty per cell for selected employee */
  addShiftPerCell(employee?: any, day?: string, shift?: Shift): void | boolean {
    if (employee[day].isDifferent) {
      this.Alert.showError(this.localize.translate.instant('Message.noModifyDuty'));
      return false;
    }
    // let dutyChanged = false;
    // if (employee[day].dutyId !== shift.dutyId) 
    // {
    //   dutyChanged = true;    
    // }
    employee[day] = shift;
    // if (dutyChanged) {
    //   employee[day].isChanged = true;
    // }
    // else{
    //   employee[day].isChanged = false;
    // }
    employee[day].isDifferent = false;
    if(employee.employeeType == 'Week'){
      employee[day].dayOfWeek = dateFormat(this.getWeekColumnDate(day), 'isoDateTime', false);
      let test = this.weekEmployeeData.find(a=>a.employeeId == employee.employeeId).shifts.find(a=>a.dayOfWeek == employee[day].dayOfWeek);
      test.dutyId = shift.dutyId == undefined? null : shift.dutyId;
      test.dutyDescriptionFl = shift.nameFl;
      test.dutyDescriptionSl = shift.nameSl;
    }
    else{
        employee[day].dayOfWeek = dateFormat(this.getMonthColumnDate(day), 'isoDateTime', false);
        let test = this.monthEmployeeData.find(a=>a.employeeId == employee.employeeId).shifts.find(a=>a.dayOfWeek == employee[day].dayOfWeek);
        test.dutyId = shift.dutyId == undefined? null : shift.dutyId;
        test.dutyDescriptionFl = shift.nameFl;
        test.dutyDescriptionSl = shift.nameSl;      
    }
    
  }
  assignNewShift(day?: string, shift?: Shift, employeeType?: string): Shift {
    let newShift = new Shift();
    newShift = JSON.parse(JSON.stringify(shift));
    newShift.dayOfWeek =
      employeeType == 'Week'
        ? this.getWeekColumnDate(day)
        : this.getMonthColumnDate(day);
        
    return newShift;
  }
  /* copy functions */
  copyOptions(option?: OptionType, nextOrPrevious?: string): void {
    switch (option) {
      case OptionType.NoCopyNoSave: {
        this.noCopyNoSave(nextOrPrevious);
        return;
      }
      case OptionType.CopyWitoutSave: {
        this.copyWithNoSave(nextOrPrevious);
        return;
      }
      case OptionType.SaveAndFree: {
        this.saveWithNoCopy(nextOrPrevious, option);
        return;
      }
      case OptionType.SaveAndCopy: {
        this.saveAndCopy(nextOrPrevious, option);
      }
    }
  }
  /* remove Shifts Functions */
  /* remove week emplyee shifts */
  removeOrResetEmployeeShifts(employee?: any, optionType?: OptionType): void {
    switch (optionType) {
      case OptionType.Remove: {
        this.removeEmployeeFromList(employee);
        return;
      }
      case OptionType.Reset: {
        this.resetEmployeeShifts(employee);
        return;
      }
      case OptionType.Delete: {
        this.DeleteEmployeeDuty(employee);
        return;
      }
    }
  }
  removeAllEmployees(): void {
    this.weekEmployees = [];
    this.monthEmployees = [];
  }
  /* remove  emplyee shifts */
  removeEmployeeFromList(employee?: any): void {
    this.removeEmployee(employee);
    // if (employee.employeeType == 'Week') {
    //   this.removeWeekEmployee(employee);
    // } else {
    //   this.removeMonthEmployee(employee);
    // }
  }
  /* reset employee shifts */
  resetEmployeeShifts(employee?: any): void {
    if (employee.employeeType == 'Week') {
      this.resetWeekEmployeeShifts(employee);
    } else {
      this.resetMonthEmployeeShifts(employee);
    }
  }
  // /* remove employee from table list */
  // /* remove  employee from the list of the week data tabel */
  // removeWeekEmployee(employee?: WeekEmployee): void {
  //   let index = this.weekEmployees.findIndex((x) => x.employeeId == employee.employeeId);
  //   this.weekEmployees.splice(index, 1);
  //   let index2 = this.employees.findIndex((x) => x.employeeId == employee.employeeId);
  //   
  //   this.employees.splice(index2, 1);
  // }
  // /* remove  employee from the list of the month data tabel */
  // removeMonthEmployee(employee?: WeekEmployee): void {
  //   let index = this.monthEmployees.findIndex((x) => x.employeeId == employee.employeeId);
  //   this.monthEmployees.splice(index, 1);
  //   let index2 = this.employees.findIndex((x) => x.employeeId == employee.employeeId);
  //   this.employees.splice(index2, 1);
  // }

  removeEmployee(employee?: WeekEmployee): void {
    let index = this.monthEmployees.findIndex((x) => x.employeeId == employee.employeeId);
    this.monthEmployees.splice(index, 1);
    let index3 = this.weekEmployees.findIndex((x) => x.employeeId == employee.employeeId);
    this.weekEmployees.splice(index3, 1);
    let index2 = this.employees.findIndex((x) => x.employeeId == employee.employeeId);
    this.employees.splice(index2, 1);   
  }

  DeleteEmployeeDuty(employee?: WeekEmployee){
    this.setStartAndEndDate();
    let testSearch = new EmployeesDateDayDto();
    testSearch.employeeIds.push(employee.employeeId);
    let dayDate = new DateFilter();
    dayDate.startDate = this.dateFilters.startDate;
    dayDate.endDate = this.dateFilters.endDate; 
    testSearch.dateFilter = dayDate;

    this.Service.postQueryParamsReq(
      'EmployeeFixedDutyPeriods/Delete',
      testSearch
    ).subscribe((response: any) => {
      this.Alert.showSuccess(this.localize.translate.instant('Message.DeleteSuccess'));
      this.removeEmployeeFromList(employee);
    }, error => {
      this.Alert.showError(this.getErrorMessage(error));

    });
  }

  // delet all duteies and employees from schedual unused till now 
  DeleteAllEmployeeDuties(){
    this.setStartAndEndDate();
    let testSearch = new EmployeesDateDayDto();
    testSearch.employeeIds = this.employees.map(a=>a.employeeId);
    let dayDate = new DateFilter();
    dayDate.startDate = this.dateFilters.startDate;
    dayDate.endDate = this.dateFilters.endDate; 
    testSearch.dateFilter = dayDate;

    this.Service.postQueryParamsReq(
      'EmployeeFixedDutyPeriods/Delete',
      testSearch
    ).subscribe((response: any) => {
      this.Alert.showSuccess(this.localize.translate.instant('Message.DeleteSuccess'));
      this.SetOldData(false);
      // this.initializeData();
      //  this.monthEmployees = [];
      //  this.weekEmployees = [];
      //  this.employees = [];  
    }, error => {
      this.Alert.showError(this.getErrorMessage(error));

    });
  }
  
  openConfirmDialog(): void {
    let confirmTitle = "lockYears.confirmDuties";
    let confirmMessage = "lockYears.confirmDutiesMessage";
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { message : confirmMessage, title : confirmTitle }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == undefined || result.data == false) 
      {  return;  }
      this.DeleteAllEmployeeDuties();
    });
  }

  /* reset week employee shifts */
  resetWeekEmployeeShifts(employee?: WeekEmployee): void {
    
    this.weekKeys.forEach((key) => {
      if (!employee[key].isDifferent) {
        employee[key] = {};
      }
    });
  }
  /* reset month employee shifts */
  resetMonthEmployeeShifts(employee?: MonthEmployee): void {
    this.monthKeys.forEach((key) => {
      if (!employee[key].isDifferent) {
        employee[key] = {};
      }
    });
  }
  freeAllWeekEmployeesShifts(): void {
    this.weekEmployees.forEach((employee: WeekEmployee) => {
      this.resetWeekEmployeeShifts(employee);
    });
  }
  freeAllMonthEmployeesShifts(): void {
    this.monthEmployees.forEach((employee: MonthEmployee) => {
      this.resetMonthEmployeeShifts(employee);
    });
  }
  /* options functions */
  /* no copy no save option */
  noCopyNoSave(nextOrPrevious?: string): void {
    if (this.showWeek) {
      this.freeAllWeekEmployeesShifts();
    } else {
      this.freeAllMonthEmployeesShifts();
    }
    if(this.showMonth){
      this.getNextMonth(nextOrPrevious, false);
    }
    else{
      this.getNextWeek(nextOrPrevious, false);
    }
  }
  /* copy no save option */
  copyWithNoSave(nextOrPrevious?: string): void {
    if(this.showMonth){
      this.getNextMonth(nextOrPrevious, true);
    }
    else{
      //this.CalenderShow = false;
      this.getNextWeek(nextOrPrevious, true);
    }
    
  }
  /* save  no copy option */
  saveWithNoCopy(nextOrPrevious?: string, option?: OptionType): void {
    this.saveOptions(nextOrPrevious, option);
  }
  /*  copy and save option */
  saveAndCopy(nextOrPrevious?: string, option?: OptionType): void {
    this.saveOptions(nextOrPrevious, option);
  }

  /* save functions */
  /* save function */
  saveOptions(nextOrPrevious?: string, option?: OptionType): void {
    switch (option) {
      case OptionType.SaveAndFree: {
        this.saveAndFree(nextOrPrevious);
        return;
      }
      case OptionType.SaveAndCopy: {
        this.saveAndTake(nextOrPrevious);
        return;
      }
      case OptionType.Assign: {
        this.save();
      }
    }
  }
  /* save without copying shifts */
  saveAndFree(nextOrPrevious?: string): void {
    this.save();
    if(this.showMonth){
      this.getNextMonth(nextOrPrevious, false);
    }
    else{
      this.getNextWeek(nextOrPrevious, false);
    }
  }
  /* save and copy shifts */
  saveAndTake(nextOrPrevious?: string): void {
    this.save();
    if(this.showMonth){
      this.getNextMonth(nextOrPrevious, true);
    }
    else{
      this.getNextWeek(nextOrPrevious, true);
    }
  }
  /* save at same page with save button */
  save(): void {
    let employees = this.format().filter(a=>a.shifts.length > 0);
    console.log(employees);
     
    this.shiftService.save(employees).subscribe((result: any) => {
      this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
    }, error => {
      this.Alert.showError(this.getErrorMessage(error));
    });

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
  format(): Employee[] {
    
    let result: Employee[] = [];
    if (this.showWeek) {
      result = this.weekEmployees.map((employee) => ({
        employeeId: employee.employeeId,
        employeeName: employee.employeeName,
        employeeNameAr: employee.employeeNameAr,
       employeeNumber : employee.employeeNumber,

        shifts: this.mapEmployeeShifts(employee),
      }));
      return result;

    } else {
      
      result = this.monthEmployees.map((employee) => ({
        employeeId: employee.employeeId,
        employeeName: employee.employeeName,
        employeeNameAr: employee.employeeNameAr,
        employeeNumber : employee.employeeNumber,

        shifts: this.mapEmployeeShifts(employee),
      }));
      return result;
    }

  }
  mapEmployeeShifts(employee?: any): Shift[] {
    
    
    let shifts: Shift[] = [];
    if (this.showWeek) 
    {
      this.weekKeys.forEach((key) => {
        let shift: Shift;
        if (employee[key] && employee[key].isChanged && !employee[key].isDifferent) {
          shift = employee[key];
          shifts.push(shift);
        }
      });
      return shifts;
    } 
    else {
      
      this.monthKeys.forEach((key) => {
        let shift: Shift;
        if (employee[key] && employee[key].isChanged && !employee[key].isDifferent) {
          shift = employee[key];
          shifts.push(shift);
        }
      });
      return shifts;
    }

  }

  /* external script for formatting date */

  dateFormatHelper(date: Date) {
    let formattedDate = dateFormat(date, 'isoDateTime', false);
    return formattedDate;
  }


  SetOldData(copy?: boolean,isOverride?: boolean){
    
    this.loaderService.show();
    this.setStartAndEndDate();
    let testSearch = new FixedPeriodDutyCalender();
    testSearch.monthEmployeeDtos = this.employees;
    testSearch.startDate = this.dateFilters.startDate;
    testSearch.endDate = this.dateFilters.endDate;
    //testSearch.firstSearchType =  'init';

    this.Service.postQueryParamsReq(
      'EmployeeFixedDutyPeriods/SetOldEmployeeDuty',
      testSearch
    ).subscribe((response: any) => {
      
      this.loaderService.hide();   
      let isDifferentEmployees = [];
      response.forEach(element => {
        let rr = element.shifts.find(a=>a.isDifferent == true);
        if(rr != null) {
          isDifferentEmployees.push(element.employeeId);
        };
      });
      if(copy){
        if(this.showWeek){
          // let rrrr = response.filter(a=> !isDifferentEmployees.includes(a.employeeId));
          // this.weekEmployeeData= this.weekEmployeeData.filter(a=> !isDifferentEmployees.includes(a.employeeId));
          // this.weekEmployees= this.weekEmployees.filter(a=> !isDifferentEmployees.includes(a.employeeId));
          this.weekEmployeeData.forEach(element => {
            element.shifts.forEach(shift => {
              if(shift.isDifferent){
                shift.dutyId = null;
                shift.dutyDescriptionFl = '';
                shift.dutyDescriptionSl = '';    
              }
            });
          });
          // this.employees = rrrr;
          this.initializeData(response,copy, this.weekEmployeeData,isOverride);
        }
        else{
          // let rrrr = response.filter(a=> !isDifferentEmployees.includes(a.employeeId));
          // this.monthEmployeeData= this.monthEmployeeData.filter(a=> !isDifferentEmployees.includes(a.employeeId));
          // this.monthEmployees= this.monthEmployees.filter(a=> !isDifferentEmployees.includes(a.employeeId));
          this.monthEmployeeData.forEach(element => {
            element.shifts.forEach(shift => {
              if(shift.isDifferent){
                shift.dutyId = null;
                shift.dutyDescriptionFl = '';
                shift.dutyDescriptionSl = '';
    
              }
            });
          });
          // this.employees = rrrr;
          this.initializeData(response,copy, this.monthEmployeeData,isOverride);
        }
      }
      else{
        this.initializeData(response);
      }



    });
  }

  FillSchedule() {
    
    this.loaderService.show();
    this.setStartAndEndDate();
    let testSearch = new Search();
    testSearch.advancedSearchDto = new advancedSearch();
    

    testSearch.dateFilterDto = this.dateFilters;
    testSearch.dateFilterDto.searchType = 'init';
    console.log("testSearch",testSearch);
    
    this.Service.postQueryParamsReq(
      'EmployeeFixedDutyPeriods/Fill',
      testSearch
    ).subscribe((response: any) => {
      this.loaderService.hide();    
      this.employees = response;
      this.initializeData(response);
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
}
