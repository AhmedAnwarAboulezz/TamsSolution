import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-reset-modal',
  templateUrl: './reset-modal.component.html',
  styleUrls: []
})
export class ResetModalComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ResetModalComponent>,
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
