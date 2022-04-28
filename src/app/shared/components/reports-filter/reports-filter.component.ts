import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportFilter } from 'src/app/models/report-filter';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from 'src/app/component/shell';
import { Location } from 'src/app/models/location';
import { Job } from 'src/app/models/Job';
import { DutyType } from 'src/app/models/dutyType';
import { ContractType } from 'src/app/models/contracttype';
import { Qualification } from 'src/app/models/Qualification';
import { ReportFilterService } from './services/report-filter.service';
import { Duty } from 'src/app/models/Duty';
import { TreeComponent } from '../tree/components/tree/tree.component';
import { OptionControls } from './models/option-controls';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/AlertService';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePickerHeader } from '../datepicker-header.component';
import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import { Leavestype } from 'src/app/models/Leavestype';
import { EmployeeReportStatus } from 'src/app/enums/EmployeeReportStatus';
import { Nationality } from 'src/app/models/Nationality';

@Component({
  selector: 'app-reports-filter',
  templateUrl: './reports-filter.component.html',
  styleUrls: ['./reports-filter.component.scss']
})
export class ReportsFilterComponent implements OnInit {
  @Input() screenTitle: string;
  @Input() options: OptionControls = new OptionControls();
  @ViewChild(TreeComponent, null) tree: TreeComponent;
  @Input() action: string;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Service(): ReportFilterService { return Shell.Injector.get(ReportFilterService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  isLoading = false;
  statusList: any;
  group1 = [
    { id: '2', name: 'ReportFilter.location' },
  ];
  header = DatePickerHeader;
  months = [
    { val: '1', nameFl: 'Jan', nameSl: 'يناير' },
    { val: '2', nameFl: 'Feb', nameSl: 'فبراير' },
    { val: '3', nameFl: 'Mar', nameSl: 'مارس' },
    { val: '4', nameFl: 'Apr', nameSl: 'إبريل' },
    { val: '5', nameFl: 'May', nameSl: 'مايو' },
    { val: '6', nameFl: 'Jun', nameSl: 'يونيو' },
    { val: '7', nameFl: 'Jul', nameSl: 'يوليو' },
    { val: '8', nameFl: 'Aug', nameSl: 'أغسطس' },
    { val: '9', nameFl: 'Sep', nameSl: 'سبتمبر' },
    { val: '10', nameFl: 'Oct', nameSl: 'أكتوبر' },
    { val: '11', nameFl: 'Nov', nameSl: 'نوفمبر' },
    { val: '12', nameFl: 'Dec', nameSl: 'ديسمبر' }
  ];
  nationalities: Nationality[];
  years: number[] = [];
  locations: Location[];
  jobs: Job[];
  dutyTypes: DutyType[];
  duties: Duty[];
  contracts: ContractType[];
  leavetypes: any[];
  terminalSns: any[];
  logtypes: any[];
  partialPermissionTypes: any[];
  fullDayPermissionTypes: any[];
  allowanceTypes: any[];
  qualifications: Qualification[];
  serviceStatus: any[];
  isAbsent = false;
  unContinous = false;
  isLate = false;
  showDuty = false;
  form: FormGroup;
  model = new ReportFilter();
  lookupsFilter: any[];
  searchNow = false;
  constructor(public fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.form = fb.group({
      statusId: [this.model.statusId],
      nationalityIds: [this.model.nationalityIds],
      absenceTypeId: [this.model.absenceTypeId],
      absenceCount: [this.model.absenceCount],
      totalLate: [this.model.totalLate],
      locationId: [this.model.locationId],
      jobId: [this.model.jobId],
      dutyTypeId: [this.model.dutyTypeId],
      dutyId: [this.model.dutyId],
      contractId: [this.model.contractId],
      leaveTypeId: [this.model.leaveTypeId],
      partialPermissionTypeId: [this.model.partialPermissionTypeId],
      fullDayPermissionTypeId: [this.model.fullDayPermissionTypeId],
      allowanceTypeId: [this.model.allowanceTypeId],
      requestById: [this.model.requestById],
      qualificationId: [this.model.qualificationId],
      employeeId: [this.model.employeeId],
      startDate: [this.model.startDate],
      endDate: [this.model.endDate],
      month: [this.model.month],
      year: [this.model.year],
      groupBy: [this.model.groupBy],
      groupBy1: [this.model.groupBy1],
      isWeekend: [this.model.isWeekend],
      isRestday: [this.model.isRestday],
      isHoliday: [this.model.isHoliday],
      isPiChart: [this.model.isPiChart],
      isPaged: [this.model.isPaged],
      adminstrativeLevels: [this.model.adminstrativeLevels],
      serviceStatusId: [this.model.serviceStatusId],
      organizationName: [null],
      organizationLogo: [null],
      organizationId: [null],
      printType: [this.model.printType],
      isUnPaidLeave: [this.model.isUnPaidLeave],
      isExemptionSign: [this.model.isExemptionSign],
      actualAttendancePresent: [this.model.actualAttendancePresent],
      logTypeIds: [this.model.logTypeIds],
      terminalSn: [this.model.terminalSn]
    });
    this.getLookups();
    this.getYear();
  }

  openNationalityDrop() {
    var listids = this.form.get('nationalityIds').value;
    if (listids.some(e => e == 0))
      this.toggleSelectAllNationalities(true)

  }
  closeNationalityDrop() {
    var listids = this.form.get('nationalityIds').value;
    if (listids.some(e => e == 0))
      this.form.controls.nationalityIds.patchValue([0]);


  }
  toggleSelectAllNationalities(selected) {
    if (selected) {
      this.form.controls.nationalityIds
        .patchValue([...this.nationalities.map(item => item.id), 0]);
    } else {
      this.form.controls.nationalityIds.patchValue([]);
    }
  }
  toggleUnSelectAllNationalities(selected) {
    let selectedItems = this.form.controls.nationalityIds.value.filter(e => e != 0);
    if (selectedItems.length == this.nationalities.length) {
      selectedItems.push(0);
    }
    this.form.controls.nationalityIds.patchValue(selectedItems);
  }
  getLookups() {
    this.Service.getLookup().subscribe(elements => {
      this.locations = elements[0];
      this.jobs = elements[1];
      this.contracts = elements[2];
      this.qualifications = elements[3];
      this.dutyTypes = elements[4];
      this.serviceStatus = elements[5];
      this.statusList = elements[6];
      this.leavetypes = elements[7];
      this.partialPermissionTypes = elements[8];
      this.fullDayPermissionTypes = elements[9];
      this.allowanceTypes = elements[10];
      this.logtypes = elements[12];
      this.terminalSns = elements[13];
      this.nationalities = elements[11];
      let idsss: any[] = elements[11].map(a => a.id);
      idsss.push(0);
      this.form.controls.nationalityIds.setValue(idsss);
      this.nationalities = elements[11];
      // let idsss:any[] = elements[11].map(a=>a.id);
      //idsss.push(0);
      this.form.controls['nationalityIds'].setValue([0]);
      this.lookupsFilter = elements;
    });
  }
  ngOnInit() {
    this.changeGroup(1);
  }
  dutyTypeChange(dutyTypeId) {
    if (dutyTypeId != '00000000-0000-0000-0000-000000000000') {
      this.Service.getDuties(dutyTypeId).subscribe(data => {
        this.duties = data;
        this.showDuty = true;
      });
    } else {
      this.showDuty = false;
    }
  }

  setOrganizationData() {

    // tslint:disable-next-line:variable-name
    let Organizations_data = localStorage.getItem('Organizations_data');
    Organizations_data = JSON.parse(Organizations_data);
    if (Organizations_data) {
      // tslint:disable-next-line:no-string-literal
      let orgId = Organizations_data['id'];
      // tslint:disable-next-line:no-string-literal
      let orgName = this.localize.currentLang == 'Sl' ? Organizations_data['organizationNameSl'] : Organizations_data['organizationNameFl'];
      // tslint:disable-next-line:no-string-literal
      let orgLogo = this.localize.currentLang == 'Sl' ? Organizations_data['logoURLSl'] : Organizations_data['logoURLFl'];
      this.form.controls.organizationName.setValue(orgName);
      this.form.controls.organizationLogo.setValue(orgLogo);
    }
  }
  searchClick(printType) {
    this.searchNow = true;
    this.isLoading = true;

    this.setOrganizationData();
    let reportFilter = this.form.value;
    var listids = this.form.get('nationalityIds').value;
    if (listids.some(e => e == 0))
      reportFilter.nationalityIds = this.nationalities.map(item => item.id);

    reportFilter.printType = printType;

    if (!this.options.date) {
      reportFilter.startDate = moment.parseZone(new Date(reportFilter.year, this.options.month ? reportFilter.month - 1 : 0, 1))
        .format('L LT');
      reportFilter.endDate = moment.parseZone(new Date(reportFilter.year, this.options.month ? reportFilter.month : 12, 0))
        .format('L LT');
    }
    reportFilter.reportName = this.screenTitle;
    if (reportFilter.adminstrativeLevels !== null && reportFilter.adminstrativeLevels !== undefined &&
      reportFilter.adminstrativeLevels.some(e => typeof e === 'object')) {
      reportFilter.adminstrativeLevels = reportFilter.adminstrativeLevels.map(({ data }: any) => (data));
    }
    console.log('gg', reportFilter);

    this.Service.generateReport(this.action, reportFilter)
      .subscribe(response => {
        this.Service.downLoadFile(response,
          reportFilter.printType == 1 ? 'application/pdf'
            : reportFilter.printType == 2 ? 'application/msword' : 'application/vnd.ms-excel',
          reportFilter.printType == 1 ? 'pdf' :
            reportFilter.printType == 2 ? 'doc' : 'xls', reportFilter.reportName);
        this.isLoading = false;
        this.searchNow = false;
      }, () => {
        this.Alert.showError(this.localize.translate.instant('Message.noDataFound'));
        this.isLoading = false;
        this.searchNow = false;
      });
  }

  statusChange(value) {
    this.isAbsent = (value === EmployeeReportStatus.Absence);
    this.isLate = (value === EmployeeReportStatus.Late);
  }
  absentChange(value) {
    this.unContinous = (value !== 0);
    if (value === 1) { this.form.controls.absenceCount.setValue('2'); }
    if (value === 2) { this.form.controls.absenceCount.setValue('1'); }
  }

  reset() {
    this.form.reset(new ReportFilter());
    this.tree.loadData([], true);
  }
  getMonth(): number {
    let today = new Date();
    return today.getMonth() + 1;
  }
  getYear() {
    let year = this.getCurrentYear();
    for (let i = (year - 100); i <= year; i++) {
      this.years.push(i);
    }
  }
  getCurrentYear(): number {
    let today = new Date();
    return today.getFullYear();
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
    // tslint:disable-next-line:only-arrow-functions
    button.addEventListener('click', function () {
      // tslint:disable-next-line:no-shadowed-variable
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
  changeGroup(event) {
    if (event == 1) {
      this.group1 = [{ id: '2', name: 'ReportFilter.location' }];
      this.form.controls['groupBy1'].setValue('2');
    } else {
      this.group1 = [{ id: '1', name: 'ReportFilter.departmentGroup' }];
      this.form.controls['groupBy1'].setValue('1');

    }

  }

  toggleAllSelection(selected, formControlName, index: number) {

    if (selected) {
      this.form.controls[formControlName]
        .patchValue([...this.lookupsFilter[index].map(item => item.id), 0]);
    } else {
      this.form.controls[formControlName].patchValue([]);
    }
  }
  toggleUnSelectAll(selected, formControlName) {
    let selectedItems = this.form.controls[formControlName].value.filter(e => e != 0);
    this.form.controls[formControlName].patchValue(selectedItems);
  }
  fireEvent(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('click inside input');
    return false;
  }
}
