
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiBaseUrl: string = environment.apiBaseUrl;
  
  constructor(private http: HttpClient){}

  login(login: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth`, login)
      .pipe(
        tap(resp => {
          if (resp.ok && resp.token){
            this.setLocalToken(resp.token);
          }
        })
      );
  }

  registro (registro: Register): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth/new`, registro)
      .pipe(
        tap((resp) => {
          if (resp.ok && resp.token){
            this.setLocalToken(resp.token);
          }
        })
      );
  }

  validarToken(): Observable<boolean>{
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('tokenAprendeVet') || '')

    return this.http.get<AuthResponse>(`${this.apiBaseUrl}/auth/renew`, { headers })
        .pipe(
          map((resp) => {
            this.setLocalToken(resp.token!);
            return resp.ok;
          }),
          catchError(err => {
            return of(false);
          })
        )
  }

  setLocalToken(token: string){
    localStorage.setItem('tokenAprendeVet', token);
  }

  clearLocalToken(){
    localStorage.removeItem('tokenAprendeVet');
  }
}
