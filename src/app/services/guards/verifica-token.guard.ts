import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public serusu: UsuarioService, public router: Router) {

  }

  canActivate(): Promise<boolean>| boolean {  /// el guard va a regresar una promesa que retorna un boleano ó un booleno

    console.log('Token guard');
    const token = this.serusu.token;
    const payload = JSON.parse(atob(token.split('.')[1])); /// atob => decodifica una cadena de datos que esta codificada en base 64

    const expirado = this.tokenExpiro(payload.exp);

    if ( expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    // console.log(new Date(payload.exp * 1000) );
    return this.verficaRenovarToken(payload.exp);
  }

  tokenExpiro(fecExp: number) {
      const fechaActual = new Date().getTime() / 1000;  // la fecha esta en milisegundos se convierte en segundos
      if ( fecExp < fechaActual) {
        return true;
      } else {
        return false;
      }
  }

  verficaRenovarToken(fecExp: number): Promise<boolean> {

    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {

      const tokenExp = new Date(fecExp * 1000); // convetir la fecha en milisegundos
      const fechaActual = new Date();

      fechaActual.setTime(fechaActual.getTime() + (1 * 60 * 60 * 1000)); /// suma 1 a la fecha

      if (tokenExp.getTime() > fechaActual.getTime()) {
        resolve(true);
      } else {
        this.serusu.renuevaToken()
                   .subscribe(() => {
                     resolve(true);
                   } , () => {
                     reject(false);
                     this.router.navigate(['/login']);
                   });
      }
      resolve(true);
    });
  }
}
