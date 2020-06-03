import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  idUsu: number;
  constructor(public http: HttpClient, public router: Router, public serusu: UsuarioService) { }

  buscarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);
  }

  buscarHospitalPorId(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
                    .pipe(map((resp: any) => {
                      return resp;
                    }));
  }

  borrarHospital(idHospital: number) {
    let url = URL_SERVICIOS + '/hospital/' + idHospital.toString();
    url += '?token=' + this.serusu.token;
    return this.http.delete(url)
                .pipe(map((resp: any) => {
                  swal('Hospital Borrado', 'El hospital se elimino correctamente', 'success');
                  return true;
                }));
  }

  crearHospital(hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.serusu.token;
    return this.http.post(url, hospital)  /// otra opcion -> crearHospital(Nombre: string) return this.http.post(url, {Nombre})
     .pipe(map((res: any) => {
      swal({
        title: 'Proceso Terminado',
        icon: 'success',
      });
    }));

  }

  busquedaHospitales(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url);
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital.IdHospital;
    url += '?token=' + this.serusu.token;
    return this.http.put(url, hospital)
                    .pipe(map(resp => {

                      const hospitalDB: Hospital = hospital;

                      swal('Hospital Actualizado', hospital.Nombre , 'success');
                      return true;
                    }));
  }


}
