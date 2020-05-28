import { Component, OnInit } from '@angular/core';
import { SiderbarService } from '../../services/services.index';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  dataUsuario: Usuario;
  constructor(public sidebar: SiderbarService, public serus: UsuarioService) { }

  ngOnInit() {
    this.dataUsuario = this.serus.usuario;
  }

}
