import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'regulacion-insulina',
  templateUrl: './regulacion-insulina.component.html',
  styleUrl: './regulacion-insulina.component.scss',
})
export class RegulacionInsulinaComponent implements OnInit {
  introduccionSeleccionada: boolean = false;
  enAyunoSeleccionado: boolean = false;
  luegoDeAlimentarseSeleccionado: boolean = true;

  tipoEjercicio: string = '';

  ngOnInit() {}

  updateButtons(nombreBoton: string) {
    switch (nombreBoton) {
      case 'introduccion':
        if(this.introduccionSeleccionada) break;
        this.introduccionSeleccionada = !this.introduccionSeleccionada;
        this.enAyunoSeleccionado = false;
        this.luegoDeAlimentarseSeleccionado = false;

        this.tipoEjercicio = '';
        break;
      case 'enAyuno':
        if(this.enAyunoSeleccionado) break;
        this.enAyunoSeleccionado = !this.enAyunoSeleccionado;
        this.introduccionSeleccionada = false;
        this.luegoDeAlimentarseSeleccionado = false;

        this.tipoEjercicio = 'enAyuno';
        break;
      default:
        if(this.luegoDeAlimentarseSeleccionado) break;
        this.luegoDeAlimentarseSeleccionado = !this.luegoDeAlimentarseSeleccionado;
        this.introduccionSeleccionada = false;
        this.enAyunoSeleccionado = false;

        this.tipoEjercicio = 'luegoDeAlimentarse';
        break;
    }
  }
}
