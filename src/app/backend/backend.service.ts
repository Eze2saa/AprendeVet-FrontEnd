
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { AuthResponse } from './auth-response.model';
import { Login } from './login.model';
import { Register } from './register.model';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  //crear environment y meter la url ahi
  private readonly baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient){}

  login(login: Login) {
  console.log('llamando a login aprendeVet', `${this.baseUrl}/auth`, login);

  return this.http.post<AuthResponse>(`${this.baseUrl}/auth`, login)
    .pipe(
      tap(resp => { 
        if (resp.ok && resp.token){
          sessionStorage.setItem('token', resp.token);
        }
      }),
      catchError(err => {
        console.log('error a login', err);
        return of(err.error.msg);
      })
    );
  }

  registro (registro: Register){
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/new`, registro)
      .pipe(
        tap((resp) => {
          if (resp.ok && resp.token){
            //Si el response tuvo un status 200, seteamos el token porq sino cuando entre al inicio lo va a sacar, y seteamos el uid del usuario
            localStorage.setItem('token', resp.token);
          }
        }),
        catchError(err => of(err.error.msg))
      );
  }
}
