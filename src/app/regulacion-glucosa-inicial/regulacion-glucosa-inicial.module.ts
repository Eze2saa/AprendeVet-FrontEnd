import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EjercicioInicialModule } from './ejercicio-inicial/ejercicio-inicial.module';
import { RegulacionGlucosaInicialComponent } from './regulacion-glucosa-inicial.component';

@NgModule({
  declarations: [
    RegulacionGlucosaInicialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EjercicioInicialModule
  ],
  exports: [
    RegulacionGlucosaInicialComponent
  ]
})
export class RegulacionGlucosaModule { }
