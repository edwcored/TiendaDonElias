import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './logincomponent/registro/registro.component';
import { ProductoComponent } from './producto/producto.component';
import { CompraComponent } from './compra/compra.component';
import { AuthGuard } from './auth/auth.guard';
import { CambarClaveAccionComponent } from './logincomponent/cambar-clave-accion/cambar-clave-accion.component';
import { CambarClaveSolicitudComponent } from './logincomponent/cambar-clave-solicitud/cambar-clave-solicitud.component';
import { LoginComponent } from './logincomponent/login/login.component';
const routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'cambiarclave', component: CambarClaveSolicitudComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'crearcuenta', component: RegistroComponent },
    { path: 'setearclave', component: CambarClaveAccionComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'producto', component: ProductoComponent, canActivate: [AuthGuard] },
    { path: 'compra', component: CompraComponent, canActivate: [AuthGuard] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map