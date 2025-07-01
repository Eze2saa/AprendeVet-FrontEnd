import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegulacionGlucosaComponent } from './regulacion-glucosa.component';

const routes: Routes = [
  {
    path: '',
    component: RegulacionGlucosaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegulacionGlucosaRoutingModule { }
