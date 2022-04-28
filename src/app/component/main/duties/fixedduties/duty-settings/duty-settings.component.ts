import { FixedDuty } from 'src/app/models/fixedDuty';
import { FixedDutySetting } from 'src/app/models/fixeddutysetting';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DutyType } from 'src/app/models/dutyType';
import { WeekDay } from 'src/app/models/weekday';
import { DutyStatus } from 'src/app/models/dutystatus';
import { DutyStatusesEnum } from 'src/app/enums/DutyStatusesEnum';
import { DutyTypesEnum } from 'src/app/enums/DutyTypesEnum';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { Result } from 'src/app/core/table-details/models/Result';
import { BaseListComponent } from 'src/app/core/table-details/core/base-list-component';
import { APIs } from 'src/app/services/APIs';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from 'src/app/component/shell';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import * as moment from 'moment';


@Component({
  selector: 'app-duty-settings',
  templateUrl: './duty-settings.component.html',
  styleUrls: ['./duty-settings.component.scss']
})
export class DutySettingsComponent extends BaseListComponent implements OnInit {

  form: FormGroup;
  fixedDutySettings: FixedDutySetting[];
  fixedDutySetting: any = {};
  dutytypes: DutyType[];
  DutyType: string;
  DutyDesc: string;
  HasHoliday: boolean;
  IncludeOvertime: boolean;
  cannotchoosedutystatus: boolean;
  displayIf: boolean;
  Days: WeekDay[];
  header = DatePickerHeader;
  //maskTime = [/[1-9]/, /\d/,':',/\d/, /\d/];
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }

  DutyStatuses: DutyStatus[];
  DutyTypes: DutyType[];
  fixedDutyId: number;
  dutyTypeId: number;

  isFixedDuty = false;
  displayedColumns = {};

  columnsTypes: any = { startDate: 'Date', endDate: 'Date' };
  // implememnt mainLoader here in every component to get the inital data of the datatable
  mainLoader(x: LoadOptions): Observable<Result> {
    x.filter = this.filter;
    let body = { fixedDutyId: this.fixedDutyId };
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    return this.Service.post(this.APIs.init('FixedDutySettings', queryRequest).GetAll, body);
  }
  constructor(
    public dialog: MatDialog,
    public APIs: APIs,
    public translate: TranslateService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) FixedDuty: FixedDuty) {
    super('FixedDutiesComponent', `${APIs.init('FixedDutySettings').Delete}`);
    if (this.translate.currentLang == 'en') {
      this.displayedColumns = {
        startDate: 'Start date', endDate: 'End date', dutyStatusNameFl: 'Duty status name', startTime: 'Start Time',
        endTime: 'End Time', allowanceIn: 'Allowance in', allowanceOut: 'Allowance out', allowLaunch: 'Allow launch',
        allowHalfDay: 'Allow half day'
      };
      this.DutyType = FixedDuty['data'].dutyTypeFl;
      this.DutyDesc = this.localize.currentLang == 'Fl' ? FixedDuty['data'].dutyDescriptionFl : FixedDuty['data'].dutyDescriptionSl;
    }
    else {
      this.displayedColumns = {
        startDate: 'تاريخ البداية', endDate: 'تاريخ الأنتهاء', dutyStatusNameSl: 'حالة الدوام', startTime: 'وقت البداية',
        endTime: 'وقت النهاية', allowanceIn: 'سماحية الدخول', allowanceOut: 'سماحية الخروج', allowLaunch: 'يشمل استراحة الغداء',
        allowHalfDay: 'سماحية نصف يوم'
      };
      this.DutyType = FixedDuty['data'].dutyTypeSl;
      this.DutyDesc = this.localize.currentLang == 'Fl' ? FixedDuty['data'].dutyDescriptionFl : FixedDuty['data'].dutyDescriptionSl;
    }
    if (DutyTypesEnum.FixedDuty == FixedDuty['data'].dutyTypeId) {
      this.isFixedDuty = true;
    } else {
    }

    this.HasHoliday = FixedDuty['data'].hasHoliday;
    this.IncludeOvertime = FixedDuty['data'].includeOverTime;
    this.fixedDutyId = FixedDuty['data'].id;
    this.dutyTypeId = FixedDuty['data'].dutyTypeId;


    this.form = this.fillFormGroup(this.fixedDutySetting);

    this.cannotchoosedutystatus = false;
    this.getweekDays();
    this.getDutyStatuses();
  }

  getweekDays() {
    this.Service.getList(this.APIs.init('WeekDays').GetAllDrop)
      .subscribe(res => {
        this.Days = res;
      });
  }

  getDutyStatuses() {
    this.Service.getList(this.APIs.init('DutyStatuses').GetAllDrop)
      .subscribe(dutyStatuses => {
        this.DutyStatuses = dutyStatuses;
      });
  }

  ngOnInit() {
  }

  async wordTranslate() {
    let words;
    await this.Service.currentLang$.subscribe(() => {
      this.translate.get(`HOME.columnName.dutysettings`).subscribe((text: string) => words = text);
    });
    return words;
  }
  onCancel() {
    this.form = this.fillFormGroup(new FixedDutySetting());

    this.cannotchoosedutystatus = false;
  }
  edit(event) {
    super.editCall(`${this.APIs.init('FixedDutySettings', event.id).Get}`).subscribe(data => {

      this.getData(data);
      this.scrollToTop();

    });
  }
  onSave() {

    let data = this.form.value;
    data.workingHour = this.getMintuesFromTime(data.workingHour).toString();

    if (data.id) {
      this.update(data);
    } else {
      this.addNew(data);
    }
  }

  addNew(fixedDutySetting: FixedDutySetting) {

    this.Service.post(this.APIs.init('FixedDutySettings').Add, fixedDutySetting)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));

        this.cannotchoosedutystatus = false;

        this.form = this.fillFormGroup(new FixedDutySetting());

        this.scrollToBottom();
      }, error => {
        this.scrollToTop();
      });
  }

  update(fixedDutySetting: FixedDutySetting) {

    this.Service.put(this.APIs.init('FixedDutySettings').Update, fixedDutySetting)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));

        this.roles.canAdd = this.canAddTemp;
        this.cannotchoosedutystatus = false;
        this.form = this.fillFormGroup(new FixedDutySetting());

        this.scrollToBottom();
      }, error => {
        this.scrollToTop();
      });
  }

  getData(fixedDutySetting: FixedDutySetting) {

    this.fixedDutySetting = fixedDutySetting;
    if (this.fixedDutySetting.dutyStatusId == DutyStatusesEnum.Basic) {
      this.cannotchoosedutystatus = true;
    } else {
      this.cannotchoosedutystatus = false;
    }
    this.fixedDutySetting.workingHour = this.getHoursFromMintes(this.fixedDutySetting.workingHour);
    this.form = this.fillFormGroup(this.fixedDutySetting);

  }

  fillFormGroup(fixedDutySetting: FixedDutySetting): any {
    let form = this.fb.group({
      id: [fixedDutySetting.id],
      fixedDutyId: [this.fixedDutyId],
      dutyTypeId: [this.dutyTypeId],
      startDate: [fixedDutySetting.startDate, Validators.required],
      endDate: [fixedDutySetting.endDate, Validators.required],
      dutyStatusId: [fixedDutySetting.dutyStatusId, Validators.required],
      startTime: [fixedDutySetting.startTime, Validators.required],
      endTime: [fixedDutySetting.endTime, Validators.required],
      weekEndId: [fixedDutySetting.weekEndId],
      restDayId: [fixedDutySetting.restDayId],
      allowanceIn: [fixedDutySetting.allowanceIn != null ? fixedDutySetting.allowanceIn : 0, Validators.required],
      allowanceOut: [fixedDutySetting.allowanceOut != null ? fixedDutySetting.allowanceOut : 0, Validators.required],
      signAfter: [fixedDutySetting.signAfter != null ? fixedDutySetting.signAfter : 0, Validators.required],
      signBefor: [fixedDutySetting.signBefor != null ? fixedDutySetting.signBefor : 0, Validators.required],
      from: [fixedDutySetting.from],
      to: [fixedDutySetting.to],
      notes: [fixedDutySetting.notes],
      allowHalfDay: [fixedDutySetting.allowHalfDay],
      allowLaunch: [fixedDutySetting.allowLaunch],
      halfDayStartTime: [fixedDutySetting.halfDayStartTime],
      halfDayEndTime: [fixedDutySetting.halfDayEndTime],
      halfDayAllowanceIn: [fixedDutySetting.halfDayAllowanceIn != null ? fixedDutySetting.halfDayAllowanceIn : 0],
      halfDayAllowanceOut: [fixedDutySetting.halfDayAllowanceOut != null ? fixedDutySetting.halfDayAllowanceOut : 0],
      mustSign: [fixedDutySetting.mustSign],
      halfDayId: [fixedDutySetting.halfDayId],
      workingHour: [fixedDutySetting.workingHour, Validators.required]
    });
    return form;

  }
  showOptionsallowLaunch(event): void {
    if (!event.checked) {
      this.form.patchValue({
        from: null,
        to: null,
        mustSign: null
      });
    }
  }
  showOptionsallowHalfDay(event): void {
    if (!event.checked) {
      this.form.patchValue({
        halfDayId: null,
        halfDayStartTime: null,
        halfDayEndTime: null,
        halfDayAllowanceIn: null,
        halfDayAllowanceOut: null,

      });
    }
  }

  setWorkingHour() {
    let workingHourList: MinAndMaxTime = this.getWorkingTime();
    this.form.controls.workingHour.setValue(workingHourList.minDurationInHours);
  }
  changeWorkingHour() {
    let isvalid = this.form.controls.workingHour.valid;
    let control = this.form.controls.workingHour;
    if (isvalid) {
      let value = this.getMintuesFromTime(this.form.value.workingHour);
      let workingHourList: MinAndMaxTime = this.getWorkingTime();
      if (workingHourList.errorMessage != null && workingHourList.errorMessage !== "") {
        this.Alert.showError(workingHourList.errorMessage);
        return false;
      }
      if (value > workingHourList.maxDurationInMin || value < workingHourList.minDurationInMin) {
        this.Alert.showError(this.localize.translate.instant('Message.minMaxWorkingHourExceed'));
        control.setErrors({ minmaxExceed: true });
      }
      else {
        control.setErrors(null);
      }
    }
    else {
      control.setErrors({ required: true });
    }
  }

  getWorkingTime(): any {
    let result = new MinAndMaxTime();
    let startTimeMin = this.form.value.startTime;
    let endTimeMin = this.form.value.endTime;
    let allowanceInMin = this.form.value.allowanceIn;
    let allowanceoutMin = this.form.value.allowanceOut;
    if (startTimeMin != null && endTimeMin != null && allowanceInMin != null && allowanceoutMin != null) {
      let initialdatetime = '2020-01-01 00:00:00';
      let datetimeA = this.covertTimeToDateTime(startTimeMin);
      let datetimeB = this.covertTimeToDateTime(endTimeMin);
      result.maxDurationInMin = datetimeB.diff(datetimeA, 'minutes');
      result.minDurationInMin = result.maxDurationInMin - allowanceInMin - allowanceoutMin;
      result.minDurationInHours = moment(initialdatetime).add(result.minDurationInMin, 'minutes').format("HH:mm");
      result.maxDurationInHours = moment(initialdatetime).add(result.minDurationInMin, 'minutes').format("HH:mm");
    }
    else {
      result.errorMessage = "Select Other Data First";
    }
    return result;
  }


  covertTimeToDateTime(timeInput): any {
    let initialdate = '2020-01-01';
    return moment(initialdate + " " + timeInput);
  }

  getMintuesFromTime(timeInput: string): number {
    let res = 0;
    let timeRes = timeInput.split(":");
    res = (+timeRes[0] * 60) + (+timeRes[1]);
    return res;
  }

  getHoursFromMintes(minutes: number): string {
    let res = "00:00";
    let hours = Math.floor(minutes / 60);
    let mint = minutes % 60;
    let actualHours = (hours < 9) ? "0" + hours : hours.toString();
    let actualMints = (mint < 9) ? "0" + mint : mint.toString();
    res = actualHours + ":" + actualMints;
    return res;
  }
}


export class MinAndMaxTime {
  maxDurationInMin: number;
  minDurationInMin: number;
  minDurationInHours: string;
  maxDurationInHours: string;
  errorMessage: string;
}
