import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { URLPERSONA, RESULTS, MENSAJES, REALIZARCAMBIOCLAVELOCAL } from './Constantes';
import { map, finalize } from 'rxjs/operators';
// tslint:disable: max-line-length
let MyHttpInterceptor = class MyHttpInterceptor {
    constructor(authService, busyService) {
        this.authService = authService;
        this.busyService = busyService;
        this.urlsConToken = [
            URLPERSONA.VALIDARUSUARIOURL,
            URLPERSONA.SOLICITARCAMBIOCLAVE,
            REALIZARCAMBIOCLAVELOCAL,
            URLPERSONA.GETTOKEN
        ];
    }
    intercept(httpReq, next) {
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
            .pipe(map(event => {
            if (event instanceof HttpResponse) {
                if (event.status === 200) {
                    if (event.body.result === false) {
                        if (event.body.resultCode === RESULTS.JSONINVALID) {
                            this.authService.mostrarMensaje('El json de la solicitud es invalido, contacte el departamento de sistemas', MENSAJES.ERROR);
                            this.authService.logout();
                        }
                        else if (event.body.resultCode === RESULTS.ERROR) {
                            this.authService.mostrarMensaje('Error en el servidor:\n' + event.body.message, MENSAJES.ERROR);
                        }
                        else if (event.body.resultCode === RESULTS.TOKENINVALID) {
                            this.authService.mostrarMensaje('Su sesion es invalida, inicie sesion de nuevo', MENSAJES.ERROR);
                            this.authService.logout();
                        }
                        else if (event.body.resultCode === RESULTS.TOKENEXPIRED) {
                            this.authService.mostrarMensaje('Su sesion ha expirado, inicie sesion de nuevo', MENSAJES.ERROR);
                            this.authService.logout();
                        }
                        else if (event.body.resultCode === RESULTS.NOTOKEN) {
                            this.authService.mostrarMensaje('Debe iniciar sesion primero', MENSAJES.ERROR);
                            this.authService.logout();
                        }
                        else if (event.body.resultCode === RESULTS.SESIONANOTHER) {
                            this.authService.mostrarMensaje('Se inicio sesion antes en otro equipo', MENSAJES.ERROR);
                            this.authService.logout();
                        }
                        else if (event.body.resultCode === RESULTS.INVALIDIP) {
                            this.authService.mostrarMensaje('Este equipo no es valido para la sesion', MENSAJES.ERROR);
                            this.authService.logout();
                        }
                        return null;
                    }
                }
                else {
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
        }), finalize(() => {
            this.busyService.ChangeBusy(-1);
        }));
    }
};
MyHttpInterceptor = tslib_1.__decorate([
    Injectable()
], MyHttpInterceptor);
export { MyHttpInterceptor };
//# sourceMappingURL=MyHttpInterceptor.js.map