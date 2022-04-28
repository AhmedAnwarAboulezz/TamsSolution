import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { OvertimeEmployeeOrdersComponent } from '../overtime-orders/overtime-employee-orders/overtime-employee-orders.component';
import { OvertimeOrderComponent } from '../overtime-orders/overtime-order/overtime-order.component';
import { OvertimeService } from '../overtime-orders/Services/overtime.service';
import { ApproveOvertimeAddComponent } from './approve-overtime-add/approve-overtime-add.component';

@Component({
  selector: 'app-approve-overtime',
  templateUrl: './approve-overtime.component.html',
  styleUrls: ['./approve-overtime.component.scss']
})


export class ApproveOvertimeComponent implements OnInit {
  emergencyAllowanceDescriptionTypes: any[];
  showDetails = false;
  constructor(public route: ActivatedRoute, public localize: LocalizationService) {
    this.emergencyAllowanceDescriptionTypes = [
      {
        id: "false", nameEn:"Approve Overtimes Description",nameAr:"إعتماد الوقت الإضافي"
      },
      {
        id: "true", nameEn:"Approved Employees",nameAr:"موظفين تم اعتمادهم"
      }
    ];
  }

  ngOnInit(): void {

  }
}
