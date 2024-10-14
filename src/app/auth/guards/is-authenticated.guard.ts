import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { AuthService } from '../services/auth.service';


//Guard implementado como función
export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  //En el state tenemos la url donde estaba o a la que quería ir al usuario en el momento de la validación
  //Se puede utilizar para redirigir ahí al usuario cuando se autentique o para lo que se quiera
  const authService = inject(AuthService)

  //Si todavía no se evaluó la autenticación, en teoría no hace falta con el guard IsNotAuthenticated
  // if(authService.authStatus() === AuthStatus.Checking){
  //   return false;
  // }
  
  if(authService.authStatus() === AuthStatus.Authenticated){
    return true;
  }

  //NotAuthenticated..
  const router = inject(Router);
  router.navigateByUrl('/auth/login');

  return false;
};
