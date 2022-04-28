import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Colors, Color, MultiLineLabel } from 'ng2-charts';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  // inputs
  @Input() data: ChartDataSets[] = [];
  @Input() labels: MultiLineLabel[] = [];
  @Input() colors: string[] = [];
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();


  // options
  barChartOptions: ChartOptions = {
    responsive: true,
    animation: {
      easing: 'easeInOutBack'
    },
    plugins:{
      labels: {
        render: 'value'
      }
    }    
    // title: {
    //   display: true,
    //   text: 'Custom Chart Title'
    // },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];
  barchartColors: Color[] = [];

  constructor() {
  }

  ngOnInit() {
    this.barChartData = this.data;
    this.barChartLabels = this.labels;
    this.barchartColors = [{
      backgroundColor: this.colors
    }];
  }


  public chartClicked({ event, active }: { event: MouseEvent, active: any }): void {
    if(active.length !== 0)
    {
      console.log("Click " , active[0]._index);
      console.log(event, active);
      this.clickEvent.emit(active[0]._index)
    }
  }

//   handleClick(ev): void {
//     // var activePoints = ev.getElementAtEvent(ev);
//     //  console.log("ttttt", activePoints[0]);
//     //   if (activePoints.length) {
//     //     //this.onClick2(element[0]);
//     //     console.log(activePoints[0].index);
//     //     this.clickEvent.emit(activePoints[0].index);
//     //   }
//     //this.clickEvent.emit(ev.index)
//  }

}
