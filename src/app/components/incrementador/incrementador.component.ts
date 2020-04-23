import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

   @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;

   @Input('nombre') leyenda: string = 'Leyenda';
   @Input() progreso: number = 50;

   @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

  cambiarValor(valor: number) {

    if (this.progreso >= 100 && valor > 0) {
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor < 0) {
      return this.progreso = 0;
    }

    this.progreso += valor;
    this.cambioValor.emit(this.progreso);
  }

  Onchange(nuevoValor: number) {

    console.log(this.txtProgress);
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

}
