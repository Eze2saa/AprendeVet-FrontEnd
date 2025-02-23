import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'regulacion-glucosa',
  templateUrl: './regulacion-glucosa.component.html',
  styleUrl: './regulacion-glucosa.component.scss',
})
export class RegulacionGlucosaComponent implements OnInit {
  opcionMenu: string = 'introduccion';//'enAyuno';
  opcionMenuSeleccionada: string = 'introduccion';//'enAyuno';

  introduccionButtonClass: string = 'boton-header-seleccionado';
  enAyunoButtonClass: string = 'boton-header';
  luegoDeAlimentarseButtonClass: string = 'boton-header';

  ngOnInit() {}

  updateScreen(opcionMenuSeleccionada: string) {
    if (opcionMenuSeleccionada === this.opcionMenu) {
      return;
    } else {
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
      }, 0);
    }
  }
}
