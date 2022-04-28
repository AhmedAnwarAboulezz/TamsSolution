import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { FormBuilder, Validators } from '@angular/forms';
import { Team } from 'src/app/models/team';
import { TeamsService } from '../Services/teams.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamDetailsComponent } from '../team-details/team-details.component';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent  extends BaseEditComponent implements OnInit {
  model: Team = {};
  id: string;
  url = 'Teams/GetAllPaged';
  saveBtn = false;
  get Service(): TeamsService { return Shell.Injector.get(TeamsService); }
  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TeamComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    
    this.form = this.resetForm(this.model);
    this.dialogRef.afterClosed().subscribe(() => {
      if (this.saveBtn == true && this.isNew == true) 
      {
        this.openDetails();
      }
    });
  }
  onAddSave(event){
    this.saveBtn = event.buttonType === 'SaveClose' ? true : false;
    this.close(event, this.resetForm(new Team()));
  }
  
  resetForm(model: Team): any {
    let resetForm = this.fb.group({
      id: [model.id],
      code: [model.code],
      teamNameFl: [model.teamNameFl,[ Validators.required,this.removeSpaces]],
      teamNameSl: [model.teamNameSl,this.removeSpaces],
      isWorkflow :[model.isWorkflow != null ? model.isWorkflow : false]

    });
    return resetForm;
  }
  ngOnInit() {
  }


  
  openDetails(){
    let maindata = {
      code: this.form.value.code,
       nameFl: this.form.value.teamNameFl, nameSl: this.form.value.teamNameSl
    };
    this.Service.getTeamByMainData(maindata).subscribe((res: any) => {
      this.openViewDetail(TeamDetailsComponent, res);
     });
  }


  protected openDialog(dialog: any, data: any, width: any, height?:any): void {
    this.dialog.open(dialog, {
      height,
      width,
      data,
      panelClass: 'my-dialog',
      direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr'),
      disableClose:true
    });
  }

  openViewDetail(dialog: any, data: any, width = '1100px') {
    this.openDialog(dialog, data, width);
  }
  
}

