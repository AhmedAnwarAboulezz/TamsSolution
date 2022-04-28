import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OptionType } from '../../models/enum';

@Component({
    selector: 'app-delete-options-dialog',
    templateUrl: 'delete-options.component.html',
    styleUrls: [],
})
export class DeleteOptionsComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeleteOptionsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    ngOnInit(): void {
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    onOptionClick(option: any): void {
        this.dialogRef.close({ option });
    }
}

export interface DialogData {
    option: OptionType;
}
