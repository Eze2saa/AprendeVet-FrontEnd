import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
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
    RegulacionGlucemiaRoutingModule,
    TooltipModule
  ],
  exports: [
    RegulacionGlucemiaComponent
  ]
})
export class RegulacionGlucemiaModule { }
