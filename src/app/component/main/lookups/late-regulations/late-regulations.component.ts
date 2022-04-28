import { LateRegulationComponent } from './late-regulation/late-regulation.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { LateRegulationsService } from './Services/late-regulations.services';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { LateRegulation } from 'src/app/models/LateRegulation';

@Component({
  selector: 'app-late-regulations',
  templateUrl: './late-regulations.component.html',
  styleUrls: ['./late-regulations.component.scss']
})

export class LateRegulationsComponent extends BaseListComponent implements OnInit {
  viewModel = [];
  get Service(): LateRegulationsService { return Shell.Injector.get(LateRegulationsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'lateRegulations.lateRegulations',
    componentName: 'LateRegulationsComponent'

  };

  public columns: ColumnsInterface[] = [
    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'lateRegulations.startDate',
      filterMode: 'date',
      customCell: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'endDate',
      printField: 'endDateStr',
      header: 'lateRegulations.endDate',
      filterMode: 'date',
      customCell: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'lateRegulationNameFL',
      header: 'lateRegulations.lateRegulationFL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
    },
    {
      field: 'lateRegulationNameSL',
      header: 'lateRegulations.lateRegulationSL',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'field.deductionGroupTypeName',
      dropdownFilterName: 'deductionGroupTypeId',
      header: 'lateRegulations.deductionGroupTypeName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      sortName: 'field.deductionGroupTypefield',
      isfield: true
    },

  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      isView: true
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

    this.deductionGroupTypes();
  }

  addEvent(model: any) {
    if (model) {
      this.Service.getLateRegulationById(model.id).subscribe((res: LateRegulation) => {
        this.setModel(res, false);
        super.add(LateRegulationComponent, this.viewModel,'800px','max-content');
      });
    } else {
      super.add(LateRegulationComponent, model,'800px','max-content');
    }
  }
  viewDetail(model: any) {
    this.Service.getLateRegulationById(model.id).subscribe((res: LateRegulation) => {
      this.setModel(res, true);
      super.openViewDetail(LateRegulationComponent, this.viewModel);
    });
  }

  setModel(model, isView: boolean) {
    this.viewModel = [];
    this.viewModel.push(model);
    this.viewModel.push(isView);
  }

  deductionGroupTypes(): void {
    this.Service.getdeductionGroupTypes().subscribe((data: any) => {
      this.columns[4].filterDropdown = data;
    });
  }

}
