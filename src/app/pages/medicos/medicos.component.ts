import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public sermed: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this.sermed.buscarMedicos()
               .subscribe((resp: any) => {
                 console.log(resp);
                 this.totalRegistros = resp.total;
                 this.medicos = resp.medicos;
                 this.cargando = false;
               });
  }


  buscarMedico( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this.sermed.busquedaMedicos( termino )
                .subscribe((resp: any) => {
                  console.log(resp);
                  this.medicos = null;
                  this.medicos = resp.medicos;
                  this.cargando = false;
                });

  }

  borrarMedico(medico: Medico) {

    swal({
      title: '¿ Esta Seguro?.',
      text: 'Quiere borrar el Medico: ' + medico.Nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.sermed.borrarMedico(medico.IdMedicos)
                   .subscribe(borrado => {
                    console.log(borrado);
                    this.cargarMedicos();
                   });
      }
    });

  }

}
