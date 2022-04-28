import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent implements OnInit {

  // inputs
  @Input() singleDataSet: SingleDataSet = [];
  @Input() multipleDataSet: MultiDataSet = [];
  @Input() colors: string[] = [];
  @Input() labels: Label[] = [];

  // options
  doughnutChartLabels: Label[] = [];
  doughnutChartColors: Color[] = [];
  doughnutChartMultiData: MultiDataSet = [[], []];
  doughnutChartSingleData: SingleDataSet = [];
  doughnutChartOptions: ChartOptions = {
    responsive: true,
    animation: {
      easing: 'easeInOutBack'
    },
    plugins: {
      labels: [
        {
          render: 'percentage',
          position: 'inside',
          fontColor: 'black',
          fontSize: 14,
          fontStyle: 'bold',
          precision: 0
        }
      ]
    }
  };
  doughnutChartType: ChartType = 'doughnut';
  constructor() { }

  ngOnInit() {
    this.doughnutChartLabels = this.labels;
    this.doughnutChartSingleData = this.singleDataSet;
    this.doughnutChartColors = [{
      backgroundColor: this.colors
    }];
  }

}
