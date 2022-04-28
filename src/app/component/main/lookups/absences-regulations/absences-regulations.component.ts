import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { AbsencesregulationsService } from './Services/absencesregulations.service';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { MatDialog } from '@angular/material';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { AbsenceRegulation } from 'src/app/models/absenceRegulation';
import { AbsenceregulationComponent } from './absencesregulations/absenceregulation/absenceregulation.component';

@Component({
  selector: 'app-absences-regulations',
  templateUrl: './absences-regulations.component.html',
  styleUrls: ['./absences-regulations.component.scss']
})
export class AbsencesRegulationsComponent extends BaseListComponent implements OnInit{
  get Service():  AbsencesregulationsService { return Shell.Injector.get( AbsencesregulationsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);

  }
  viewModel = [];

  tableData = {
    name: 'absencesRegulations.absencesRegulations',
    componentName: 'AbsencesRegulationsComponent'

  };
  public columns: ColumnsInterface[] = [
    {
      field: 'startDate',
      header: 'absencesRegulations.startDate',    
      filterMode: 'date',
      customCell: 'date',
      selector: true,      
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      header: 'absencesRegulations.endDate',    
      filterMode: 'date',
      customCell: 'date',
      selector: true,      
      print: true,
      sort: true
    },
   
    {
      field: 'calcOneSigninDuty',
      header: 'absencesRegulations.calcOneSigninDuty',
      filterMode: 'check',
      customCell: 'check',
      selector: true
    },
    {
      field: 'calcContAbsWeekEnd',
      header: 'absencesRegulations.calcContAbsWeekEnd',
      filterMode: 'check',
      customCell: 'check',
      selector: true
    },
    {
      field: 'calcContAbsRestday',
      header: 'absencesRegulations.calcContAbsRestday',
      filterMode: 'check',
      customCell: 'check',
      selector: true
    },
    {
      field: 'calcContAbsHoliday',
      header: 'absencesRegulations.calcContAbsHoliday',
      filterMode: 'check',
      customCell: 'check',
      selector: true
    },
    {
      field: 'calcAbsLateinDuty',
      header: 'absencesRegulations.calcAbsLateinDuty',
      filterMode: 'check',
      customCell: 'check',
      selector: true
    },
    {
      field: 'isDefault',
      header: 'absencesRegulations.default',
      filterMode: 'check',
      customCell: 'check',
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
      super.add(AbsenceregulationComponent, model);
  }
 
  ngOnInit() {
  }

}
