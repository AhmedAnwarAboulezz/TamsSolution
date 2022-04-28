import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-show-tree',
  templateUrl: './show-tree.component.html',
  styleUrls: ['./show-tree.component.scss']
})
export class ShowTreeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
  }
  
  onNoClick() {
    this.dialogRef.close();
  }

}
