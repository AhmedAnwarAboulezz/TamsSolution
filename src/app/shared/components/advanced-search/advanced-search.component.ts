import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { AdvancedSearchService } from './service/AdvancedSearch.service';
import { Shell } from 'src/app/component/shell';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  @Output() fillSearch: EventEmitter<any> = new EventEmitter<any>();
  @Input() advanceSearch: advancedSearch;
  @Input() hasTeams: boolean;
  @Input() hasAdminstration: boolean;
  @Input() hasLocations: boolean;
  @Input() hasJobs: boolean;
  @Input() hasGenders: boolean;

  @Input() hasFillButton = true;
  @Input() hasOneEmployee = false;
  @Input() collapseByDefault = true;
  lookupsFilter: any[];

  advancedForm: FormGroup;
  teams: any;
  adminstration: any;
  locations: any;
  jobs: any;
  genders: any;
  collapsed = false;
  

  get Service(): AdvancedSearchService { return Shell.Injector.get(AdvancedSearchService); }

  constructor(
    public localize: LocalizationService,
    public fb: FormBuilder,
  ) {
    this.advanceSearch = new advancedSearch();
    this.fillData();
    this.advancedForm = fb.group({
      multiTeams: [null],
      multiAdministration: [null],
      multiLocation: [null],
      multiJobs: [null],
      multiGenders: [null],
      employeeId: [null]
    });
  }

  ngOnInit() {

  }

  returnSearch(advanceSearch: advancedSearch): advancedSearch {

    if (this.hasOneEmployee && this.advancedForm.value.employeeId != null) {
      advanceSearch.employeeId = this.advancedForm.value.employeeId;
    } else {
      if (this.hasTeams) {
        advanceSearch.teamId = ((this.advancedForm.value.multiTeams != null)
          && (this.advancedForm.value.multiTeams.length != 0)) ? this.advancedForm.value.multiTeams : null;
      }
      if (this.hasAdminstration) {
        advanceSearch.adminstrationId = ((this.advancedForm.value.multiAdministration != null)
          && (this.advancedForm.value.multiAdministration.length != 0)) ?
          this.advancedForm.value.multiAdministration.map(element => element.data) : null;
      }
      if (this.hasLocations) {
        advanceSearch.locationId = ((this.advancedForm.value.multiLocation != null)
          && (this.advancedForm.value.multiLocation.length != 0)) ? this.advancedForm.value.multiLocation : null;
      }
      if (this.hasJobs) {
        advanceSearch.jobId = ((this.advancedForm.value.multiJobs != null)
          && (this.advancedForm.value.multiJobs.length != 0)) ? this.advancedForm.value.multiJobs : null;
      }
      if (this.hasGenders) {
        advanceSearch.genderId = ((this.advancedForm.value.multiGenders != null)
          && (this.advancedForm.value.multiGenders.length != 0)) ? this.advancedForm.value.multiGenders : null;
      }
    }
    return advanceSearch;
  }

  onFillSearch() {
    this.advanceSearch.teamId=null;
    this.advanceSearch.genderId=null;
    this.advanceSearch.locationId=null;
    this.advanceSearch.jobId=null;

    if (this.hasOneEmployee && this.advancedForm.value.employeeId != null) {
      this.advanceSearch.employeeId = this.advancedForm.value.employeeId;
    } else {
      if (this.hasTeams && ( ( this.advancedForm.value.multiTeams != null)
      && (this.advancedForm.value.multiTeams.length != 0 ) ) ) {
          var listteamIds= this.advancedForm.get('multiTeams').value ;
          if (listteamIds.some(e => e == 0) )
          this.advanceSearch.teamId=this.lookupsFilter[0].map(item=>item.id);
          else
          this.advanceSearch.teamId=this.advancedForm.value.multiTeams;

        }
      if (this.hasAdminstration) {
        this.advanceSearch.adminstrationId = ((this.advancedForm.value.multiAdministration != null)
          && (this.advancedForm.value.multiAdministration.length != 0)) ?
          this.advancedForm.value.multiAdministration.map(element => element.data) : null;
      }
      if (this.hasLocations && ( ( this.advancedForm.value.multiLocation != null)
      && (this.advancedForm.value.multiLocation.length != 0) )) {

        var listLocationIds= this.advancedForm.get('multiLocation').value ;
        if (listLocationIds.some(e => e == 0) )
        this.advanceSearch.locationId=this.lookupsFilter[1].map(item=>item.id);
        else
        this.advanceSearch.locationId=this.advancedForm.value.multiLocation;
      }
      if (this.hasJobs  &&  ((this.advancedForm.value.multiJobs != null)
      && (this.advancedForm.value.multiJobs.length != 0))) {
        var listJobIds= this.advancedForm.get('multiJobs').value ;
        if (listJobIds.some(e => e == 0) )
        this.advanceSearch.jobId=this.lookupsFilter[2].map(item=>item.id);
        else
        this.advanceSearch.jobId=this.advancedForm.value.multiJobs;
      }
      if (this.hasGenders && ((this.advancedForm.value.multiGenders != null)
      && (this.advancedForm.value.multiGenders.length != 0)) ) {
        var listGenderIds= this.advancedForm.get('multiGenders').value ;
        if (listGenderIds.some(e => e == 0) )
        this.advanceSearch.genderId=this.lookupsFilter[3].map(item=>item.id);     
        else
        this.advanceSearch.genderId=this.advancedForm.value.multiGenders;
      
      }
    }
//console.log(this.advanceSearch)
    this.fillSearch.emit(this.advanceSearch);
  }

  fillData(): void {
    this.Service.getAdvancedSearch().subscribe((data: any) => {
      this.teams = data[0];
      this.locations = data[1];
      this.jobs = data[2];
      this.genders = data[3].slice(0, 2);
      this.lookupsFilter=data
    });
  }

  onEmployeeCancel() {
    this.advancedForm.controls['employeeId'].setValue(null);
    this.advanceSearch.employeeId = null;
  }
  
  toggleAllSelection(selected, formControlName, index: number) {
    if (selected) {
      this.advancedForm.controls[formControlName]
        .patchValue([...this.lookupsFilter[index].map(item => item.id), 0]);
    } else {
      this.advancedForm.controls[formControlName].patchValue([]);
    }
  }
  toggleUnSelectAll( formControlName,index: number) {
    let selectedItems = this.advancedForm.controls[formControlName].value.filter(e => e != 0);
    if (selectedItems.length == this.lookupsFilter[index].length )
    {
      selectedItems.push(0);
    }
    this.advancedForm.controls[formControlName].patchValue(selectedItems);
  }

  openDropDown(formControlName, index: number){
    var listids= this.advancedForm.get(formControlName).value ;
    if( listids != null )
    {
       if (listids.some(e => e == 0) )   
       this.toggleAllSelection(true, formControlName, index)
    }
    
     
   }
   closeDropDown(formControlName){
     var listids= this.advancedForm.get(formControlName).value ;
     if( listids != null )
     {

       if ( listids.some(e => e == 0) ) 
       this.advancedForm.controls[formControlName].patchValue([0]); 
     }
    

   }

  // toggleAllSelection(selected, isGroup) {
  //   
  //   if (selected && isGroup) {
  //     this.advancedForm.controls.multiTeams.patchValue([...this.teams.map(item => item.id), 0]);
  //   } else if (selected && !isGroup) {
  //     this.advancedForm.controls.multiLocation.patchValue([...this.locations.map(item => item.id), 0]);

  //   } else {
  //     if (isGroup) { this.advancedForm.controls.multiTeams.patchValue([]); } else { this.advancedForm.controls.multiLocation.patchValue([]); }
  //   }
  // }
  // toggleUnSelectAll(isGroup)
  // {
  //   if (isGroup) { 
  //     var selectedItems= this.advancedForm.controls.multiTeams.value.filter(e => e != 0);
  //     this.advancedForm.controls.multiTeams.patchValue(selectedItems);
  //   } 
  //   else
  //    { 
  //      var selectedItems= this.advancedForm.controls.multiLocation.value.filter(e => e != 0);
  //      this.advancedForm.controls.multiLocation.patchValue(selectedItems);
  //    }

  // }

 

}
