
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { AuthResponse } from './auth-response.model';
import { Login } from './login.model';
import { Register } from './register.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //crear environment y meter la url ahi
  private readonly baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient){}

  login(login: Login): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.baseUrl}/auth`, login)
    .pipe(
      tap(resp => { 
        if (resp.ok && resp.token){
          localStorage.setItem('tokenAprendeVet', resp.token);
        }
      }),
      catchError(err => of(err.error.msg))
    );
  }

  registro (registro: Register): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/new`, registro)
      .pipe(
        tap((resp) => {
          if (resp.ok && resp.token){
            //Si el response tuvo un status 200, seteamos el token porq sino cuando entre al inicio lo va a sacar, y seteamos el uid del usuario
            localStorage.setItem('tokenAprendeVet', resp.token);
          }
        }),
        catchError(err => of(err.error.msg))
      );
  }

  validarToken(): Observable<boolean>{
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('tokenAprendeVet') || '')

    return this.http.get<AuthResponse>(`${this.baseUrl}/auth/renew`, { headers })
        .pipe(
          map((resp) => {
            localStorage.setItem('tokenAprendeVet', resp.token!)
            return resp.ok;
          }),
          catchError(err => {
            return of(false);
          })
        )
  }
}
