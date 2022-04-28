import { Component, OnInit } from '@angular/core';
import { Shell } from 'src/app/component/shell';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuditSearch } from 'src/app/models/auditSearch';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import moment from 'moment';
import { AuditService } from '../services/audits.service';

@Component({
  selector: 'app-audits-log',
  templateUrl: './audits-log.component.html',
  styleUrls: ['./audits-log.component.scss']
})

export class AuditsLogComponent implements OnInit {
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  header = DatePickerHeader;
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }
  get Service(): AuditService { return Shell.Injector.get(AuditService); }
  model: AuditSearch = {};
  form: FormGroup;
  users: any;
  screens: any;
  actions: any;

  constructor(public fb: FormBuilder
  ) {
    this.getLookups();
    let todayDate = new Date();
    let yesterdayDate = moment(todayDate, 'DD-MM-YYYY').add(-1, 'days').toDate();
    this.form = fb.group({
      employeeId: [this.model.employeeId],
      startDate: [todayDate],
      endDate: [todayDate],
      userId: [this.model.userId],
      actionId: [this.model.actionId],
      screenName: [this.model.screenName]
    });

  }

  ngOnInit(): void {
    //this.getLookups();
  }

  oninputChanges() {
  }
  searchToggle() {
    this.reloadGridComponant();
  }

  reloadGridComponant() {
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable('Audits/GetAllPaged', this.form.value);
  }

  getLookups() {
    this.Service.getLookup().subscribe(data => {
      this.users = data[0];
      this.screens = data[1].filter(a=>a.dropdownShow !== false);
      this.actions = data[2].filter(a=>a.id !== 4);
    });
  }

  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }

}

