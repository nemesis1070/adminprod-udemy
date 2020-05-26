import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  datausuario: Usuario;
  constructor(public serus: UsuarioService) { }

  ngOnInit() {
    this.datausuario = this.serus.usuario;
  }

}
