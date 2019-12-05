import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { count } from 'rxjs/operators';

// observable para detectar cambios en el http
@Injectable()
export class BusyService {
  private count = 0;
  private requestInFlight$: BehaviorSubject<number>;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(0);
  }

  ChangeBusy(tick: number) {
    this.count = this.count + tick;
    if (this.count < 0 ) {
      this.count = 0;
    }
    this.requestInFlight$.next(this.count);
  }

  getBusyCount(): Observable<number> {
    return this.requestInFlight$.asObservable();
  }
}

