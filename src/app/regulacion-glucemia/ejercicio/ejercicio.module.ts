import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { EjercicioComponent } from './ejercicio.component';

@NgModule({
  declarations: [
    EjercicioComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ToastModule
  ],
  exports: [
    EjercicioComponent
  ],
  providers: [MessageService]
})
export class EjercicioModule { }
