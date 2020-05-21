import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string = '';
  auth2: any;

  constructor(public router: Router, public serUsr: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';  // si viene vacio o undefined deja vacio

    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '262855052009-8gcvjdghrirpnen4gn8abfvg63ovhhlg.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(elementoHTML) {
       this.auth2.attachClickHandler(elementoHTML, {}, (googleUser) => {
         /* const profile = googleUser.getBasicProfile();  */
         const token = googleUser.getAuthResponse().id_token;
         this.serUsr.LoginGoogle(token).subscribe(resp => {
          // tslint:disable-next-line: max-line-length
          window.location.href = '#/dashboard';   /// esto se hace para evitar el error que no carge los estilos cuando se logea por google y opciones del menu de la izquierda
         });

        /*  console.log(token); */
       });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    const datosLogin = new Usuario('', forma.value.email, forma.value.password);

    this.serUsr.Login(datosLogin, forma.value.recuerdame).subscribe(resp => {
      this.router.navigate(['/dashboard']);
    });
    //
  }

}
