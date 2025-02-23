import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EjercicioInicialComponent } from './ejercicio-inicial.component';

@NgModule({
  declarations: [
    EjercicioInicialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule
  ],
  exports: [
    EjercicioInicialComponent
  ]
})
export class EjercicioInicialModule { }
