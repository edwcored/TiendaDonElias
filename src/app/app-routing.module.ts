import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './logincomponent/registro/registro.component';
import { ProductoComponent } from './producto/producto.component';
import { AuthGuard } from './auth/auth.guard';
import { CambarClaveAccionComponent } from './logincomponent/cambar-clave-accion/cambar-clave-accion.component';
import { CambarClaveSolicitudComponent } from './logincomponent/cambar-clave-solicitud/cambar-clave-solicitud.component';
import { LoginComponent } from './logincomponent/login/login.component';
import { CestaComponent } from './cesta/cesta.component';
import { ComprasComponent } from './compras/compras.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cambiarclave', component: CambarClaveSolicitudComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'crearcuenta', component: RegistroComponent },
  { path: 'setearclave', component: CambarClaveAccionComponent, canActivate: [AuthGuard] },

  { path: 'home', component: HomeComponent },
  // { path: 'productos', component: ProductoComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CestaComponent },
  { path: 'productos', component: ProductoComponent },
  { path: 'compras', component: ComprasComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
