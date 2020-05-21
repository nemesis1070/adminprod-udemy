import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService , SharedService, SiderbarService, LoginGuardGuard  } from './services.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SiderbarService,
    UsuarioService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
