import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { FormBuilder, Validators } from '@angular/forms';
import { Shell } from 'src/app/component/shell';
import { DevicesService } from '../Services/devices.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent extends BaseEditComponent implements OnInit {
  model: Device = {};
  id: string;
  url = 'devices/GetAllPaged';
  treeUrl = 'assets/data/files-lazy.json';

  get Service(): DevicesService { return Shell.Injector.get(DevicesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DeviceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      treminal_IP: [this.model.treminal_IP, [Validators.required,Validators.minLength(12),this.removeSpaces]],
      serialNumber: [this.model.serialNumber, [Validators.required,this.removeSpaces]],
      descriptionFl: [this.model.descriptionFl, [Validators.required,this.removeSpaces]],
      descriptionSl: [this.model.descriptionSl,this.removeSpaces],
      // treminal_IP: [this.model.treminal_IP, [Validators.required, Validators.maxLength(15), Validators.minLength(12)]],
      // serialNumber: [this.model.serialNumber, Validators.required],
      // descriptionFl: [this.model.descriptionFl, Validators.required],
      // descriptionSl: [this.model.descriptionSl],
      treeValueMulti: [''],
      treeValueSingle: ['c1390664-f82a-4b73-aaea-08d7a57ac88b']
    });
  }

  ngOnInit() {
  }

}
