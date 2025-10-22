import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegulacionGlucemiaComponent } from './regulacion-glucemia.component';

const routes: Routes = [
  {
    path: '',
    component: RegulacionGlucemiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegulacionGlucemiaRoutingModule { }
