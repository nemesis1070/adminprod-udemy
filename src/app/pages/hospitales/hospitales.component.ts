import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modalupload/modal-upload.service';
import { SubirArchivoService } from 'src/app/services/services.index';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public serhos: HospitalService, public modalup: ModalUploadService, public serSub: SubirArchivoService) { }

  ngOnInit() {
    this.cargarHospitales();
       // tslint:disable-next-line: max-line-length
    /// se suscribe cuando hace cualquier emision el evento del servicio que se encarga de subir el archivo a la DB y retorna la respuesta del proceso
    this.modalup.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this.serhos.buscarHospitales()
               .subscribe((resp: any) => {
                 console.log(resp);
                 this.totalRegistros = resp.total;
                 this.hospitales = resp.hospitales;
                 this.cargando = false;
               });
  }

  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this.serhos.busquedaHospitales( termino )
                .subscribe((resp: any) => {
                  console.log(resp);
                  this.hospitales = null;
                  this.hospitales = resp.hospitales;
                  this.cargando = false;
                });

  }

  borrarHospital(hospital: Hospital) {
    console.log(hospital);

    swal({
      title: '¿ Esta Seguro?.',
      text: 'Quiere borrar el Hospital: ' + hospital.Nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.serhos.borrarHospital(hospital.IdHospital)
                   .subscribe(borrado => {
                    console.log(borrado);
                    this.cargarHospitales();
                   });
      }
    });
  }

  guardarHospital(hospital: Hospital) {

    this.serhos.actualizarHospital(hospital)
              .subscribe();

  }

  mostrarModal(id: number) {
    this.modalup.mostrarModal('hospital', id.toString());
  }

  crearHospital() {
    swal({
      text: 'Escriba Nombre Hospital',
      content: 'input',
    })
    .then((nombreHosp) => {
      if (!nombreHosp || nombreHosp.length === 0) {
       return ;
      }
      const nuevoHosp = new Hospital(nombreHosp, null);
      this.serhos.crearHospital(nuevoHosp)
                 .subscribe(res => {
                  this.cargarHospitales();
                 });
    });
  }
}
