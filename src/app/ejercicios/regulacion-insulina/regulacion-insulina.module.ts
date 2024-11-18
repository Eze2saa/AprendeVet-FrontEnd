import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { LuegoDeAlimentarseComponent } from './luego-de-alimentarse/luego-de-alimentarse.component';
import { RegulacionInsulinaComponent } from './regulacion-insulina.component';

@NgModule({
  declarations: [
    RegulacionInsulinaComponent,
    LuegoDeAlimentarseComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    SidebarModule,
    BrowserAnimationsModule,
    ButtonModule,
    AccordionModule,
    CardModule,
    ToolbarModule,
    TabMenuModule
  ],
  exports: [
    RegulacionInsulinaComponent,
    LuegoDeAlimentarseComponent
  ]
})
export class RegulacionInsulinaModule { }
