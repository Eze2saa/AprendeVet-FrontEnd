import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { RegulacionGlucemiaRoutingModule } from './regulacion-glucemia-routing.module';
import { RegulacionGlucemiaComponent } from './regulacion-glucemia.component';

@NgModule({
  declarations: [
    RegulacionGlucemiaComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    EjercicioModule,
    RegulacionGlucemiaRoutingModule, 
    RouterModule,
    ProgressSpinnerModule,
  ],
  exports: [
    RegulacionGlucemiaComponent
  ]
})
export class RegulacionGlucemiaModule { }
