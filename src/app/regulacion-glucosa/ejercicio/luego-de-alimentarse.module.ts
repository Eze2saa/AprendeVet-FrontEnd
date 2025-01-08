import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LuegoDeAlimentarseComponent } from './luego-de-alimentarse.component';

@NgModule({
  declarations: [
    LuegoDeAlimentarseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule
  ],
  exports: [
    LuegoDeAlimentarseComponent
  ]
})
export class LuegoDeAlimentarseModule { }
