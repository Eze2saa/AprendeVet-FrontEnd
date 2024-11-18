import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegulacionInsulinaModule } from './ejercicios/regulacion-insulina/regulacion-insulina.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    SidebarModule,
    BrowserAnimationsModule,
    ButtonModule,
    AccordionModule,
    CardModule,
    ToolbarModule,
    RegulacionInsulinaModule
  ],
  //A partir de Angular 14, se recomienda usar provideHttpClient() junto con withInterceptorsFromDi() para configurar el HttpClient
  //Ejemplo con interceptores:  providers: [
  //   provideHttpClient(withInterceptorsFromDi()), // Provee el HttpClient con interceptores
  //   { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true } // Configura tu interceptor
  // ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
