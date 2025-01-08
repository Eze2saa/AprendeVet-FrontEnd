import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuegoDeAlimentarseModule } from './ejercicio/luego-de-alimentarse.module';
import { RegulacionGlucosaComponent } from './regulacion-glucosa.component';

@NgModule({
  declarations: [
    RegulacionGlucosaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LuegoDeAlimentarseModule
  ],
  exports: [
    RegulacionGlucosaComponent
  ]
})
export class RegulacionGlucosaModule { }
