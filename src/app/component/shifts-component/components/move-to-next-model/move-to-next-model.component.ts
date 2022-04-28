import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-move-to-next-model',
  templateUrl: './move-to-next-model.component.html'
})


export class MoveToNextModelComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<MoveToNextModelComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
      this.dialogRef.close();
  }

  onYesClick(): void {
      this.dialogRef.close({ data: this.data });
  }
}

export interface DialogData {
  id: string;
}