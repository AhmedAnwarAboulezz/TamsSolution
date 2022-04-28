
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { LocationComponent } from './location/location.component';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { LocationsService } from './Services/locations';
import { Shell } from 'src/app/component/shell';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DefineZoneComponent } from './define-zone/define-zone.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent extends BaseListComponent implements OnInit {
  get Service(): LocationsService { return Shell.Injector.get(LocationsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'locations.locations',
    componentName: 'LocationsComponent'

  };
  
  public columns: ColumnsInterface[] = [
    {
      field: 'code',
      header: 'locations.code',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'locationFL',
      header: 'locations.locationFL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'locationSL',
      header: 'locations.locationSL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    
    {
      field: 'description',
      header: 'locations.description',    
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    
    {
      field: 'field.countryName',
      dropdownFilterName: 'countryId',
      header: 'locations.countryName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true,
      sortName:'field.countryField',
      isfield:true
    },
    
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      name: 'locations.defineZone',
      icon: 'my_location',
      isView: true
    },
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {
    this.lookups();

  }
  addEvent(model: any) {
    super.add(LocationComponent, model);
  }
  lookups(): void {
    this.Service.getLookup().subscribe((data: any) => {
      this.columns[4].filterDropdown = data;
    });
  }

  assignType(model: any) {
    this.Service.getLocationProof(model.id).subscribe(result => {
      super.openViewDetail(DefineZoneComponent,result);
    });
    // let newModel = {
    //   id:model.id,
    //   typeId:model.typeId? model.typeId : 0, 
    //   lng:model.lng, 
    //   lat:model.lat,
    //   distance: model.distance,
    //   beaconNumber: model.beaconLength? model.beaconLength : 0
    // }
    // super.openViewDetail(DefineZoneComponent,newModel);
  }

}
