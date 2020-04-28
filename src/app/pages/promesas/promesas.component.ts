import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { resolve } from 'url';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      mensaje => console.log('Termino ok', mensaje)
    ).catch( error => {console.log('Error en la promesa', error); });

  }


  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(( resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if ( contador === 3) {
           resolve(true);
           /* reject('Error'); */
           clearInterval(intervalo);  /// break en los ciclo acaba la ejecucion del setInterval()
        }
      }, 1000);
    });

  }

}
