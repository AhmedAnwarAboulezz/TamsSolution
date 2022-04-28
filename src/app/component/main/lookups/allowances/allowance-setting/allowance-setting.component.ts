import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllowanceSetting } from 'src/app/models/allowanceSetting';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Allowance } from 'src/app/models/allowance';
import { APIs } from 'src/app/services/APIs';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { Result } from 'src/app/core/table-details/models/Result';
import { BaseListComponent } from 'src/app/core/table-details/core/base-list-component';
import { AllowanceTypeEnum } from 'src/app/enums/AllowanceTypeEnum';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from 'src/app/component/shell';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { AllowancesService } from '../Services/allowances.services';
import { AllowanceSettingReplacement } from 'src/app/models/AllowanceSettingReplacement';

@Component({
  selector: 'app-allowance-setting',
  templateUrl: './allowance-setting.component.html',
  styleUrls: ['./allowance-setting.component.scss']
})
export class AllowanceSettingComponent extends BaseListComponent implements OnInit {
  form: FormGroup;
  allowanceSettings: AllowanceSetting[];
  allowanceSetting: any = {};
  cannotchoosedutystatus: boolean;
  displayIf: boolean;
  allowanceId: number;
  allowancetypeId: number;
  allowancetype: string;
  allwancename: string;
  displayedColumns = {};
  SignInallowance = false;
  SignOutallowance = false;
  SignInAndSignOutallowance = false;
  IsExemption = false;
  isDefault = false;
  allowances: Allowance[];
  header = DatePickerHeader;

  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get AllowanceService(): AllowancesService { return Shell.Injector.get(AllowancesService); }
  columnsTypes = { startDate: 'Date', endDate: 'Date' };
  // implememnt mainLoader here in every component to get the inital data of the datatable
  mainLoader(x: LoadOptions): Observable<Result> {
    x.filter = this.filter;
    let body = { allowanceId: this.allowanceId };
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    return this.Service.post(this.APIs.init('AllowanceSettings', queryRequest).GetAll, body);
  }

  constructor(
    public dialog: MatDialog,
    // tslint:disable-next-line:no-shadowed-variable
    public APIs: APIs,
    public translate: TranslateService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) allowance: Allowance) {
    super('AllowancesComponent', `${APIs.init('AllowanceSettings').Delete}`);
    this.allowancetypeId = allowance.data.allowanceTypeId;
    this.allowanceId = allowance.data.id;
    this.getAllowances('00000000-0000-0000-0000-000000000000');
    this.form = this.fillFormGroup(this.allowanceSetting);

    if (this.translate.currentLang == 'en') {
      this.displayedColumns = {
        startDate: 'Start date', endDate: 'End date', replaceDutyAllowanceIn: 'Approve (Employee) allowance in',
        replaceDutyAllowanceOut: 'Approve (Employee) allowance out', allowReplacement: 'Approve Allowance',
        cancelInRamadan: 'Cancel In Ramadan', isDefault: 'Default', notes: 'Notes'
      };
      if (allowance['data'].allowanceTypeId == AllowanceTypeEnum.AllowanceInAndOut||
      allowance['data'].allowanceTypeId == AllowanceTypeEnum.AllowanceOut ||
      allowance['data'].allowanceTypeId == AllowanceTypeEnum.AllowanceIn )
      {
      this.displayedColumns = {
        startDate: 'Start date', endDate: 'End date',         
        cancelInRamadan: 'Cancel In Ramadan', isDefault: 'Default', notes: 'Notes'
      };
    }
    else if(allowance['data'].allowanceTypeId == AllowanceTypeEnum.SignInallowance)
    {
      this.displayedColumns = {
        startDate: 'Start date', endDate: 'End date',
         replaceDutyAllowanceIn: 'Approve (Employee) allowance in',
       allowReplacement: 'Approve Allowance',
       cancelInRamadan: 'Cancel In Ramadan', isDefault: 'Default', notes: 'Notes'
      };
    }
    else if(allowance['data'].allowanceTypeId == AllowanceTypeEnum.SignOutallowance)
    {
      this.displayedColumns = {
        startDate: 'Start date', endDate: 'End date', 
        replaceDutyAllowanceOut: 'Approve (Employee) allowance out', allowReplacement: 'Approve Allowance',
        cancelInRamadan: 'Cancel In Ramadan', isDefault: 'Default', notes: 'Notes'
      };
    }

      this.allowancetype = allowance.data.allowanceTypeNameFl;
      this.allwancename = this.localize.currentLang == 'Fl' ?  allowance.data.allowanceNameFl : allowance.data.allowanceNameSl;
    } 
    
    else 
    {
      this.displayedColumns = {
        startDate: 'تاريخ البدايه', endDate: 'تاريخ النهايه',
        replaceDutyAllowanceIn: 'اعتماد سماحية حضور الموظف',
        replaceDutyAllowanceOut: 'اعتماد سماحية انصراف الموظف', allowReplacement: 'اعتماد السماحية',
        cancelInRamadan: 'الغاء في رمضان', isDefault: 'اساسي', notes: 'ملاحظات'
      };

      if (allowance['data'].allowanceTypeId == AllowanceTypeEnum.AllowanceInAndOut||
      allowance['data'].allowanceTypeId == AllowanceTypeEnum.AllowanceOut ||
      allowance['data'].allowanceTypeId == AllowanceTypeEnum.AllowanceIn )
      {
        this.displayedColumns = {
          startDate: 'تاريخ البدايه', endDate: 'تاريخ النهايه',
          cancelInRamadan: 'الغاء في رمضان', isDefault: 'اساسي', notes: 'ملاحظات'
        };
      }
      else if(allowance['data'].allowanceTypeId == AllowanceTypeEnum.SignInallowance)
      {
        this.displayedColumns = {
          startDate: 'تاريخ البدايه', endDate: 'تاريخ النهايه',
          replaceDutyAllowanceIn: 'اعتماد سماحية حضور الموظف', allowReplacement: 'اعتماد السماحية',
          cancelInRamadan: 'الغاء في رمضان', isDefault: 'اساسي', notes: 'ملاحظات'
        };
      }
      else if(allowance['data'].allowanceTypeId == AllowanceTypeEnum.SignOutallowance)
      {
        this.displayedColumns = {
          startDate: 'تاريخ البدايه', endDate: 'تاريخ النهايه',
          replaceDutyAllowanceOut: 'اعتماد سماحية انصراف الموظف', allowReplacement: 'اعتماد السماحية',
          cancelInRamadan: 'الغاء في رمضان', isDefault: 'اساسي', notes: 'ملاحظات'
        };
      }
      this.allowancetype = allowance.data.allowanceTypeNameSl;
      this.allwancename = this.localize.currentLang == 'Fl' ?  allowance.data.allowanceNameFl : allowance.data.allowanceNameSl;
    }

    this.cannotchoosedutystatus = false;
    // tslint:disable-next-line:no-string-literal
    if (allowance['data'].allowanceTypeId == AllowanceTypeEnum.SignInallowance) {
      this.SignInallowance = true;
      // tslint:disable-next-line:no-string-literal
    } else if (allowance['data'].allowanceTypeId == AllowanceTypeEnum.SignOutallowance) {
      this.SignOutallowance = true;
      // tslint:disable-next-line:no-string-literal
    } else if (allowance['data'].allowanceTypeId == AllowanceTypeEnum.SignInAndSignOutallowance) {
      this.SignInAndSignOutallowance = true;

    } else {
      this.IsExemption = true;
    }

  }
  ngOnInit() {

  }
  getAllowances(id) {
    this.AllowanceService.getAllowanceCanReplace(this.allowanceId, this.allowancetypeId, id).subscribe(result => {
      this.allowances = result;
    });
  }
  async wordTranslate() {
    let words: any;
    this.Service.currentLang$.subscribe(() => {
      this.translate.get(``).subscribe((text: string) => words = text);
    });
    return words;
  }

  onCancel() {
    this.form = this.fillFormGroup(new AllowanceSetting());
    this.cannotchoosedutystatus = false;
    this.isDefault = false;

  }
  onSave() {
    let data = this.form.value;
    data.allowanceId = this.allowanceId;
    data.allowanceSettingReplacements = data.allowanceSettingReplacements === undefined || data.allowanceSettingReplacements === null
      ? null : data.allowanceSettingReplacements.filter(e => e != 0);
    if (data.allowanceSettingReplacements !== undefined && data.allowanceSettingReplacements !== null 
      && data.allowanceSettingReplacements.length != 0) {
      if (data.allowanceSettingReplacements[0].allowanceId != null) {
      } else {
        data.allowanceSettingReplacements = data.allowanceSettingReplacements
          .map((e: any) => ({ allowanceId: e, allowanceSettingId: data.id, approvedAllowanceId: data.allowanceId }));
      }
    }
    if (data.id) {
      this.update(data);
    } else {
      this.addNew(data);
    }

    this.form = this.fillFormGroup(new AllowanceSetting());
    this.scrollToBottom();

  }
  edit(event: any) {
    this.getAllowances(event.id);
    super.editCall(`${this.APIs.init('AllowanceSettings', event.id).Get}`).subscribe(data => {
      this.getData(data);
      this.scrollToTop();

    });
  }
  addNew(allowanceSetting: AllowanceSetting) {
    this.Service.post(this.APIs.init('AllowanceSettings').Add, allowanceSetting)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.saveSuccessfully'));
      });
    this.isDefault = false;

  }
  update(allowanceSetting: AllowanceSetting) {
    this.Service.put(this.APIs.init('AllowanceSettings').Update, allowanceSetting)
      .subscribe(async () => {
        await this.loadPagedData();
        this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
        this.roles.canAdd = this.canAddTemp;
      });
    this.isDefault = false;
  }
  getData(allowanceSetting: AllowanceSetting) {
    this.allowanceSetting = allowanceSetting;
    if (allowanceSetting.isDefault) {
      this.isDefault = true;
    }
    this.form = this.fillFormGroup(this.allowanceSetting);

  }

  fillFormGroup(allowanceSetting: AllowanceSetting): any {
    if (allowanceSetting.allowanceSettingReplacements !== undefined &&
      allowanceSetting.allowanceSettingReplacements.some(e => typeof e === 'object')) {
      allowanceSetting.allowanceSettingReplacements = allowanceSetting.allowanceSettingReplacements.map(({ allowanceId }: any) =>
        (allowanceId));
    }
    let form = this.fb.group({
      id: [allowanceSetting.id],
      allowanceId: [this.allowanceId],
      startDate: [allowanceSetting.startDate, Validators.required],
      endDate: [allowanceSetting.endDate, Validators.required],
      replaceDutyAllowanceIn: [allowanceSetting.replaceDutyAllowanceIn ? allowanceSetting.replaceDutyAllowanceIn : false],
      replaceDutyAllowanceOut: [allowanceSetting.replaceDutyAllowanceOut ? allowanceSetting.replaceDutyAllowanceOut : false],
      allowReplacement: [allowanceSetting.allowReplacement ? allowanceSetting.allowReplacement : false],
      cancelInRamadan: [allowanceSetting.cancelInRamadan ? allowanceSetting.cancelInRamadan : false],
      notes: [allowanceSetting.notes],
      isDefault: [this.isDefault],
      allowanceSettingReplacements: [allowanceSetting.allowanceSettingReplacements]

    });
    return form;

  }
  toggleAllSelection(selected) {
    if (selected) {
      this.form.controls.allowanceSettingReplacements
        .patchValue([...this.allowances.map(item => item.id), 0]);
    } else {
      this.form.controls.allowanceSettingReplacements.patchValue([]);
    }
  }

}
