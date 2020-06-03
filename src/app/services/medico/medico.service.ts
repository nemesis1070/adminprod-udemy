import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { map } from 'rxjs/internal/operators/map';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient, public router: Router, public serusu: UsuarioService) { }


  buscarMedicos(desde: number = 0) {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url);
  }

  busquedaMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url);
  }

  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if (medico.IdMedicos) {
      // actualizar medico
      url += '/' + medico.IdMedicos.toString();
      url += '?token=' + this.serusu.token;
      return this.http.put(url, medico)
      .pipe(map((res: any) => {
        swal({
          title: 'Medico Actualizado',
          icon: 'success',
        });
      }));
    } else {
      // creando medico
      url += '?token=' + this.serusu.token;
      return this.http.post(url, medico)
       .pipe(map((res: any) => {
        swal({
          title: 'Medico Creado',
          icon: 'success',
        });
        return res;
      }));
    }

  }


  borrarMedico(idMedico: number) {
    let url = URL_SERVICIOS + '/medico/' + idMedico.toString();
    url += '?token=' + this.serusu.token;
    return this.http.delete(url)
                .pipe(map((resp: any) => {
                  swal('Hospital Borrado', 'El hospital se elimino correctamente', 'success');
                  return true;
                }));
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
                .pipe(map((resp: any) => {
                  return resp;
                }));
  }
}
