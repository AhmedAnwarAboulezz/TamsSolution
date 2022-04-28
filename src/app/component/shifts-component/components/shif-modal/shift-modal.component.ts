import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Shift } from '../../models/employee';
import { ShiftService } from '../../services/shift.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from 'src/app/component/shell';
import { Mode } from '../../models/enum';

@Component({
  selector: 'app-shift-modal',
  templateUrl: 'shift-modal.component.html',
  styleUrls: [],
})
export class ShiftModalComponent implements OnInit {

  shift: Shift = {};
  shifts: any[] = [];
  shiftId: any = null;
  // @Input() oldDutyId: any;
  //@Input() isOverride: any;

  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  constructor(
    public dialogRef: MatDialogRef<ShiftModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public shiftService: ShiftService) { }

  ngOnInit(): void {
    this.shiftService.getDuties().subscribe((res: any) => {
      this.shifts = res;
      // this.shifts.unshift({
      //   nameFl: '',
      //   nameSl: ''
      // });
      console.log('res', res);
    });
  }
  setShift(eventId?: any): void {
    if(eventId){
      let event = this.shifts.find(a=>a.id==eventId);
      this.shiftId = event.id;
      this.shift.dutyId = event.id;
      this.shift.nameFl = event.nameFl;
      this.shift.nameSl = event.nameSl;
      this.shift.isChanged = true;
      this.shift.isDifferent = false;
      if (this.data.oldDutyId === event.id && this.data.mode == Mode.Cell) 
      {
        this.shift.isChanged = false;
      }

    }
    else{
      this.shift.isChanged = true;
      this.shift.isRemoved =true;
    }


    this.onYesClick();
    



  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.shift) {
      this.dialogRef.close({ data: this.shift });
    }
  }
}

export interface DialogData {
  mode: string;
  oldDutyId: string;
}
