import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public tipo: string;  // varible que recibe el tipo de imagen que quiere subir usuario,medico,hospital
  public id: string;   // recibe el id del usuario, medico u hospital
  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>(); // poder emitir algo donde los otros componentes que utilizan este servicio,
                                                      // se puedan suscribir y estar escuchando cuando se subio la imagen,
                                                      // con esto notificar del modal a las otras pantallas que ya se subio la imagen
                                                      // tslint:disable-next-line: max-line-length
                                                      // (any) va a contener el objeto respueta del servicio de carga de imagenes del backend
  constructor() {

    console.log('servicio carga imagenes listo!');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
