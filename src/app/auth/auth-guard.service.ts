import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError, map} from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, public router: Router, private token: TokenStorage) {}

  canActivate(): Observable<boolean> {
    const tokenVal = this.token.getToken();
    const user = (<any>window).user;

    // User already authenticated
    if (user) {
      return of(true);
    }

    // No token, redirect to login page
    if (!tokenVal) {
      this.router.navigate(['/auth/login']);
      return of(false);
    }

    // Attempt to retrieve user profile based on the existing token
    return this.authService.me().pipe(
      map(user => {
        // User found
        if (user) {
          return true;
        }
        // User not found, redirect to login page
        this.router.navigate(['/auth/login']);
        return false;
      }),
      catchError((err) => {
        // The service returned an error, redirect to login page
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }

}
