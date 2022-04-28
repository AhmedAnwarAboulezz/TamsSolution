import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, MultiDataSet, Color } from 'ng2-charts';
import { Shell } from 'src/app/component/shell';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import * as pluginDataLabels from '../../../../../../node_modules/chartjs-plugin-labels';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})



export class PieComponent implements OnInit {

  // inputs
  @Input() labels: Label[] = [];
  @Input() singleDataSet: SingleDataSet = [];
  @Input() multipleDataSet: MultiDataSet = [];
  @Input() colors: string[] = [];
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  pieChartOptions: ChartOptions;
  pieChartColors: Color[] = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.pieChartLabels = this.labels;
    this.pieChartData = this.singleDataSet;
    this.pieChartColors = [{
      backgroundColor: this.colors
    }];
    this.pieChartPlugins = [];

    this.pieChartOptions = {
      responsive: true,
      legend:{
        position:'top'
      },
      plugins: {
        labels: [
          {
            render: 'label',
            position: 'outside',
            fontColor: this.colors,
            fontSize: 16,
            fontStyle: 'bold',
            textShadow: '-1px 0px 20px #ffffff'
            //arc: true,
          },
          {
            render: 'percentage',
            fontColor: 'white',
            fontSize: 14,
            fontStyle: 'bold',
            precision: 0
          }
          // {
          //   render: 'value',
          //   position: 'outside',
          //   fontColor: this.colors,
          //   fontSize: 14,
          //   fontStyle: 'bold',
          //   precision: 2
          // },
        ]
      }
    };

  }

  public chartClicked({ event, active }: { event: MouseEvent, active: any }): void {
    if(active.length !== 0)
    {
      console.log("Click " , active[0]._index);
      console.log(event, active);
      this.clickEvent.emit(active[0]._index)
    }
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: any }): void {
    // if(active.length !== 0)
    // {
    //   console.log("Hovered " , active[0]._index);
    //   this.clickEvent.emit(active[0]._index)
    // }
  }


  changeLegendPosition(): void {
    if(this.localize.lang === 'ar'){
      this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'top' ? 'left' : 'top';
    }
    else{
      this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'top' ? 'right' : 'top';

    }
  }


}
