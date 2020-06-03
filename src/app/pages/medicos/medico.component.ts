import { Component, OnInit, EventEmitter } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modalupload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medico: Medico = new Medico('', '', '', '', '', 0);
  hospital: Hospital = new Hospital('');
  hospitales: Hospital[] = [];
  constructor(public sermed: MedicoService, public serhos: HospitalService, public router: Router,
              public activatedRot: ActivatedRoute, public modalup: ModalUploadService ) {

                activatedRot.params.subscribe(params => {
                  // tslint:disable-next-line: no-string-literal
                  const id = params['id'];  // el nombre del parametrose definio en el pagesRoutes.ts asi: path: 'medico/:id'
                  if (id !== 'nuevo') {
                    this.cargarMedico(id);
                  }

                });
               }

  ngOnInit() {

    this.serhos.buscarHospitales().subscribe((res: any) => {
        this.hospitales = res.hospitales;
    });

        // tslint:disable-next-line: max-line-length
    /// se suscribe cuando hace cualquier emision el evento del servicio que se encarga de subir el archivo a la DB y retorna la respuesta del proceso
    this.modalup.notificacion.subscribe(resp => {
      this.medico.Img = resp.mensaje;
      // this.cargarMedico(this.medico.IdMedicos.toString());
    });
  }

  guardarMedico( f: NgForm) {

  if (f.invalid) {
    return;
  }
  this.medico.Nombre = f.value.Nombre;
  this.medico.HospitalId = f.value.HospitalId;

  this.sermed.guardarMedico(this.medico).subscribe((res: any) => {
    console.log(res);
    if (res == null) {
      this.router.navigate(['/medico', this.medico.IdMedicos]);
    } else {
      this.medico.IdMedicos = res.medico[0].IdMedicos;
      this.router.navigate(['/medico', res.medico[0].IdMedicos]);
    }
  });

  }

  cambioHospital(event) {

    const idHos: string = event.target.value;
    this.serhos.buscarHospitalPorId(idHos)
               .subscribe((resp: any) => {
                  this.hospital = resp.hospital[0];
               });
  }

  cargarMedico(id: string) {
    this.sermed.cargarMedico(id)
               .subscribe((resp: any) => {
                  this.medico = resp.medico[0];
                  this.medico.HospitalId = resp.medico[0].Hospital;
                  console.log(this.medico);
               });
  }

  cambiarFoto() {
    this.modalup.mostrarModal('medico', this.medico.IdMedicos.toString());
  }
}
