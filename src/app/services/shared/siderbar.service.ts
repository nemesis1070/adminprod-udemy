import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiderbarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/progress'},
        {titulo: 'Graficas', url: '/grafica1'},
        {titulo: 'Promesas', url: '/promesas'},
        {titulo: 'RXJS', url: '/rxjs'}
      ]
    }
  ];

  constructor() { }
}
