import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AvisoMobileComponent } from './aviso-mobile.component';

@NgModule({
  declarations: [
    AvisoMobileComponent
  ],
  imports: [
    CommonModule,
    DialogModule
  ],
  exports: [
    AvisoMobileComponent
  ]
})
export class AvisoMobileModule { }
