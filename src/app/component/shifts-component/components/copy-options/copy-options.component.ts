import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import moment from 'moment';
import { OptionType } from '../../models/enum';

@Component({
    selector: 'app-copy-options-dialog',
    templateUrl: 'copy-options.component.html',
    styleUrls: [],
})
export class CopyOptionsComponent implements OnInit {
    isOverride = true;
    selectedDate:Date = new Date();
    constructor(public dialogRef: MatDialogRef<CopyOptionsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {
         if(data.calendarType =="month")
         {
             this.selectedDate = moment(data.currentdate).add(1,'months').toDate();
         }else
         {
            this.selectedDate = moment(data.currentdate).add(1,'weeks').toDate();

         }
        
     }

    ngOnInit(): void {

    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    onOptionClick(option: boolean): void {
        this.dialogRef.close({ saveAndCopy: option, date: new Date(this.selectedDate), isOverride:this.isOverride });
    }
    
}

export interface DialogData {
    calendarType: string;
    currentdate: Date;
  }


