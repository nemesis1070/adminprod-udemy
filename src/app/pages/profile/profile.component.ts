import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: string;

  constructor(public serusu: UsuarioService) {
    this.usuario = this.serusu.usuario;
   }

  ngOnInit() {
  }

  /* seleccionImagen(event) { */  // event obtiene toda la informacion del evento al cargar la imagen
  seleccionImagen(archivo: File) {
    if (! archivo) {
      this.imagenSubir = null;
      return;
    }

    /// verficar si el archivo es una imagen
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen' , 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    // lectura del archivo por medio de javascript nativo
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result as string;
  }

  cambiarImagen() {
    this.serusu.cambiarImagen(this.imagenSubir, this.usuario.IdUsuario.toString());
  }

  guardar(datausuario: Usuario) {
  this.usuario.Nombre = datausuario.Nombre;
  this.usuario.Email = '';

  if (this.usuario.Google) {
   datausuario.Email = this.usuario.Email;
  }

  datausuario.Role = this.usuario.Role;
  datausuario.IdUsuario = this.usuario.IdUsuario;
  datausuario.Img = this.usuario.Img;
  datausuario.Password = this.usuario.Password;
  datausuario.Google = this.usuario.Google;

  this.serusu.actualizarUsuario(datausuario)
              .subscribe();
   }
}
