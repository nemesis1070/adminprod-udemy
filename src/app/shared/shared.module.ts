import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NopagefoundComponent } from '../pages/dashboard/nopagefound/nopagefound.component';
import { RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent,
    NopagefoundComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent,
    NopagefoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
