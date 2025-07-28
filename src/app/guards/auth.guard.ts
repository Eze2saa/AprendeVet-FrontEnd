import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanMatch {

  constructor(
    private authService : AuthService,
    private router : Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        tap (valid => {
          if (!valid){
            this.router.navigateByUrl('/home');
          }
        })
      );
  }

  canMatch(): Observable<boolean> | boolean { 
    return this.authService.validarToken()
      .pipe(
        tap (valid => {
          if (!valid){
            this.router.navigateByUrl('/home');
          }
        })
      );
  }
}
