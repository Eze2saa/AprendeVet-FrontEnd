import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { RegulacionGlucosaComponent } from './regulacion-glucosa.component';

@NgModule({
  declarations: [
    RegulacionGlucosaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EjercicioModule
  ],
  exports: [
    RegulacionGlucosaComponent
  ]
})
export class RegulacionGlucosaModule { }
