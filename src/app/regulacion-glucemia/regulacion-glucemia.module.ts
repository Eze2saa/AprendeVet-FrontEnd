import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { RegulacionGlucemiaRoutingModule } from './regulacion-glucemia-routing.module';
import { RegulacionGlucemiaComponent } from './regulacion-glucemia.component';

@NgModule({
  declarations: [
    RegulacionGlucemiaComponent
  ],
  imports: [
    CommonModule,
    EjercicioModule,
    RegulacionGlucemiaRoutingModule
  ],
  exports: [
    RegulacionGlucemiaComponent
  ]
})
export class RegulacionGlucemiaModule { }
