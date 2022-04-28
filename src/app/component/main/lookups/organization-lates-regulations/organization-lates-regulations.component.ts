import { Component, OnInit } from '@angular/core';
import { OrganizationLateRegulationService } from './Services/organization-late-regulation.service';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OrganizationLateRegulationComponent } from './organization-late-regulation/organization-late-regulation.component';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';

@Component({
  selector: 'app-organization-lates-regulations',
  templateUrl: './organization-lates-regulations.component.html',
  styleUrls: ['./organization-lates-regulations.component.scss']
})
export class OrganizationLatesRegulationsComponent extends BaseListComponent implements OnInit {
  get Service(): OrganizationLateRegulationService {
    return Shell.Injector.get(OrganizationLateRegulationService);
  }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'organizationLatesRegulations.organizationLatesRegulations',
    componentName: 'OrganizationLatesRegulationsComponent'

  };
  public columns: ColumnsInterface[] = [
    {
      field: 'startDate',
      header: 'organizationLatesRegulations.startDate',
      printField: 'startDateStr',
      filterMode: 'date',
      customCell: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      header: 'organizationLatesRegulations.endDate',
      printField: 'endDateStr',
      filterMode: 'date',
      customCell: 'date',
      selector: true,
      print: true,
      sort: true
    },

    {
      field: 'calcLateGoingOutDuty',
      header: 'organizationLatesRegulations.calcLateGoingOutDuty',
      filterMode: 'check',
      customCell: 'check',
      print: true,
      selector: true
    },
    {
      field: 'goingOutAllowance',
      header: 'organizationLatesRegulations.goingOutAllowance',
      filterMode: 'text',
      print: true,
      selector: true
    },
    {
      field: 'calcTotalLates_LateIn',
      header: 'organizationLatesRegulations.calcTotalLates_LateIn',
      filterMode: 'check',
      customCell: 'check',
      print: true,
      selector: true
    },
    {
      field: 'calcTotalLates_EarlyOut',
      header: 'organizationLatesRegulations.calcTotalLates_EarlyOut',
      filterMode: 'check',
      customCell: 'check',
      print: true,
      selector: true
    },
    {
      field: 'calcTotalLates_LateGoingOutDuty',
      header: 'organizationLatesRegulations.calcTotalLates_LateGoingOutDuty',
      filterMode: 'check',
      customCell: 'check',
      print: true,
      selector: true
    },
    {
      field: 'calclateAfterDutyAllowanceIn',
      header: 'organizationLatesRegulations.calclateafterDutyallowanceincoul',
      filterMode: 'check',
      customCell: 'check',
      print: true,
      selector: true
    },
    {
      field: 'calcEarlyOutBeforeAllowanceOut',
      header: 'organizationLatesRegulations.calcearlyoutbeforeallowanceoutcoul',
      filterMode: 'check',
      customCell: 'check',
      print: true,
      selector: true
    },
    {
      field: 'isDefault',
      header: 'organizationLatesRegulations.default',
      filterMode: 'check',
      customCell: 'check',
      print: true,
      selector: true
    }

  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      isView: false
    }
    ,
    {
      isDelete: true
    }
  ];
  addEvent(model: any) {

    super.add(OrganizationLateRegulationComponent, model);
  }
  ngOnInit(): void {
  }

}
