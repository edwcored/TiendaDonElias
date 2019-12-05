import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { URLSPRODUCTOS, DOMINIOVALOR } from './Constantes';
let AppService = class AppService {
    constructor(http) {
        this.http = http;
    }
    getProducts(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.http.post(URLSPRODUCTOS.GETN, params).toPromise();
        });
    }
    getProduct(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.http.post(URLSPRODUCTOS.GET, params).toPromise();
        });
    }
    getCategorias() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.http.get(DOMINIOVALOR.CATEGORIAS).toPromise();
        });
    }
};
AppService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map