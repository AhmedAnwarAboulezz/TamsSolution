import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-employee-duty-dashboard',
  templateUrl: './employee-duty-dashboard.component.html',
  styleUrls: ['./employee-duty-dashboard.component.scss']
})



export class EmployeeDutyDashboardComponent implements OnInit {
  emergencyAllowanceDescriptionTypes: any[];
  showDetails = false;
  constructor(public route: ActivatedRoute, public localize:LocalizationService) {
    this.emergencyAllowanceDescriptionTypes = [
      {
        id: "false", nameFl:"Employee Duties",nameSl:"دومات الموظفين"
      },
      {
        id: "true", nameFl:"Employee Fixed Duty Period",nameSl:"دوام ثابت فترات للموظفين"
      }
    ];
  }

  ngOnInit(): void {

  }
}

