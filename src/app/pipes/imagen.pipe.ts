import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string): any {

    let url = URL_SERVICIOS + '/imagenes/';

    if (!img) {
      return url + '/usuarios/xxx';
    }

    /// saber si es una imagen de google
    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += 'usuario/' + img;
        break;
      case 'medico':
        url += 'medico/' + img;
        break;
      case 'hospital':
        url += 'hospital/' + img;
        break;
      default:
        console.log('tipo de imagen no existe');
        url += '/usuarios/xxx';
    }
    return url;
  }

}
