import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient} from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
/* import 'rxjs/add/operator/map'; */
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  estaLogeado() {

    console.log(this.token);
    return (this.token.length > 5) ? true : false ;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
      this.usuario = null;
    }
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
    }));

  }

  guardarStorage(id: string, token: string, usuario: string) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', usuario);
    // this.usuario = usuario;
    this.token = token;
  }

  LogOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  LoginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
                    .pipe(map((resp: any) => {
                        this.guardarStorage('', resp.Token, '');
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
                    this.guardarStorage(resp.mensaje.IdUsuario, resp.Token, JSON.stringify(resp.mensaje));
                    return true;
                }));
  }

}
