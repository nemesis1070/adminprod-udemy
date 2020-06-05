import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(public activatedRou: ActivatedRoute, public http: HttpClient) {
    activatedRou.params
                .subscribe(params => {
                  const term = params.termino;
                  this.buscar(term);
                });
  }

  ngOnInit() {
  }

  buscar(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get(url).subscribe((resp: any) => {
        this.usuarios = resp.usuario;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
    });
  }
}
