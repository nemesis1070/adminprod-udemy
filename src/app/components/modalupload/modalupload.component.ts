import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modalupload',
  templateUrl: './modalupload.component.html',
  styles: []
})
export class ModaluploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemporal: string;


  constructor(public cargaImagen: SubirArchivoService, public modalUploadSer: ModalUploadService) {}

  ngOnInit() {
  }

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

  subirImagen() {
    this.cargaImagen.subirArchivo(this.imagenSubir, this.modalUploadSer.tipo, this.modalUploadSer.id)
                    .then(resp => {
                      // emitir un mensaje a todo el mundo que esta escuchando o pendiente que se subio la imagen
                      this.modalUploadSer.notificacion.emit(resp);
                      this.cerrarModal();
                    })
                    .catch(err => {
                      console.log('Error en la carga....');
                    });
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemporal = null;
    this.modalUploadSer.ocultarModal();
  }

}
