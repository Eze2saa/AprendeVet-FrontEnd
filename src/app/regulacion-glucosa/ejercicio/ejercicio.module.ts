import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EjercicioComponent } from './ejercicio.component';

@NgModule({
  declarations: [
    EjercicioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule
  ],
  exports: [
    EjercicioComponent
  ]
})
export class EjercicioModule { }
