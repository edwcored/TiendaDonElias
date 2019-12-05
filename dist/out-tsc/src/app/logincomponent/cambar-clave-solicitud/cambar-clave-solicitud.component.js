import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MENSAJES, RESULTS } from 'src/app/Constantes';
let CambarClaveSolicitudComponent = class CambarClaveSolicitudComponent {
    constructor(fb, service, router, autservice) {
        this.fb = fb;
        this.service = service;
        this.router = router;
        this.autservice = autservice;
        this.primerIntento = false;
    }
    ngOnInit() {
        this.strboton = 'CAMBIAR CONTRASEÑA';
        this.ccform = this.fb.group({
            user: ['', Validators.required],
            vendedor: [true]
        });
    }
    isFieldInvalid(field) {
        return ((!this.ccform.get(field).valid && this.ccform.get(field).touched) ||
            (this.ccform.get(field).untouched && this.formSubmitAttempt));
    }
    onSubmit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (this.ccform.valid) {
                    const ret = yield this.service.SolicitarCambioClave(this.ccform.value);
                    if (ret) {
                        if (ret.resultCode === RESULTS.OK) {
                            let usuario = {};
                            usuario.usuario = this.ccform.value.user;
                            usuario.vendedor = this.ccform.value.vendedor;
                            this.autservice.usuario = usuario;
                            this.router.navigate(['/setearclave']);
                        }
                        else if (ret.resultCode === RESULTS.USERINVALID) {
                            this.autservice.mostrarMensaje('no se encontro el usuario, intentelo de nuevo', MENSAJES.ERROR);
                        }
                        else if (ret.resultCode === RESULTS.NOEMAIL) {
                            this.autservice.mostrarMensaje('El usuario no tiene un correo, comuniquese con la linea de atencion al cliente', MENSAJES.ERROR);
                        }
                    }
                    this.formSubmitAttempt = true;
                }
            }
            catch (ex) {
                this.autservice.mostrarMensaje('no se pudo comunicar con el servidor, intentelo de nuevo', MENSAJES.ERROR);
                console.error(ex);
            }
        });
    }
};
CambarClaveSolicitudComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cambar-clave-solicitud',
        templateUrl: './cambar-clave-solicitud.component.html',
        styleUrls: ['../login.component.scss']
    })
], CambarClaveSolicitudComponent);
export { CambarClaveSolicitudComponent };
//# sourceMappingURL=cambar-clave-solicitud.component.js.map