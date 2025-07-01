import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { RegulacionGlucosaRoutingModule } from './regulacion-glucosa-routing.module';
import { RegulacionGlucosaComponent } from './regulacion-glucosa.component';

@NgModule({
  declarations: [
    RegulacionGlucosaComponent
  ],
  imports: [
    CommonModule,
    EjercicioModule,
    RegulacionGlucosaRoutingModule
  ],
  exports: [
    RegulacionGlucosaComponent
  ]
})
export class RegulacionGlucosaModule { }
