import {RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          {path: 'dashboard', component: DashboardComponent , data: {titulo: 'Dashboard'}},
          {path: 'progress', component: ProgressComponent , data: {titulo: 'Progress'}},
          {path: 'grafica1', component: Graficas1Component , data: {titulo: 'Graficas'} },
          {path: 'promesas', component: PromesasComponent , data: {titulo: 'Promesas'}},
          {path: 'rxjs', component: RxjsComponent , data: {titulo: 'RxJs'}} ,
          {path: 'accountSettings', component: AccountSettingsComponent , data: {titulo: 'Ajustes del Tema'}},
          {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
}
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
