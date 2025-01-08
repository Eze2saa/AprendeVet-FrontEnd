import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'regulacion-glucosa',
  templateUrl: './regulacion-glucosa.component.html',
  styleUrl: './regulacion-glucosa.component.scss',
})
export class RegulacionGlucosaComponent implements OnInit {
  opcionMenu: string = 'introduccion';
  opcionMenuSeleccionada: string = 'introduccion';

  ngOnInit() {}

  updateScreen(opcionMenuSeleccionada: string) {
    if(opcionMenuSeleccionada === this.opcionMenu){
      return;
    }
    else{
      this.opcionMenu = opcionMenuSeleccionada;
    }
  }
}
