import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { LoginComponent } from './component/login/login.component';
import { UserMenuComponent } from './component/user-menu/user-menu.component';
import { RegistroDeReservaComponent } from './component/registro-de-reserva/registro-de-reserva.component';
import { RegistroDeHuespedComponent } from './component/registro-de-huesped/registro-de-huesped.component';
import { SistemaDeBusquedaComponent } from './component/sistema-de-busqueda/sistema-de-busqueda.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/MenuPrincipal',
    pathMatch: 'full'
  },
  {
    path: 'MenuPrincipal',
    component: MainMenuComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'menu-de-usuario',
    component: UserMenuComponent
  },
  {
    path: 'registro-de-reserva',
    component: RegistroDeReservaComponent
  },
  {
    path: 'registro-de-huesped',
    component: RegistroDeHuespedComponent
  },
  {
    path: 'sistema-de-busqueda',
    component: SistemaDeBusquedaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
