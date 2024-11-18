import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'auth',
  //   // canActivate: [ isNotAuthenticatedGuard ],
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  // },
  // {
  //   path: 'dashboard',
  //   // canActivate: [ isAuthenticatedGuard ], //Se puede poner en los distintos niveles de rutas
  //   //Así por ejemplo, este quedaría global y alguna ruta hija del dashboard podría tener otro guard que permita el acceso solo si el usuario tiene cierto rol
  //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  // },
  // {
  //   path: '**',
  //   //debería ir al dashboard u otra cosa porque puede que ya estemos autenticados
  //   redirectTo: 'auth'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RegulacionInsulinaRoutingModule { }
