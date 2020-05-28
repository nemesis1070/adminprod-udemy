import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService , SharedService, SiderbarService, LoginGuardGuard  } from './services.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule} from '@angular/common/http';
import { ModalUploadService } from '../components/modalupload/modal-upload.service';


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
    LoginGuardGuard,
    ModalUploadService
  ]
})
export class ServiceModule { }
