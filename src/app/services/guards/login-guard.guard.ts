import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public serusu: UsuarioService, public router: Router) {

  }

  canActivate() {

    if (this.serusu.estaLogeado()) {
      return true;
    } else {
      console.log('Bloqueado por el guard');
      return false;
    }

  }

}
