import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LOCALSTORESTR } from '../Constantes';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        const usr = localStorage.getItem(LOCALSTORESTR.LS_USER);
        if (usr === undefined || usr === null) {
          if (!isLoggedIn) {
            this.router.navigate(['/']);
            return false;
          }
        }
        return true;
      })
    );
  }
}
