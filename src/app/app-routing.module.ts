import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'regulacion-glucosa',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./regulacion-glucosa/regulacion-glucosa.module').then(m => m.RegulacionGlucosaModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
