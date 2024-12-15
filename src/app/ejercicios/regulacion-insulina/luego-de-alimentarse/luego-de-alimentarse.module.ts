import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuegoDeAlimentarseComponent } from './luego-de-alimentarse.component';

@NgModule({
  declarations: [
    LuegoDeAlimentarseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [
    LuegoDeAlimentarseComponent
  ]
})
export class LuegoDeAlimentarseModule { }
