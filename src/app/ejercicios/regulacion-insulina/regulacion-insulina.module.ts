import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuegoDeAlimentarseModule } from './luego-de-alimentarse/luego-de-alimentarse.module';
import { RegulacionInsulinaComponent } from './regulacion-insulina.component';

@NgModule({
  declarations: [
    RegulacionInsulinaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LuegoDeAlimentarseModule
  ],
  exports: [
    RegulacionInsulinaComponent
  ]
})
export class RegulacionInsulinaModule { }
