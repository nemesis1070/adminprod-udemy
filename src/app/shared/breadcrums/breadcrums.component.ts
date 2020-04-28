import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  tituloPag: string ;

  constructor(private router: Router, private title: Title, private metaTag: Meta) {

    this.getDataRoute()
    .subscribe(data => {
      this.tituloPag = data.titulo;
      this.title.setTitle(this.tituloPag); /// con esto coloca un titulo en la ventana del explorador con el nomnre de la pagina

      const metaTags: MetaDefinition = {
        name: 'description',
        content: this.tituloPag
      };

      this.metaTag.updateTag(metaTags);  /// agrega unos tag con la informacion en el html de la pagina

    });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.          /// obtiene como respueta del observable todos los eventos que manaje en router
    pipe(
      filter(evento => evento instanceof ActivationEnd),   /// solo retornara informacion si el evento es de tipo ActivationEnd
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null), /// solo retornara informacion si la propiedad es null
      map((evento: ActivationEnd) => evento.snapshot.data)  /// obtiene el objeto con la informacion que requiere
    );
  }

}
