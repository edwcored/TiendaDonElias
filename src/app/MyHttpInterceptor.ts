import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { URLPERSONA, RESULTS, MENSAJES, REALIZARCAMBIOCLAVELOCAL, URLCOMPRAS, URLCESTA } from './Constantes';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { BusyService } from './busy.service';

// tslint:disable: max-line-length


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  private urlsConToken = [
    URLPERSONA.VALIDARUSUARIOURL,
    REALIZARCAMBIOCLAVELOCAL,
    URLCOMPRAS.GET,
    URLCESTA.FINISH
  ];

  constructor(
    private authService: AuthService,
    private busyService: BusyService
  ) { }


  intercept(httpReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const nob = httpReq.headers.get('noBusy');
    if (nob && nob !== 'true') {
      this.busyService.ChangeBusy(1);
    }

    let conToken = false;
    this.urlsConToken.forEach(element => {
      if (httpReq.url.includes(element)) {
        conToken = true;
      }
    });

    if (conToken) {
      if (this.authService.usuario && this.authService.usuario.token) {
        httpReq = httpReq.clone({ headers: httpReq.headers.set('token', this.authService.usuario.token) });
      }
    }

    httpReq = httpReq.clone({ headers: httpReq.headers.set('Access-Control-Allow-Origin', '*') });

    let headers = httpReq.headers.set('Content-Type', 'application/json');

    if (headers.get('noToken') === 'noToken') {
      headers = headers.delete('Authorization').delete('noToken');
    }

    // const newReq = httpReq.clone({ headers: headers });
    const newReq = httpReq.clone({ headers });

    return next.handle(newReq)
      .pipe(
        map(
          event => {
            if (event instanceof HttpResponse) {
              if (event.status === 200) {
                if (event.body.result === false) {
                  if (event.body.resultCode === RESULTS.JSONINVALID) {
                    this.authService.mostrarMensaje('El json de la solicitud es invalido, contacte el departamento de sistemas', MENSAJES.ERROR);
                    this.authService.logout();
                  } else if (event.body.resultCode === RESULTS.ERROR) {
                    this.authService.mostrarMensaje('Error en el servidor:\n' + event.body.message, MENSAJES.ERROR);
                  } else if (event.body.resultCode === RESULTS.TOKENINVALID) {
                    this.authService.mostrarMensaje('Su sesion es invalida, inicie sesion de nuevo', MENSAJES.ERROR);
                    this.authService.logout();
                  } else if (event.body.resultCode === RESULTS.TOKENEXPIRED) {
                    this.authService.mostrarMensaje('Su sesion ha expirado, inicie sesion de nuevo', MENSAJES.ERROR);
                    this.authService.logout();
                  } else if (event.body.resultCode === RESULTS.NOTOKEN) {
                    this.authService.mostrarMensaje('Debe iniciar sesion primero', MENSAJES.ERROR);
                    this.authService.logout();
                  } else if (event.body.resultCode === RESULTS.SESIONANOTHER) {
                    this.authService.mostrarMensaje('Se inicio sesion antes en otro equipo', MENSAJES.ERROR);
                    this.authService.logout();
                  } else if (event.body.resultCode === RESULTS.INVALIDIP) {
                    this.authService.mostrarMensaje('Este equipo no es valido para la sesion', MENSAJES.ERROR);
                    this.authService.logout();
                  }
                  return null;
                }
              } else {
                this.authService.mostrarMensaje('no sussess', MENSAJES.ERROR);
                return null;
              }
            }
            return event;
          },
          // Operation failed; error is an HttpErrorResponse
          error => {
            if (error.status === 401) {
              this.authService.logout();
              location.reload();
            }
          }
        ),
        finalize(() => {
          this.busyService.ChangeBusy(-1);
        })
      );
  }
}
