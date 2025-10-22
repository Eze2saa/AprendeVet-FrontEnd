import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      // import('./home/home.module').then(m => m.HomeModule)
      import('./regulacion-glucemia/regulacion-glucemia.module').then(m => m.RegulacionGlucemiaModule)
  },
  {
    path: 'regulacion-glucemia',
    loadChildren: () =>
      import('./regulacion-glucemia/regulacion-glucemia.module').then(m => m.RegulacionGlucemiaModule),
    // canActivate: [AuthGuard],
    // canMatch: [AuthGuard]
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
