import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( public ususer: UsuarioService, public router: Router) {}

  canActivate() {

    if (this.ususer.usuario.Role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('BLOQLEADO POR EL ADMIN GUARD');
      this.ususer.LogOut();
      return false;
    }
  }

}
