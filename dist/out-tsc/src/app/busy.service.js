import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// observable para detectar cambios en el http
let BusyService = class BusyService {
    constructor() {
        this.count = 0;
        this.requestInFlight$ = new BehaviorSubject(0);
    }
    ChangeBusy(tick) {
        this.count = this.count + tick;
        if (this.count < 0) {
            this.count = 0;
        }
        this.requestInFlight$.next(this.count);
    }
    getBusyCount() {
        return this.requestInFlight$.asObservable();
    }
};
BusyService = tslib_1.__decorate([
    Injectable()
], BusyService);
export { BusyService };
//# sourceMappingURL=busy.service.js.map