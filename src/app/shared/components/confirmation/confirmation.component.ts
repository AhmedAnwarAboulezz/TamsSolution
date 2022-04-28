import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../data-table/components/Delete-dialog.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationComponent implements OnInit {

  title: string;
  message: string;

  constructor (public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
  { 
    this.title = this.data.title;
    this.message = this.data.message;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
      this.dialogRef.close({ data: false });
  }

  onYesClick(): void {
      this.dialogRef.close({ data: true });
  }
}

