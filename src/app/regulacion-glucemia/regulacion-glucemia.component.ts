import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserGlucemia } from '../models/user-glucemia.model';
import { MenuOptions } from '../shared/constants';

@Component({
  selector: 'regulacion-glucemia',
  templateUrl: './regulacion-glucemia.component.html',
  styleUrl: './regulacion-glucemia.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class RegulacionGlucemiaComponent implements OnInit, OnDestroy {

  menuOptions = MenuOptions;
  opcionMenu: string = MenuOptions.INTRO;//MenuOptions.INTRO; //MenuOptions.AYUNO;//
  opcionMenuSeleccionada: string = MenuOptions.INTRO;//MenuOptions.INTRO; //MenuOptions.AYUNO;

  hideIntroduccion: boolean = false;

  user: UserGlucemia | null = null;

  //Audio
  audioHover = new Audio();
  audioClick = new Audio();

  ngOnInit(): void {
    document.body.classList.add('regulacion-glucemia');

    this.audioHover.src = 'sonidos/hover.wav';
    this.audioClick.src = 'sonidos/click.mp3';
  }

  ngOnDestroy(): void {
    document.body.classList.remove('regulacion-glucemia');
  }

  menuSeleccionado(opcionMenuSeleccionada: string) {
    if (this.opcionMenu === opcionMenuSeleccionada) {
      return;
    } else {
      // emitir a ejercicio y esperar respuesta en (opcionMenuOutput)
      this.opcionMenuSeleccionada = opcionMenuSeleccionada;
      if(opcionMenuSeleccionada != MenuOptions.INTRO){
        this.hideIntroduccion = true;
      }
      //reinicio el valor para que si se cancela el movimiento a otra pantalla y se vuelve a elegir la misma opción de movimiento previa, el input la pueda procesar
      setTimeout(() => {
        this.opcionMenuSeleccionada = '';
      }, 100);
    }
  }

  setOpcionMenu(opcion: string){
     setTimeout(() => {
        this.opcionMenu = opcion;
        this.hideIntroduccion = opcion != MenuOptions.INTRO;
      }, 100);
  }

  playAudio(audio: HTMLAudioElement) {
    // audio.load();
    // audio.play();
  }

}