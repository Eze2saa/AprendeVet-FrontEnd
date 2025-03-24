import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'regulacion-glucosa',
  templateUrl: './regulacion-glucosa.component.html',
  styleUrl: './regulacion-glucosa.component.scss',
})
export class RegulacionGlucosaComponent implements OnInit {
  opcionMenu: string = 'enAyuno'; //'luegoDeAlimentarse';// 'introduccion'; //'enAyuno';
  opcionMenuSeleccionada: string = 'enAyuno'; //'luegoDeAlimentarse';// 'introduccion'; //'enAyuno';

  introduccionButtonClass: string = 'boton-header-seleccionado';
  enAyunoButtonClass: string = 'boton-header';
  luegoDeAlimentarseButtonClass: string = 'boton-header';

  ngOnInit() {}

  menuSeleccionado(opcionMenuSeleccionada: string) {
    if (this.opcionMenu === opcionMenuSeleccionada) {
      return;
    } else {
      // emitir a ejercicio y esperar respuesta en updateScreen
      this.opcionMenuSeleccionada = opcionMenuSeleccionada;
      //reinicio el valor para que si se cancela el movimiento a otra pantalla y se vuelve a elegir la misma opción de movimiento previa, el input la pueda procesar
      setTimeout(() => {
        this.opcionMenuSeleccionada = '';
      }, 100);
    }
  }

  updateScreen(opcionMenuSeleccionada: string) {
    setTimeout(() => {
      switch (opcionMenuSeleccionada) {
        case 'introduccion':
          this.introduccionButtonClass = 'boton-header-seleccionado';
          this.enAyunoButtonClass = 'boton-header';
          this.luegoDeAlimentarseButtonClass = 'boton-header';
          break;
        case 'enAyuno':
          this.introduccionButtonClass = 'boton-header';
          this.enAyunoButtonClass = 'boton-header-seleccionado';
          this.luegoDeAlimentarseButtonClass = 'boton-header';
          break;
        case 'luegoDeAlimentarse':
          this.introduccionButtonClass = 'boton-header';
          this.enAyunoButtonClass = 'boton-header';
          this.luegoDeAlimentarseButtonClass = 'boton-header-seleccionado';
          break;
      }

      this.opcionMenu = opcionMenuSeleccionada;
    });
  }

}