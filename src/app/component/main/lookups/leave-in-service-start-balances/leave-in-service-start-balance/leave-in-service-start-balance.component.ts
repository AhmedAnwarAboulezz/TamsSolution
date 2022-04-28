import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { LeaveInServiceStartBalancesService } from '../service/leaveInServiceStartBalances.service';

@Component({
  selector: 'app-leave-in-service-start-balance',
  templateUrl: './leave-in-service-start-balance.component.html',
  styleUrls: ['./leave-in-service-start-balance.component.scss']
})


export class LeaveInServiceStartBalanceComponent extends BaseEditComponent implements OnInit {

  leaveRegulations: any[];
  numberOfTimesPerService:number;
  model: any = {};
  id: string;
  url = 'LeaveInServiceStartBalances/GetAllPaged';
  get Service(): LeaveInServiceStartBalancesService { return Shell.Injector.get(LeaveInServiceStartBalancesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<LeaveInServiceStartBalanceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getleaveRegulations();

    
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.onleaveRegulationChange(this.model.leaveRegulationId);

    }
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId,Validators.required],
      leaveRegulationId: [this.model.leaveRegulationId, Validators.required],
      numberOfTimesInService: [this.model.numberOfTimesInService,Validators.required],

    });
  }
  ngOnInit() {
    
  }
  getleaveRegulations(): void {
    this.Service.getLeaveRegulation().subscribe((data: any) => {
     this.leaveRegulations = data;
    });
  }
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }

  onleaveRegulationChange(event) {
    if (event != null) {
      this.Service.getLeaveRegulationById(event)
        .subscribe(data => {
          this.numberOfTimesPerService = data.leaveRegulationBalance.numberOfTimesPerService;
         
        });
    } 
  }

  checknumberOfTimesPerServicelength(){
    
    var numberOfTimesPerServiceLength= this.form.get('numberOfTimesInService').value;
   if(numberOfTimesPerServiceLength > this.numberOfTimesPerService){
    this.form.get('numberOfTimesInService').setValidators([Validators.min(1),Validators.max(this.numberOfTimesPerService)]);
   }
  }
}