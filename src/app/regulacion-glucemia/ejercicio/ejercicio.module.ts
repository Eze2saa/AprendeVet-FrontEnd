import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { EjercicioComponent } from './ejercicio.component';

@NgModule({
  declarations: [
    EjercicioComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  exports: [
    EjercicioComponent
  ]
})
export class EjercicioModule { }
