import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { LocationProofEnum } from 'src/app/enums/LocationProofEnum';
import { Country } from 'src/app/models/country';
import { Location } from '../../../../../models/location';
import { LocationsService } from '../Services/locations';


@Component({
  selector: 'app-define-zone',
  templateUrl: './define-zone.component.html',
  styleUrls: ['./define-zone.component.scss']
})


export class DefineZoneComponent extends BaseEditComponent implements OnInit {
  locationProofEnum = LocationProofEnum;
  countries: Country[];
  polygans: any[];

  model: any = {};
  locationProofs:any[] = [];
  id: string;
  url = 'Locations/GetAllPaged';

  templateDaysArray: number[] = [];
  locationBeaconsArray: any;
  get Service(): LocationsService { return Shell.Injector.get(LocationsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DefineZoneComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.locationProofs = [
      { id: this.locationProofEnum['point'], nameFl: "Point & Zone", nameSl: "نقطة بموقع" },
      { id: this.locationProofEnum['polygon'], nameFl: "Polygon", nameSl: "رسم حدود" },
      { id: this.locationProofEnum['beacon'], nameFl: "Beacon Devices", nameSl: "أجهزة البيكون" },

  ]
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      lat: [this.model.lat],
      lng: [this.model.lng],
      distance: [+this.model.distance > 0 ? +this.model.distance : 10],
      typeId: [this.model.typeId, Validators.required],
      locationPolygons:[this.model.locationPolygons],
      beaconNumber: [this.model.beaconNumber, Validators.required],
      locationBeacons: this.getFormArray(this.model.locationBeacons)
    });
    this.locationBeaconsArray = this.form.get('locationBeacons') as FormArray;
    for (let i = 1; i <= this.model.beaconNumber; i++) {
      this.templateDaysArray.push(i);
    }
  }
  ngOnInit() {
    
  }

  getFormArray(list): FormArray {
    let array: FormArray = new FormArray([]);
    if (!list) {
      return array;
    } else {
      for (var i = 0; i < this.model.beaconNumber; i++) {
        array.push(this.fb.group(list[i]));
      }
    }
    return array;
  }
  onTemplateDaysChange() {

    //this.isChanged = false;
    let value = this.form.value.beaconNumber;
    let array = this.form.get('locationBeacons') as FormArray;
    if (this.form.value.locationBeacons.length == 0) {
      this.templateDaysArray = [];
      for (let i = 1; i <= value; i++) {
        this.templateDaysArray.push(i);
        array.push(this.fb.group({  nameFl: '',  nameSl: '',  uuid: '', locationId: this.model.id }));
      }
    }
    else if (this.form.value.locationBeacons.length > this.form.value.beaconNumber) {
      let dailyLength = this.form.value.locationBeacons.length;
      for (let i = dailyLength - 1; i >= value; i--) {
        this.templateDaysArray.splice(i);
        array.removeAt(i);
      }
    }
    else {
      let dailyLength = this.form.value.locationBeacons.length;
      for (let i = dailyLength + 1; i <= value; i++) {
        this.templateDaysArray.push(i);
        array.push(this.fb.group({  nameFl: '',  nameSl: '',  uuid: '', locationId: this.model.id}));
      }
    }
    //this.isChanged = true;
  }

  changeType(){
    this.form.controls['lat'].setValue(null);
    this.form.controls['lng'].setValue(null);
    this.form.controls['distance'].setValue(null);
    this.polygans = [];
  }
  applyZone(event){
    console.log(event);
    if(this.form.value.typeId == this.locationProofEnum['polygon']){
      this.form.controls['lat'].setValue(null);
      this.form.controls['lng'].setValue(null);
      this.form.controls['distance'].setValue(null);
      this.polygans = event.polygan;
      event.polygan.forEach(element => {
        element.locationId = this.model.id;
      });
      this.form.value.locationPolygons = event.polygan;

    }
    else if(this.form.value.typeId == this.locationProofEnum['point']){
      this.form.controls['lat'].setValue(event.latitude);
      this.form.controls['lng'].setValue(event.longitude);
      this.form.controls['distance'].setValue(event.reduis);
      this.polygans = [];
    }
  }

  onAddSave(){
    console.log("this form is",this.form.value);
    this.Service.AddLocationProof(this.form.value).subscribe(responce => {
      this.saveAndClose();
      this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
    }, error => {
      this.Alert.showError(this.getErrorMessage(error));
    }
    );
  }


  saveAndClose() {
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable(this.url);
    this.dialogRef.close();
  }
}
