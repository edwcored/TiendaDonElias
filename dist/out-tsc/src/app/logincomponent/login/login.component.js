import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MENSAJES, RESULTS } from 'src/app/Constantes';
let LoginComponent = class LoginComponent {
    constructor(fb, router, authService, loginservice) {
        this.fb = fb;
        this.router = router;
        this.authService = authService;
        this.loginservice = loginservice;
    }
    ngOnInit() {
        this.form = this.fb.group({
            user: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    isFieldInvalid(field) {
        return ((this.form && this.form.get(field) && !this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt));
    }
    onSubmit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.authService.logout();
            if (this.form.valid) {
                try {
                    if (this.form.value.user !== '' && this.form.value.password !== '') {
                        const res = yield this.loginservice.GetUser(this.form.value);
                        if (res) {
                            if (res.resultCode === RESULTS.OK) {
                                res.data.usuario = this.form.value.user;
                                res.data.currentPassword = this.form.value.password;
                                this.authService.usuario = res.data;
                                this.authService.loggedIn.next(true);
                                this.router.navigate(['/pedido']);
                            }
                            else if (res.resultCode === RESULTS.PASSWORDINVALID) {
                                this.authService.mostrarMensaje('Constraseña invalida', MENSAJES.ERROR);
                            }
                            else if (res.resultCode === RESULTS.USERINVALID) {
                                this.authService.mostrarMensaje('El usuario no existe', MENSAJES.ERROR);
                            }
                            else if (res.resultCode === RESULTS.CHANGEPASSWORD) {
                                res.data.nuevo = true;
                                res.data.usuario = this.form.value.user;
                                this.authService.usuario = res.data;
                                this.authService.mostrarMensaje('Debe cambiar su clave', MENSAJES.ERROR);
                                this.router.navigate(['/setearclave']);
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
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['../login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map