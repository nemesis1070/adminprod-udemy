import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string , id: string) {

    return new Promise(( resolve, reject) => {

    const formData = new FormData();
    const pet = new XMLHttpRequest();
    formData.append('Imagen', archivo, archivo.name);

    // configuracion peticion ajax para cargar la imagen en el backend
    // tslint:disable-next-line: only-arrow-functions
    pet.onreadystatechange = function() {
      if (pet.readyState === 4) {   //// cuando termina el proceso
        if ( pet.status === 200) {
          console.log('Imagen subida');
          resolve(JSON.parse(pet.response));
        } else {
          console.log('Fallo carga archivo');
          resolve(pet.response);
        }
      }
    };

    const url = URL_SERVICIOS + `/upload/${tipo}/${id}`;
    pet.open('PUT', url, true);
    pet.send(formData);
  });

  }
}
