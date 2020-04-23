import { Component, OnInit, ɵConsole } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progresoAzul: number = 10;
  progresoVerde: number = 40;
  constructor() { }

  ngOnInit() {
  }

}
