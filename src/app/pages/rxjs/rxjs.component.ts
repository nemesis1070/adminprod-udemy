import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map , retry , filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;
  constructor() {

    this.subscripcion = this.regresaObservable()
                        .subscribe(
                        numero => console.log('subs', numero),      /// llamado cuando recibe informacion
                        error => console.log('Error obs', error),    /// llamado cuando recibe errores
                        () => {console.log('El obsevable termino');  //// llamado cuando completo y temrino el observable
                        });

   /*  this.regresaObservable().pipe(
      // tslint:disable-next-line: max-line-length
      retry(2) //con esta instruccion se le ordena volver a intentar ejecutar el observable, se enviar como parametro el numero de intentos
    ).subscribe(
    numero => console.log('subs', numero),      /// llamado cuando recibe informacion
    error => console.log('Error obs', error),    /// llamado cuando recibe errores
    () => {console.log('El obsevable termino');  //// llamado cuando completo y temrino el observable
    }); */

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe(); /// termina la ejecuacion del observable cuando se sale de la pagina
  }


  regresaObservable(): Observable<any> {  /// la funcion retorna un observable de tipo numerico

    return new Observable(observer => {

      let contador = 0;
      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);  /// va a hacer la notificacion que esta llegando un numero cada segundo

      /*   if ( contador === 3) {
          clearInterval(intervalo);  /// detiene la ejecucion del ciclo
          observer.complete();   /// se termina el observable se desuscribe
        } */

        // if ( contador === 2) {
        //   observer.error('fallo');
        // }
      }, 1000);
    }).pipe(
      map((result: any) => result.valor),  //// forma simplificada de retornar de una funcion de flecha
      // tslint:disable-next-line: max-line-length
      filter( (valor, index) => {  /// el  filter tiene como parametro una funcion y esta recibe el valor= retornado del observable y el index= el numero de veces que se recibe una notificacion del observable

        if ((valor % 2) === 1) {  /// identificar numero impar
          return true;
        } else {
          return false;
        }
        ////// con este filtro solamente se retorna al subscribe la informacion que necesito
      })
      );

  }
}
