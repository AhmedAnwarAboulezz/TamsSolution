import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BalanceCaluculationWay } from 'src/app/enums/BalanceCaluculationWay';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { LeaveRegulationsService } from '../service/leave-regulations';
import { Shell } from 'src/app/component/shell';
import { Leavestype } from 'src/app/models/Leavestype';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'leave-regulation-calculations',
  templateUrl: './leave-regulation-calculations.component.html',
  styleUrls: ['./leave-regulation-calculations.component.scss']
})
export class LeaveRegulationCalculationsComponent  extends BaseComponent implements OnInit {
  RegulationleavesTypes: Leavestype[];

  @Input() leaveRegulationCalculationForm: FormGroup;
  @Input() currentLeaveTypeId: number;

  balanceCaluculationWays: any;
  get Service(): LeaveRegulationsService { return Shell.Injector.get(LeaveRegulationsService); }
  constructor(private fb: FormBuilder) {
      super();

      this.Service.getBalanceWays().subscribe(data => {
         this.balanceCaluculationWays = data;
      });
      this.Service.getLeaveTypes().subscribe(data => {

        this.RegulationleavesTypes = data;
        this.RegulationleavesTypes = this.RegulationleavesTypes.filter(x => x.id != this.currentLeaveTypeId);
      });
     }
     toggleAllSelection(selected) {

      if (selected) {
        this.leaveRegulationCalculationForm.controls.leaveRegulationLeavesType
          .patchValue([...this.RegulationleavesTypes.map(item => item.id), 0]);
      } else {
        this.leaveRegulationCalculationForm.controls.leaveRegulationLeavesType.patchValue([]);
      }
    }
  ngOnInit() {

  }
  onCheckChange(event) {
    if (!event.checked) {
      this.leaveRegulationCalculationForm.patchValue({
        leaveRegulationLeavesType: null
      });
    }else{
      this.leaveRegulationCalculationForm.controls.leaveRegulationLeavesType
      .patchValue([...this.RegulationleavesTypes.map(item => item.id), 0]);
    }
  }
}
