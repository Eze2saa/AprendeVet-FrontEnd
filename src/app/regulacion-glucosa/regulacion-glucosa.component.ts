import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'regulacion-glucosa',
  templateUrl: './regulacion-glucosa.component.html',
  styleUrl: './regulacion-glucosa.component.scss',
})
export class RegulacionGlucosaComponent implements OnInit, OnDestroy {

  opcionMenu: string = 'enAyuno'; //'luegoDeAlimentarse';// 'introduccion'; //'enAyuno';
  opcionMenuSeleccionada: string = 'enAyuno'; //'luegoDeAlimentarse';// 'introduccion'; //'enAyuno';

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
      //reinicio el valor para que si se cancela el movimiento a otra pantalla y se vuelve a elegir la misma opción de movimiento previa, el input la pueda procesar
      setTimeout(() => {
        this.opcionMenuSeleccionada = '';
      }, 100);
    }
  }

  playAudio(audio: HTMLAudioElement) {
    // audio.load();
    // audio.play();
  }

}