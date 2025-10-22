import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserGlucemia } from '../models/user-glucemia.model';

@Component({
  selector: 'regulacion-glucosa',
  templateUrl: './regulacion-glucosa.component.html',
  styleUrl: './regulacion-glucosa.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class RegulacionGlucosaComponent implements OnInit, OnDestroy {

  opcionMenu: string = 'enAyuno';//'introduccion'; //'enAyuno';//
  opcionMenuSeleccionada: string = 'enAyuno';//'introduccion'; //'enAyuno';

  hideIntroduccion: boolean = false;

  user: UserGlucemia | null = null;

  //Audio
  audioHover = new Audio();
  audioClick = new Audio();

  ngOnInit(): void {
    document.body.classList.add('regulacion-glucosa');

    this.audioHover.src = 'sonidos/hover.wav';
    this.audioClick.src = 'sonidos/click.mp3';
  }

  ngOnDestroy(): void {
    document.body.classList.remove('regulacion-glucosa');
  }

  menuSeleccionado(opcionMenuSeleccionada: string) {
    if (this.opcionMenu === opcionMenuSeleccionada) {
      return;
    } else {
      // emitir a ejercicio y esperar respuesta en (opcionMenuOutput)
      this.opcionMenuSeleccionada = opcionMenuSeleccionada;
      if(opcionMenuSeleccionada != 'introduccion'){
        this.hideIntroduccion = true;
      }
      //reinicio el valor para que si se cancela el movimiento a otra pantalla y se vuelve a elegir la misma opción de movimiento previa, el input la pueda procesar
      setTimeout(() => {
        this.opcionMenuSeleccionada = '';
      }, 100);
    }
  }

  setOpcionMenu(opcion: string){
    this.opcionMenu = opcion;
    
    this.hideIntroduccion = opcion != 'introduccion';
  }

  playAudio(audio: HTMLAudioElement) {
    // audio.load();
    // audio.play();
  }

}