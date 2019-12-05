import * as tslib_1 from "tslib";
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MENSAJES } from '../Constantes';
import { LOCALSTORESTR } from '../Constantes';
import { URLPERSONA } from '../Constantes';
let AuthService = class AuthService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.loggedIn = new BehaviorSubject(false);
    }
    get usuario() {
        if (!this.Usuario) {
            const usr = localStorage.getItem(LOCALSTORESTR.LS_USER);
            if (usr !== null) {
                this.Usuario = JSON.parse(usr);
                // this.loggedIn.next(true);
            }
        }
        return this.Usuario;
    }
    set usuario(val) {
        this.Usuario = val;
        localStorage.setItem(LOCALSTORESTR.LS_USER, JSON.stringify(this.Usuario));
    }
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    logged(state) {
        this.loggedIn.next(state);
    }
    logout() {
        localStorage.clear();
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }
    validarPermiso(codigos) {
        return true;
    }
    mostrarMensaje(mensaje, tipo) {
        if (tipo === MENSAJES.ERROR) {
            console.error(mensaje);
        }
        else if (tipo === MENSAJES.SUSSES) {
            console.log(mensaje);
        }
        else {
            console.warn(mensaje);
        }
    }
    getToken() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = {
                nui: this.usuario.nui,
                nuiemp: this.usuario.emp.nui,
                rol: this.usuario.emp.rol,
                pwd: this.usuario.currentPassword
            };
            return yield this.http.post(URLPERSONA.GETTOKEN, data).toPromise();
        });
    }
};
tslib_1.__decorate([
    Input('usuario')
], AuthService.prototype, "usuario", null);
AuthService = tslib_1.__decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map