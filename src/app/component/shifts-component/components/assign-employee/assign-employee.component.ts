import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/shared/components/data-table/components/Delete-dialog.component';
import { advancedSearch } from 'src/app/models/advancedSearch';

@Component({
  selector: 'app-assign-employee',
  templateUrl: './assign-employee.component.html',
  styleUrls: ['./assign-employee.component.scss']
})
export class AssignEmployeeComponent implements OnInit {
  advancedSearch = new advancedSearch();
  constructor(
    public dialogRef: MatDialogRef<AssignEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }
  fillSearchResult() {
    this.advancedSearch.typeProcess = 'Add';
    this.dialogRef.close({ fill: true, advancedSearch: this.advancedSearch });
  }

}
