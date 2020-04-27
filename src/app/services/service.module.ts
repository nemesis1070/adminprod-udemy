import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService , SharedService, SiderbarService  } from './services.index';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SiderbarService
  ]
})
export class ServiceModule { }
