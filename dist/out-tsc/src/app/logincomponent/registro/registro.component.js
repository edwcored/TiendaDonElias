import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { RESULTS, MENSAJES } from 'src/app/Constantes';
let RegistroComponent = class RegistroComponent {
    constructor(fb, router, authService, loginservice) {
        this.fb = fb;
        this.router = router;
        this.authService = authService;
        this.loginservice = loginservice;
    }
    ngOnInit() {
        this.form = this.fb.group({
            user: ['', [Validators.required, Validators.email]],
            nombre: ['', Validators.required],
            direccion: ['', Validators.required],
            telefono: ['', Validators.required],
            password: ['', Validators.required],
            password2: ['', Validators.required]
        });
    }
    isFieldInvalid(field) {
        return ((!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt));
    }
    onSubmit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.form.valid) {
                try {
                    if (this.form.valid) {
                        const res = yield this.loginservice.CreateUser(this.form.value);
                        if (res) {
                            if (res.resultCode === RESULTS.OK) {
                                this.form.value.usuario = this.form.value.user;
                                this.form.value.currentPassword = this.form.value.password;
                                this.authService.usuario = this.form.value;
                                this.authService.loggedIn.next(true);
                                this.router.navigate(['/home']);
                            }
                            else if (res.resultCode === RESULTS.REPITED) {
                                this.authService.mostrarMensaje('Ya existe un usuario con este correo', MENSAJES.ERROR);
                            }
                            else {
                                this.authService.mostrarMensaje('Respuesta invalida del servidor', MENSAJES.ERROR);
                            }
                        }
                    }
                }
                catch (e) {
                    this.authService.mostrarMensaje('Respuesta invalida del servidor', MENSAJES.ERROR);
                }
            }
            this.formSubmitAttempt = true;
        });
    }
};
RegistroComponent = tslib_1.__decorate([
    Component({
        selector: 'app-registro',
        templateUrl: './registro.component.html',
        styleUrls: ['./registro.component.scss']
    })
], RegistroComponent);
export { RegistroComponent };
//# sourceMappingURL=registro.component.js.map