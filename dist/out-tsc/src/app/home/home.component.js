import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HomeComponent = class HomeComponent {
    constructor(appService) {
        this.appService = appService;
        this.Categorias = [];
        this.filtro = {
            index: 0,
            tamano: 20
        };
        this.hayMasDatos = true;
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.Categorias = yield this.appService.getCategorias();
            this.linesToWrite = new Array();
        });
    }
    onScroll() {
        if (this.hayMasDatos) {
            this.Cargar20();
            this.filtro.index++;
        }
    }
    Cargar20() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productos = yield this.appService.getProducts(this.filtro);
            if (productos) {
                if (productos.length > 20) {
                    productos.forEach(element => {
                        this.linesToWrite.push(element);
                    });
                }
                else {
                    this.hayMasDatos = false;
                }
            }
        });
    }
};
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map