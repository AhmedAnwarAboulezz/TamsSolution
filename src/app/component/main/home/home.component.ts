import { Component, OnInit, Compiler } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ChartDataSets } from 'chart.js';
import { HomeService } from './services/home.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from '../../shell';
import * as moment from 'moment';
import { TreeNode } from 'src/app/shared/components/tree/models/tree';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/AlertService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }

  homeData: any;
  cardsLastUpdate: any;
  cards: any[];
  events = [];
  eventsEN =[];
  options = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    height: 400,
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    editable: true,

  };
  optionsar = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    height: 400,
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    editable: true,
    locale:  'ar' ,
  };

  // PieChart General Colors
  maincolors = ['#1759d3', '#1dd317', '#990e29', '#3a087d', '#dde55c', '#0cb5e7', '#eb6c22', '#fa60d9', '#3bf2b79e', '#ff1b1be0'];

  // init piechrt object
  hiddenColors = ['#1759d3', '#1dd317', '#990e29', '#3a087d', '#dde55c', '#0cb5e7', '#eb6c22', '#fa60d9', '#3bf2b79e', '#ff1b1be0'];
  hiddenLables = ['Test1', '#Test2', 'Test3', '#Test4', 'Test5', '#Test6', 'Test7', '#Test8', 'Test9', '#Test10'];
  hiddenValues = [11, 30, 5, 8, 25, 17, 7, 4, 13, 22];

  // colors
  permissionColors = [];
  vacationColors = [];
  allowanceColors = [];
  dutyColors = [];
  shiftColors = [];
  employeeColors = ['#FFF59D', '#81D4FA', '#80CBC4', '#F48FB1', '#FFCC80'];

  // labels
  vacationLabels = [];
  permissionlabels = [];
  allowanceLables = [];
  dutyLables = [];
  employeeLabelsSl = [
    'بيانتهم غير مكتملة',
    'ينتهي انتدابهم قريبا',
    'ادارات بدون مدير',
    'ينتهي تاريخ عملهم قريبا',
    'تنتهي تصاريح اليوم الكامل لهم قريبا'
  ];
  employeeLabelsFl = [
    'UnComplete-Data Employees',
    'Employee Temporary Adminstration Expire',
    'Department With No Manager',
    'Expiring Period Employee',
    'Employee FullDay Expire'
  ];
  
  employeeLabelUrl = [
    "main/usermanagement/uncomplete-employee-dashboard",
    "main/usermanagement/emp-temp-admin-expire-dashboard",
    "main/lookups/adminstrative-witoutmanger-dashboard",
    "main/usermanagement/employee-expire-date-dashboard",
    "main/permissions/employee-fullday-expire-dashboard"
  ];
  permissionlabelsFl = [];
  permissionlabelsSl = [];

  // data
  permissions = [];
  vacations = [];
  allowances = [];
  duties = [];
  dutieslabelsFl = [];
  dutieslabelsSl = [];
  shifts = [];
  shiftsFl = [];
  shiftsSl = [];
  employeeStatusData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'Employees', barThickness: 50 }
  ];
  employeeStatusDataSl: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'حالة الموظفين', barThickness: 50 }
  ];
  employeeStatusDataFl: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'Employees', barThickness: 50 }
  ];

  // Show/Hide
  vacationPieChart = false;
  permissionPieChart = false;
  allowancePieChart = false;
  shiftChart = false;
  dutyChart = false;
  holidayCalender = false;
  haveEmployeeData = false;
  showLoader = true;

  constructor(private _compiler: Compiler,
              private homeService: HomeService,
              public http: HttpClient,
              public storageService: StorageService,
              public httpService: HttpService,
              private router: Router,
              public authService: AuthService,

  ) {
    let getdataStorage: any = localStorage.hasOwnProperty('homeData') ? localStorage.getItem('homeData') : false;
    this.homeData = JSON.parse(getdataStorage);
    let getdataStorage2: any = localStorage.hasOwnProperty('cardsLastUpdate') ? localStorage.getItem('cardsLastUpdate') : false;
    this.cardsLastUpdate = JSON.parse(getdataStorage2);
    //this.checkOtherUserIn();
    this.loadtree();
    this.getLeaves();
    this.getFullDayPermissions();
    this.getAllowances();
    this.getDuties();
    this.getShifts();
    this.getHolidays();
    this.getEmployees();
    let test = this.cardsLastUpdate != false ? moment(this.cardsLastUpdate) : false;
    let todayDate = moment(new Date());
    let daydifference = test != false ? todayDate.diff(test, 'hours') + 1 : 0;

    if (test != false && daydifference == 1) {
      this.cards = this.homeData;
      this.showLoader = false;
    } else {
      this.getCards();
    }
  }

  // checkOtherUserIn(){
  //   this.homeService.IsLoginFromOtherDeviceRequest().subscribe(res=>
  //     {         
  //     }, async error => {
  //       await this.authService.logout();
  //       this.storageService.removeStorgeByKey('cardsLastUpdate');
  //       this.storageService.removeStorgeByKey('homeData');
  //       this.storageService.removeStorgeByKey('TheTree');
  //       let organization = JSON.parse(localStorage.getItem('Organizations_data'));
  //       await this.router.navigate(['/login'], { queryParams: { code: organization.code } });
  //       this.Alert.showError(this.localize.translate.instant(error.error));  
  //     });
  // }
  loadtree() {
    let urltree = 'AdministrativeLevels/GetTree';
    let Treedata: any;
    this.http.get<TreeNode[]>(this.httpService.serverUrl + urltree).subscribe((res: TreeNode[]) => {
      Treedata = res;
      this.storageService.removeStorgeByKey('TheTree');
      this.storageService.setItem('TheTree', JSON.stringify(Treedata));
    });
  }
  ngOnInit() {
    this._compiler.clearCache();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    window.localStorage.setItem('homeData', JSON.stringify(this.cards));
  }
  getBackgroundColor(cardName) {
    return 'red';
  }
  getGradientColorForIcon(cardId) {
    switch (cardId) {
      case cardId = 1:
        return 'linear-gradient(60deg, #5e35b1, #039be5)';
      case cardId = 2:
        return 'linear-gradient(60deg, #654ea3, #eaafc8)';
      case cardId = 3:
        return 'linear-gradient(60deg, #2193b0, #6dd5ed)';
      case cardId = 4:
        return 'linear-gradient(60deg, #1f4037, #99f2c8)';
    }
  }

  getCards() {
    this.showLoader = true;
    this.homeService.getCardsData().subscribe((newData: any) => {
      let datenow = new Date();
      this.cardsLastUpdate = datenow;
      window.localStorage.setItem('cardsLastUpdate', JSON.stringify(datenow));

      let data =
        [newData[0].attendanceCount + ' / ' + newData[0].employeeCount, newData[1], newData[0].lateInCount, newData[0].earlyOutCount];

      if (this.homeData) {
        for (let i = 0; i < this.homeData.length; i++) {
          let elementId = this.homeData[i].id - 1;
          let value = data[elementId];
          this.homeData[i].itemvalue = value;
        }
        this.cards = this.homeData;
      } else {
        this.cards = [
          {
            id: 1,
            itemvalue: data[0],
            textFl: 'Attendance',
            textSl: 'الحضور',
            secondTextFl: 'no.of present employees / no.of employees shifts',
            secondTextSl: 'عدد الموظفين الحضور / عدد الموظفين للفترة الحالية',
            icon: 'person',
            cols: 1,
            rows: 1,
            hasSecondaryText: true,
            itemUnitFl: 'employee',
            itemUnitSl: 'موظف',
            color: '#484ebe',
            link: '/main/logs/employee-today-present'
          },
          {
            id: 2,
            itemvalue: data[1],
            textFl: 'Permissions',
            secondTextFl: 'total no.of permissions',
            itemUnitFl: 'permission',
            textSl: 'تصريح جزئى',
            secondTextSl: 'اجمالي عدد التصريحات',
            itemUnitSl: 'تصريح',
            icon: 'security',
            cols: 1,
            rows: 1,
            hasSecondaryText: true,
            color: '#7c5faa',
            link: '/main/permissions/employee-permissions-dashboard',

          },
          {
            id: 3,
            itemvalue: data[2],
            textFl: 'Late Signin',
            secondTextFl: 'Total Minutes Of Late Signin',
            itemUnitFl: 'minute',

            textSl: 'حضور متأخر',
            secondTextSl: 'عدد دقائق تأخر الحضور',
            itemUnitSl: 'دقيقة',
            icon: 'watch',
            cols: 1,
            rows: 1,
            hasSecondaryText: true,
            color: '#32a1bd',
            link: '/main/logs/employee-today-lateins'
          },
          {
            id: 4,
            itemvalue: data[3],
            textFl: 'Early Signout',
            secondTextFl: 'Total Minutes of Early Signout',
            itemUnitFl: 'minute',
            textSl: 'الخروج المبكر',
            secondTextSl: 'عدد دقائق الخروج المبكر',
            itemUnitSl: 'دقيقة',
            icon: 'accessibility',
            cols: 1,
            rows: 1,
            hasSecondaryText: true,
            color: '#345e50',
            link: '/main/logs/employee-today-earlyouts'
          }
        ];
        this.homeData = this.cards;
      }
      window.localStorage.setItem('homeData', JSON.stringify(this.cards));
      this.showLoader = false;
    });
  }

  getLeaves() {
    this.homeService.GetEmployeesLeavesForToday().subscribe(result => {
      if (result.values.length != 0) {
        this.vacationLabels = this.localize.lang == 'ar' ? result.namesSl : result.namesFl;
        this.vacationColors = this.generateColorArray(result.values.length);
        this.vacations = result.values;
        this.vacationPieChart = true;
      } else {

        this.vacationPieChart = false;
      }
    });
  }
  getFullDayPermissions() {
    this.homeService.GetEmployeeFullDayPermissionForToday().subscribe(result => {
      if (result.values.length != 0) {
        this.permissionlabels = this.localize.lang == 'ar' ? result.namesSl : result.namesFl;
        this.permissionlabelsFl = result.namesFl;
        this.permissionlabelsSl = result.namesSl;
        this.permissionColors = this.generateColorArray(result.values.length);
        this.permissions = result.values;
        this.permissionPieChart = true;
      } else {
        this.permissionPieChart = false;
      }
    });
  }
  getAllowances() {
    this.homeService.GetEmployeesAllowancesForToday().subscribe(result => {
      if (result.values.length != 0) {
        this.allowanceLables = this.localize.lang == 'ar' ? result.namesSl : result.namesFl;
        this.allowanceColors = this.generateColorArray(result.values.length);
        this.allowances = result.values;
        this.allowancePieChart = true;
      } else {
        this.allowancePieChart = false;
      }
    });
  }
  getDuties() {
    this.homeService.GetEmployeeDutyForToday().subscribe(result => {
      if (result.values.length != 0) {

        this.dutieslabelsFl = result.namesFl;
        this.dutieslabelsSl = result.namesSl;
        this.dutyColors = this.generateColorArray(result.values.length);
        this.duties = result.values;
        this.dutyChart = true;
      } else {
        this.dutyChart = false;
      }
    });
  }
  getShifts() {
    this.homeService.GetEmployeeShiftForToday().subscribe(result => {
      if (result.values.length != 0) {
        this.shiftsFl = result.namesFl;
        this.shiftsSl = result.namesSl;
        this.shiftColors = this.generateColorArray(result.values.length);
        this.shifts = result.values;
        this.shiftChart = true;
      } else {
        this.shiftChart = false;
      }
    });
  }

  ApplyHolidays(data,isAr=true) : any []  {
  let  events = [];
  data.forEach(obj => {
   // 
   let  holiday = { start:'' , end:'' ,title:''  } ;
    holiday.start= obj.start;
    holiday.end= obj.end;
    holiday.title= isAr  ? obj.titleSl :obj.titleFl ;
    events.push(holiday);
   }); 
   return events;
  }
  getHolidays() {
    this.homeService.GetPublicHolidaysCalender().subscribe(result => {
      if (result.length != 0) {
        this.events = this.ApplyHolidays(result);
        this.eventsEN = this.ApplyHolidays(result,false);
        this.holidayCalender = true;
      } else {
        this.holidayCalender = false;
      }
    });
  }
  getEmployees() {
    this.homeService.getEmployeeData().subscribe(result => {

      this.employeeStatusDataFl = [
        { data: result, label: 'Employees Status', barThickness: 50 }
      ];
      this.employeeStatusDataSl = [
        { data: result, label: 'حالة الموظفين', barThickness: 50 }
      ];
      this.haveEmployeeData = true;
    });
  }

  generateColorArray(limit: number): any {
    let newColors = [];
    for (let i = 0; i < limit; i++) {
      let index = i % this.maincolors.length;
      newColors.push(this.maincolors[index]);
    }
    return newColors;
  }


  onOptionsSelected(value){
    if(value !== null && value !== ''){
      //this.router.navigate([value]);
      window.open(value, '_blank')
    }
  }

  clickEvent(index){
    let url = this.employeeLabelUrl[index];
    window.open(url, '_blank');
  }

  PieClickEvent(value,index){
    let chartType = value == 0 ? 'Leave':
              value == 1 ? 'FullPermission': 'Allowance';
    let chartWithIndex = chartType + " --> "+ index
    console.log(chartWithIndex);
  }

}
