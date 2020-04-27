import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private documents: Document, private ss: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(color: string, link: any) {
    this.aplicarClaseCheck(link);
    this.ss.aplicarTema(color);
  }

  aplicarClaseCheck(link: any) {

    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {

    const tema = this.ss.ajustes.tema;
    /// este atributo esta en el html de este componente
    const selectores: any = document.getElementsByClassName('selector');
    for (const ref of selectores) {

      /// este atributo esta en el html de este componente
      if ( ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
      }
    }
  }

}
