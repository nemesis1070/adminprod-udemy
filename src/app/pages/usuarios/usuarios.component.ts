import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
// import swal from 'sweetalert';
import { ModalUploadService } from 'src/app/components/modalupload/modal-upload.service';

declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public serusu: UsuarioService , public modalup: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    // tslint:disable-next-line: max-line-length
    /// se suscribe cuando hace cualquier emision el evento del servicio que se encarga de subir el archivo a la DB y retorna la respuesta del proceso
    this.modalup.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.serusu.buscarUsuarios(this.desde)
               .subscribe((resp: any) => {
                 console.log(resp);
                 this.totalRegistros = resp.total;
                 this.usuario = resp.usuarios;
                 this.cargando = false;
               });
  }

  cambiarDesde(valor: number) {

    const desdeEnv = this.desde + valor;

    if (desdeEnv >= this.totalRegistros) {
      return;
    }

    if (desdeEnv < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.serusu.busquedaUsuarios( termino )
                .subscribe((resp: any) => {
                  console.log(resp);
                  this.usuario = null;
                  this.usuario = resp.usuarios;
                  this.cargando = false;
                });

  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);

    if (usuario.IdUsuario === this.serusu.usuario.IdUsuario) {
      swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
    }

    swal({
      title: '¿ Esta Seguro?.',
      text: 'Quiere borrar el usuario: ' + usuario.Nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.serusu.borrarUsuario(usuario.IdUsuario)
                   .subscribe(borrado => {
                    console.log(borrado);
                    this.cargarUsuarios();
                   });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.serusu.actualizarUsuario(usuario)
              .subscribe();

  }

  mostrarModal(id: number) {
    this.modalup.mostrarModal('usuario', id.toString());
  }

}
