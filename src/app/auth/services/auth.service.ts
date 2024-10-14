import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { CheckTokenResponse } from '../interfaces/check-token-response.interface';
import { Login, LoginResponse } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tener token y validarlo para acceder a las pantallas
  // si se refresca la pantalla tenemos que hacer una reconstrucción de la información del usuario en la sesión actual
  // el guard lo usamos para sacar el usuario de la ruta o no permitirle entrar si no está autenticado
  // el guard solo pregunta si el usuario está autenticado o no, no se ocupa de obtener de loguear al usuario ni nada por el estilo. Solo usa la información que ya se encuentra cargada en la aplicación
  // esa información del usuario necesaria para saber si está autenticado o no, hay que mantenerla en memoria, para por ejemplo si se refresca la pantalla => la información completa sería su token más sus datos personales, pero para validar solo precisamos el token
  // checkToken (/refresh-token) te da un nuevo token si llegas a la api con un token previo que es valido
  // ese metodo valida el payload y si todo bien devuelve un nuevo token
  // si el token se encuentrá expirado, da error => en ese caso el token de la sesión se venció y el usuario debería volver a loguearse
  // si el token está mal firmado, da error => en ese caso hay que volver a loguearse también
  // por lo tanto, el refresco de tokens es automatico si constantemente chequeamos el token cada vez que navegamos a una nueva pagina, para ir refrescando la sesión del usuario con su token

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.NotAuthenticated);

  //Lo que expongo públicamente
  public currentUser: Signal<User | null> = computed(() => this._currentUser()); //Computed recibe una o varias señales y devuelve una nueva señal a partir de trabajar con las señales recibidas
  public authStatus: Signal<AuthStatus> = computed(() => this._authStatus());

  constructor() { 
    this.checkAuthStatus().subscribe();
  }

  private setAuthenticationValues(user: User, token: string){
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.Authenticated);
    localStorage.setItem('token', token); // Guardamos el token en memoria
  }

  login(login: Login): Observable<boolean>{
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/auth/login`,
      login
    )
    .pipe(
      map(({user, token}) => {
        this.setAuthenticationValues(user, token);
        return true;
      }),
      catchError((err) => {
        console.log(err.error.message);
        this._authStatus.set(AuthStatus.NotAuthenticated);
        return throwError(() => err.error.message);
      })
    );
  }

  checkAuthStatus(): Observable<boolean>{
    const token = localStorage.getItem('token');

    //Si el usuario no se logueó nunca todavía
    if(!token){
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    //Verifica que el token sea válido y no haya vencido. 
    //De ser así, nos devuelve uno nuevo => lo refrescamos
    return this.http.get<CheckTokenResponse>(
      `${this.baseUrl}/auth/login`,
      { headers }
    )
    .pipe(
      map(({user, token}) => {
        this.setAuthenticationValues(user, token);
        return true;
      }),
      catchError((err) => {
        console.log(err.error.message);
        this._authStatus.set(AuthStatus.NotAuthenticated);
        return of(false);
      })
    );
  }

  logout(){
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.Checking);
    localStorage.removeItem('token');
  }

}
