import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { LOCALSTORESTR } from '../Constantes';
let AuthGuard = class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        return this.authService.isLoggedIn.pipe(take(1), map((isLoggedIn) => {
            const usr = localStorage.getItem(LOCALSTORESTR.LS_USER);
            if (usr === undefined || usr === null) {
                if (!isLoggedIn) {
                    this.router.navigate(['/login']);
                    return false;
                }
            }
            if (route.data && route.data.permission) {
                /*if (!this.authService.validarPermiso(route.data['permission'])) {
                  this.authService.mostrarMensaje('No tiene permiso para navegar esta pagina', 'ERROR');
                  this.router.navigate(['/dashboard']);
                  return false;
                }*/
            }
            // paginas sin header
            if (route.url[0] && route.url[0].path !== 'selectorempresa') {
                this.authService.logged(true);
            }
            return true;
        }));
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable()
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map