import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Shell } from 'src/app/component/shell';
import { AuditSearch } from 'src/app/models/auditSearch';
import { RolesReportFilterDto, ScreenReportDto } from 'src/app/models/userRoles';
import { AlertService } from 'src/app/services/AlertService';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { UserRolesService } from './services/user-roles.service';

@Component({
  selector: 'app-user-roles-report',
  templateUrl: './user-roles-report.component.html',
  styleUrls: ['./user-roles-report.component.scss']
})
export class UserRolesReportComponent implements OnInit {
  searchNow = false;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Service(): UserRolesService { return Shell.Injector.get(UserRolesService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  isLoading = false;
  model: AuditSearch = {};
  users: any;
  screens: any;
  screensArray: ScreenReportDto[] = [];

  form: FormGroup;


  constructor(public fb: FormBuilder
    ) {
      this.getLookups();
      this.form = fb.group({
        userId: [this.model.userId],
        screenId: [this.model.userId],
        organizationName: [null],
        organizationLogo: [null],
        organizationId: [null]
      });
  
    }
  ngOnInit() {
  }
  getLookups() {
    this.Service.getLookup().subscribe(data => {
      this.users = data[0].filter(a=>a.nameFl !== "SuperAdmin");
      this.screens = data[1].filter(a=>a.dropdownShow !== false);
    });
  }
  setOrganizationData() {

    // tslint:disable-next-line:variable-name
    let Organizations_data = localStorage.getItem('Organizations_data');
    Organizations_data = JSON.parse(Organizations_data);
    if (Organizations_data) {
      let orgId = Organizations_data['id'];
      let orgName = this.localize.currentLang == 'Sl' ? Organizations_data['organizationNameSl'] : Organizations_data['organizationNameFl'];
      let orgLogo = this.localize.currentLang == 'Sl' ? Organizations_data['logoURLSl'] : Organizations_data['logoURLFl'];
      this.form.controls['organizationId'].setValue(orgId);
      this.form.controls['organizationName'].setValue(orgName);
      this.form.controls['organizationLogo'].setValue(orgLogo);
    }
  }
  searchToggle(printType)
  {
    this.searchNow = true;
    this.isLoading = true;
    this.screensArray = [];
    let searchInput = new RolesReportFilterDto();
    let getScreens = this.screens;
    if(this.form.value.screenId != null && this.form.value.screenId.length != 0)
    {      
      getScreens = getScreens.filter(a=> this.form.value.screenId.includes(a.screenId));     
    }

    getScreens.forEach(element => {
      let screenname = new ScreenReportDto();
      screenname.screenId = element.screenId;
      screenname.screenName = this.localize.translate.instant(element.componentName);
      this.screensArray.push(screenname); 
    });
    this.setOrganizationData();
    searchInput.organizationName = this.form.value.organizationName;
    searchInput.organizationLogo = this.form.value.organizationLogo;
    searchInput.organizationId = this.form.value.organizationId;
    searchInput.printType = printType;
    searchInput.userIds = this.form.value.userId;
    searchInput.screensReportsDto = this.screensArray;
    searchInput.screenTitle=this.localize.translate.instant("ReportFilter.userrolesreport");
    console.log("Result value =", searchInput);   


    this.Service.getReport(searchInput).subscribe(data => {
      this.Service.downLoadFile(data, printType == 1 ? 'application/pdf'
      : 'application/msword', printType == 1 ? 'pdf': 'doc',searchInput.screenTitle);
      // this.Service.downLoadFile(data, 'application/pdf');
      this.isLoading = false;
      this.searchNow = false;

    }, error => {
      this.Alert.showError(this.localize.translate.instant('Message.noDataFound'));
      this.isLoading = false;
      this.searchNow = false;

    });   

  }

  toggleAllSelection(selected, isGroup) {

    
    if (selected && isGroup) {
      this.form.controls.userId
        .patchValue([...this.users.map(item => item.id), 0]);
    } else if (selected && !isGroup) {
      this.form.controls.screenId
        .patchValue([...this.screens.map(item => item.screenId), 0]);

    } else {
      if (isGroup) { this.form.controls.userId.patchValue([]); } else { this.form.controls.screenId.patchValue([]); }
    }
  }

  toggleUnSelectAll(selected, isGroup)
  {
    if (isGroup) { 
      var selectedItems= this.form.controls.userId.value.filter(e => e != 0);
      this.form.controls.userId.patchValue(selectedItems);
    } 
    else
     { 
       var selectedItems= this.form.controls.screenId.value.filter(e => e != 0);
       this.form.controls.screenId.patchValue(selectedItems);
     }

  }

  reset() {
    this.form.reset(new AuditSearch());
  }
}
