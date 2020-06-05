import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
/* import 'rxjs/add/operator/map'; */
import swal from 'sweetalert';
import { map , catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  Email: string;
  menu: any[] = [];

  constructor(public http: HttpClient, public router: Router, public serSub: SubirArchivoService) {
    this.cargarStorage();
  }

  estaLogeado() {
    return (this.token.length > 5) ? true : false ;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = [];
    }
  }

  buscarUsuarioPorId(id: string) {
    const url = URL_SERVICIOS + '/usuario?id=' + id;
    return this.http.get(url)
                    .pipe(map((resp: any) => {
                      return resp.usuarios;
                    }));
  }

  buscarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
     .pipe(map((res: any) => {
      swal({
        title: 'Proceso Terminado',
        text: res.usuarios,
        icon: 'success',
      });
    }), catchError((error: HttpErrorResponse) => {
        swal('Error creacion usuario', 'Validacion de usuario fallida: ' + error.error.mensaje , 'error');
        return throwError(error);
  }));

  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario.IdUsuario;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
                    .pipe(map(resp => {

                      if (usuario.IdUsuario === this.usuario.IdUsuario) {
                        const usuarioDB: Usuario = usuario;
                        this.guardarStorage(usuarioDB.IdUsuario.toString(), this.token, usuarioDB, this.menu);
                      }
                      swal('Usuario Actualizado', usuario.Nombre , 'success');
                      return true;
                    }), catchError((error: HttpErrorResponse) => {
                      return throwError(error);
                }));
  }

  guardarStorage(id: string, token: string, usuario: Usuario , menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  LogOut() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('dataUsuario');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  LoginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
                    .pipe(map((resp: any) => {
                         console.log(resp);
                          // forma para llenar una objeto opcion 1
                         const data: Usuario = {
                            Nombre: resp.datos[0].Nombre,
                            Email: resp.datos[0].Email,
                            Password: resp.datos[0].Password,
                            Role: resp.datos[0].Role,
                            Img: resp.datos[0].Img,
                            Google: resp.datos[0].Google
                          };
                        // forma para llenar una objeto opcion 2
                        // tslint:disable-next-line: max-line-length
                        // this.dataUsuario = new Usuario(resp.datos[0].Nombre, resp.datos[0].Email, resp.datos[0].Password, resp.datos[0].Img, resp.datos[0].Role, resp.datos[0].Google, resp.datos[0].IdUsuario);
                         this.guardarStorage(resp.datos[0].IdUsuario, resp.Token, data, resp.menu);
                        /* localStorage.setItem('dataUsuario', item); */
                         return true;
                    }));
  }

  Login(usuario: Usuario, recordar: boolean= false) {

    if ( recordar) {
      localStorage.setItem('email', usuario.Email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
               .pipe(map((resp: any) => {
                    console.log(resp);
                    this.guardarStorage(resp.mensaje.IdUsuario, resp.Token, resp.mensaje, resp.menu);
                    return true;
                }), catchError((error: HttpErrorResponse) => {
                    swal('Error en el Login', error.error.mensaje , 'error');
                    return throwError(error);
                }));
  }


  cambiarImagen(file: File , id: string) {
    this.serSub.subirArchivo(file, 'usuario', id)
               .then(resp => {

                this.buscarUsuarioPorId(id).subscribe((res: any) => {
                  const usuarioDB: Usuario = res[0];
                  usuarioDB.Password = '';
                  this.guardarStorage(id, this.token, usuarioDB, this.menu);
                  swal('Imagen Actualizada', usuarioDB.Nombre , 'success');
                });
               }).catch(resp => {
                console.log(resp);
               });
  }

  busquedaUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url);
  }

  borrarUsuario(idUsuario: number) {

    const url = URL_SERVICIOS + '/usuario/' + idUsuario + '?token=' + this.token ;
    return this.http.delete(url)
                .pipe(map((resp: any) => {
                  swal('Usuario Borrado', 'El usuario se elimino correctamente', 'success');
                  return true;
                }));
  }

}
