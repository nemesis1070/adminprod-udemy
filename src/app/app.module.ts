import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { APP_ROUTES } from './app.routes';
import { RegisterComponent } from './login/register.component';
import { PageModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from './services/service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageModule,
    APP_ROUTES,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
