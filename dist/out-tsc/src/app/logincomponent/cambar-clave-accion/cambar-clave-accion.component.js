import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { RESULTS, MENSAJES } from 'src/app/Constantes';
// tslint:disable:triple-equals
let CambarClaveAccionComponent = class CambarClaveAccionComponent {
    constructor(fb, service, autservice, router) {
        this.fb = fb;
        this.service = service;
        this.autservice = autservice;
        this.router = router;
        this.usuarioNuevo = false;
    }
    ngOnInit() {
        this.form = this.fb.group({
            elcodigo: [''],
            password: ['', Validators.required],
            password2: ['', Validators.required]
        });
        //se valida si es cambio por clave nueva o por solicitud
        if (this.autservice.usuario.nuevo) {
            this.usuarioNuevo = true;
        }
        else {
            this.usuarioNuevo = false;
            const elcod = this.form.get('elcodigo');
            elcod.setValidators([Validators.required]);
            // elcod.updateValueAndValidity();
        }
    }
    isFieldInvalid(field) {
        return ((!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt));
    }
    onSubmit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.form.valid) {
                if (this.form.value.password !== this.form.value.password2) {
                    this.autservice.mostrarMensaje('Las contraseñas no coinciden', MENSAJES.ERROR);
                    this.form.value.password = this.form.value.password2 = '';
                }
                else if (this.form.value.password.len <= 6) {
                    this.autservice.mostrarMensaje('La contraseña debe tener minimo 6 caracteres', MENSAJES.ERROR);
                    this.form.value.password = this.form.value.password2 = '';
                }
                else {
                    const data = {
                        user: this.autservice.usuario.usuario,
                        newPassword: this.form.value.password,
                        vendedor: this.autservice.usuario.vendedor,
                        codigo: this.form.value.elcodigo
                    };
                    const ret = yield this.service.RealizarCambioClave(data);
                    if (ret) {
                        if (ret.resultCode == RESULTS.OK) {
                            this.autservice.mostrarMensaje('Se cambio la clave correctamente', MENSAJES.SUSSES);
                            this.router.navigate(['/login']);
                        }
                        else if (ret.resultCode == RESULTS.USERINVALID) {
                            this.autservice.mostrarMensaje('Usuario invalido', MENSAJES.ERROR);
                        }
                        else if (ret.resultCode == RESULTS.INVALIDCODE) {
                            this.autservice.mostrarMensaje('El codigo no coincide, comience el proceso de nuevo', MENSAJES.ERROR);
                        }
                        else {
                            this.autservice.mostrarMensaje('Respuesta invalida del servidor', MENSAJES.ERROR);
                        }
                    }
                }
            }
            this.formSubmitAttempt = true;
        });
    }
};
CambarClaveAccionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-cambar-clave-accion',
        templateUrl: './cambar-clave-accion.component.html',
        styleUrls: ['../login.component.scss']
    })
], CambarClaveAccionComponent);
export { CambarClaveAccionComponent };
//# sourceMappingURL=cambar-clave-accion.component.js.map