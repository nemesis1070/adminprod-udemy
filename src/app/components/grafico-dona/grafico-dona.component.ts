import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('labels') doughnutChartLabels: Label[];
  @Input('data') doughnutChartData: MultiDataSet [];
  @Input('type') doughnutChartType: ChartType;
  @Input('nombre') leyenda: string = 'Leyenda';

  constructor() { }

  ngOnInit() {
  }

}
