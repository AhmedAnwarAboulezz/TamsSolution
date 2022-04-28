import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from 'src/app/models/group';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GroupRole } from 'src/app/models/GroupRole';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { AuthService } from 'src/app/services/auth.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-group-roles',
  templateUrl: './group-roles.component.html',
  styleUrls: ['./group-roles.component.scss'],
})
export class GroupRolesComponent extends BaseComponent implements OnInit {
  @ViewChild('screensTable', { static: false }) screensTable: RolesTableComponent;
  @ViewChild('reportsTable', { static: false }) reportsTable: RolesTableComponent;

  form: FormGroup;

  groups: Group[];
  screens: GroupRole[];
  reports: GroupRole[];
  //groupId;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) {
    super();

    this.form = fb.group({
      groupId: []
    });
  }

  ngOnInit() {
    this.getGroups();

  }

  getGroups() {
    this.service.getList(this.APIs.init('groups').GetAllForSelect)
      .subscribe(groups => {
        this.groups = groups;
        
        this.form.controls['groupId'].setValue(groups[0].id);
        this.getGroupRoles(this.form.value.groupId);
      });
  }

  getGroupRoles(groupId) {
    let promise = new Promise((resolve, reject) => {
      this.service.getList(this.APIs.init('ScreenGroupsAuthorities', groupId).GetAllGroupRoles)
        .subscribe(screens => {

          resolve(this.resolveGroupRoles(screens));
        });
    });
    return promise;
  }

  resolveGroupRoles(screens: GroupRole[]) {
    this.screens = screens.filter(e => !e.isReport);
    this.reports = screens.filter(e => e.isReport);
    return true;
  }

  onGroupChange(groupId: number) {
    //this.groupId = groupId;
    this.getGroupRoles(groupId);
  }

  save() {
    let data = [];
    let screenData = this.screensTable.getDataSource();
    screenData.forEach(element => {
      if (element.add || element.edit || element.delete) {
        element.view = true;
      }
    });
    data.push(...screenData);

    data.push(...this.reportsTable.getDataSource());

    this.service.postList(this.APIs.init('ScreenGroupsAuthorities', this.form.value.groupId).AddOrUpdate, data)
      .subscribe(async result => {
        let data = await this.getGroupRoles(this.form.value.groupId);
        if (data) {
          this.alertService.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
          this.authService.loadScreenAuthorities();
        }
      });
  }
}
