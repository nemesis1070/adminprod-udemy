import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  datausuario: Usuario;
  constructor(public serus: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.datausuario = this.serus.usuario;
  }

  buscar(terminoBusqueda: string) {

    console.log(terminoBusqueda);
    this.router.navigate(['/busqueda', terminoBusqueda]);
  }
}
