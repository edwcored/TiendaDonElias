import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { URLPERSONA } from '../Constantes';
let LoginService = class LoginService {
    constructor(http) {
        this.http = http;
    }
    GetUser(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.http.post(URLPERSONA.VALIDARUSUARIOURL, params).toPromise();
        });
    }
    SolicitarCambioClave(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.http.post(URLPERSONA.SOLICITARCAMBIOCLAVE, data).toPromise();
        });
    }
    RealizarCambioClave(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.http.post(URLPERSONA.REALIZARCAMBIOCLAVE, data).toPromise();
        });
    }
    RealizarCambioClaveLocal(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.http.post(URLPERSONA.REALIZARCAMBIOCLAVELOCAL, data).toPromise();
        });
    }
    CreateUser(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.http.post(URLPERSONA.CREARUSUARIO, data).toPromise();
        });
    }
};
LoginService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map