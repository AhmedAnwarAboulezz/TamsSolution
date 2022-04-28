import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Organization } from 'src/app/models/Organization';
import { OrganizationLicence } from 'src/app/models/organizationLicence';
import { OrganizationService } from '../services/organization.service';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-organization-licences',
  templateUrl: './organization-licences.component.html',
  styleUrls: ['./organization-licences.component.scss']
})
export class OrganizationLicencesComponent extends BaseComponent implements OnInit {
  get Service(): OrganizationService { return Shell.Injector.get(OrganizationService); }
  
  organiztionID: any;
  licenceForm: FormGroup;

  model: OrganizationLicence = {};
  constructor(
    private fb: FormBuilder,
   
  ) {
    
    super();
    let organization = JSON.parse(localStorage.getItem('Organizations_data')) as Organization;
    this.organiztionID = organization.id; 
    
    this.getData();
    
    
    
  }  

  ngOnInit() {
   
  }
  
   

  getData() {
    this.Service.getOrganizatiolicenseScreen(this.organiztionID).subscribe(res =>{
      this.model = res;
      
    } );   
      
  }
  
 

}
