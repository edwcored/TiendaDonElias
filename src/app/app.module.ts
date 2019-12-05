import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { RegistroComponent } from './logincomponent/registro/registro.component';
import { ProductoComponent } from './producto/producto.component';
import { CompraComponent } from './compra/compra.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './MyHttpInterceptor';
import { AuthService } from './auth/auth.service';
import { BusyService } from './busy.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoginComponent } from './logincomponent/login/login.component';
import { CambarClaveSolicitudComponent } from './logincomponent/cambar-clave-solicitud/cambar-clave-solicitud.component';
import { CambarClaveAccionComponent } from './logincomponent/cambar-clave-accion/cambar-clave-accion.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CambarClaveSolicitudComponent,
    CambarClaveAccionComponent,
    RegistroComponent,
    ProductoComponent,
    CompraComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    FlexLayoutModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
    AppService,
    AuthService,
    BusyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
