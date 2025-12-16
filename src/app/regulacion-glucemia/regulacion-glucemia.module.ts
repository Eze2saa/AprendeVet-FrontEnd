import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { RegulacionGlucemiaRoutingModule } from './regulacion-glucemia-routing.module';
import { RegulacionGlucemiaComponent } from './regulacion-glucemia.component';

@NgModule({
  declarations: [
    RegulacionGlucemiaComponent,
    EjercicioComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    RegulacionGlucemiaRoutingModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  exports: [
    RegulacionGlucemiaComponent
  ],
  providers: [MessageService]
})
export class RegulacionGlucemiaModule { }
