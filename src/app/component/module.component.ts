import { NgModule } from '@angular/core';
import { MainMenuComponent } from "../component/main-menu/main-menu.component";
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroDeReservaComponent } from './registro-de-reserva/registro-de-reserva.component';
import { RegistroDeHuespedComponent } from './registro-de-huesped/registro-de-huesped.component';
import { SistemaDeBusquedaComponent } from './sistema-de-busqueda/sistema-de-busqueda.component';
import { ListaDeHuespedesComponent } from './lista-de-huespedes/lista-de-huespedes.component';
import { ListaDeReservasComponent } from './lista-de-reservas/lista-de-reservas.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    LoginComponent,
    UserMenuComponent,
    RegistroDeReservaComponent,
    RegistroDeHuespedComponent,
    SistemaDeBusquedaComponent,
    ListaDeHuespedesComponent,
    ListaDeReservasComponent
  ],
  imports:[
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MainMenuComponent,
    LoginComponent,
    UserMenuComponent,
    RegistroDeReservaComponent,
    RegistroDeHuespedComponent,
    SistemaDeBusquedaComponent,
    ListaDeHuespedesComponent,
    ListaDeReservasComponent
  ]
})
export class ComponentModule { }
