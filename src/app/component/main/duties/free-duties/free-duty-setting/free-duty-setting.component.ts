import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FixedDuty } from 'src/app/models/fixedDuty';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FixedDutySetting } from 'src/app/models/fixeddutysetting';
import { Subscription, Observable } from 'rxjs';
import { DutyStatus } from 'src/app/models/dutystatus';
import { WeekDay } from 'src/app/models/weekday';
import { DutyStatusesEnum } from 'src/app/enums/DutyStatusesEnum';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { Result } from 'src/app/core/table-details/models/Result';
import { BaseListComponent } from 'src/app/core/table-details/core/base-list-component';
import { APIs } from 'src/app/services/APIs';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from 'src/app/component/shell';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-free-duty-setting',
  templateUrl: './free-duty-setting.component.html',
  styleUrls: ['./free-duty-setting.component.scss']
})
export class FreeDutySettingComponent extends BaseListComponent implements OnInit {
  form: FormGroup;
  freeDutySettings: FixedDutySetting[];
  freeDutySetting: any = {};
  dutyStatus: DutyStatus[];
  days: WeekDay[];
  DutyDesc: string;
  fixedDutyId: number;
  dutyTypeId: number;
  cannotchoosedutystatus: boolean;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  header = DatePickerHeader;

  displayIf: boolean;
  DutyType: string;
  HasHoliday: boolean;
  IncludeOvertime: boolean;
  displayedColumns = {};
  columnsTypes = { startDate: 'Date', endDate: 'Date' };
  // implememnt mainLoader here in every component to get the inital data of the datatable
  mainLoader(x: LoadOptions): Observable<Result> {
    x.filter = this.filter;
    let body = { fixedDutyId: this.fixedDutyId };
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    return this.Service.post(this.APIs.init('FixedDutySettings', queryRequest).GetAll, body);
  }

  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    public APIs: APIs,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) freeDuty: FixedDuty) {
    super('FreeDutiesComponent', `${APIs.init('FixedDutySettings').Delete}`);
    if (this.translate.currentLang == 'en') {
      this.DutyType = freeDuty['data'].dutyTypeFl;
      this.DutyDesc = this.localize.currentLang == 'Fl' ? freeDuty['data'].dutyDescriptionFl : freeDuty['data'].dutyDescriptionSl;
      this.displayedColumns = {
        startDate: 'Start date', endDate: 'End date', dutyStatusNameFl: 'Duty status name',
        weekEndNameFl: 'Weekend', restDayNameFl: 'Restday', workingHour: 'Working hours', notes: 'Notes'
      };
    } else {
      this.DutyType = freeDuty['data'].dutyTypeSl;
      this.DutyDesc = this.localize.currentLang == 'Fl' ? freeDuty['data'].dutyDescriptionFl : freeDuty['data'].dutyDescriptionSl;
      this.displayedColumns = {
        startDate: 'تاريخ البداية', endDate: 'تاريخ الأنتهاء', dutyStatusNameSl: 'حالة الدوام',
        weekEndNameSl: 'اجازة الأسبوع', restDayNameSl: 'يوم الراحة', workingHour: 'عدد ساعات العمل', notes: 'ملاحظات'
      };
    }
    this.fixedDutyId = freeDuty['data'].id;
    this.HasHoliday = freeDuty['data'].hasHoliday;
    this.IncludeOvertime = freeDuty['data'].includeOverTime;
    this.dutyTypeId = freeDuty['data'].dutyTypeId;
    this.fillFormGroup();
    this.cannotchoosedutystatus = false;
    this.getDutyStatus();
    this.getDays();
  }

  ngOnInit() {

  }

  async wordTranslate() {
    let words;
    await this.Service.currentLang$.subscribe(res => {
      this.translate.get(`HOME.columnName.FreeDutySettings`).subscribe((text: string) => words = text);
    });

    return words;
  }

  getDutyStatus() {
    this.Service.getList(this.APIs.init('DutyStatuses').GetAllDrop)
      .subscribe(res => {
        this.dutyStatus = res;
      });
  }
  getDays() {
    this.Service.getList(this.APIs.init('WeekDays').GetAllDrop)
      .subscribe(res => {
        this.days = res;
      });
  }
  onCancel() {
    this.form.reset();
    this.cannotchoosedutystatus = false;
  }
  onSave() {
    var data = this.form.value;
    data.fixedDutyId = this.fixedDutyId;

    if (data.id) {
      this.update(data);
    } else {
      this.addNew(data);
    }
  }

  edit(event) {
    super.editCall(`${this.APIs.init('FixedDutySettings', event.id).Get}`).subscribe(data => {
      this.getData(data);
      this.scrollToTop();
    });
  }
  addNew(freedutysetting: FixedDutySetting) {
    this.Service.post(this.APIs.init('FixedDutySettings').Add, freedutysetting)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));

        this.cannotchoosedutystatus = false;
        this.form.reset();
        this.scrollToBottom();
      }, error => {
        this.scrollToTop();
      });
  }
  update(freedutysetting: FixedDutySetting) {
    this.Service.put(this.APIs.init('FixedDutySettings').Update, freedutysetting)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));

        this.roles.canAdd = this.canAddTemp;
        this.cannotchoosedutystatus = false;
        this.form.reset();
        this.scrollToBottom();
      }, error => {
        this.scrollToTop();
      });
  }
  getData(freedutysetting: FixedDutySetting) {
    this.freeDutySetting = freedutysetting;
    if (this.freeDutySetting.dutyStatusId == DutyStatusesEnum.Basic) {
      this.cannotchoosedutystatus = true;
    } else {
      this.cannotchoosedutystatus = false;
    }
    this.fillFormGroup();
  }

  fillFormGroup() {
    this.form = this.fb.group({
      id: [this.freeDutySetting.id],
      fixedDutyId: [this.fixedDutyId],
      dutyTypeId: [this.dutyTypeId],
      dutyStatusId: [this.freeDutySetting.dutyStatusId, Validators.required],
      startDate: [this.freeDutySetting.startDate, Validators.required],
      endDate: [this.freeDutySetting.endDate, Validators.required],
      weekEndId: [this.freeDutySetting.weekEndId],
      restDayId: [this.freeDutySetting.restDayId],
      workingHour: [this.freeDutySetting.workingHour, Validators.required],
      notes: [this.freeDutySetting.notes]
    });
  }

}
