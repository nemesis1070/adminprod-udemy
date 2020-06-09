import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService , SharedService, SiderbarService, LoginGuardGuard, AdminGuard,VerificaTokenGuard  } from './services.index';
import { UsuarioService } from './services.index';
import { HttpClientModule} from '@angular/common/http';
import { ModalUploadService } from '../components/modalupload/modal-upload.service';
import { HospitalService } from './services.index';
import { MedicoService } from './services.index';


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
    HospitalService,
    LoginGuardGuard,
    ModalUploadService,
    MedicoService,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
