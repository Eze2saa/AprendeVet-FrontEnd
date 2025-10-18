import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import confetti from 'canvas-confetti';

interface Opcion {
  disabled: boolean;
  correct: boolean;
}

@Component({
  selector: 'ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrl: './ejercicio.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),

    trigger('imageFade', [
      state('true', style({ opacity: 0 })),
      state('false', style({ opacity: 1 })),
      transition('true => false', animate('1s ease-in')),
      transition('false => true', animate('1s ease-out')),
    ]),

    trigger('popupFade', [
      state('true', style({ opacity: 0 })),
      state('false', style({ opacity: 1 })),
      transition('false => true', animate('1.5s ease-out')),
    ]),
  ],
})

export class EjercicioComponent implements OnInit {
  ejercicioEnProgreso: boolean = false;

  //Vidas
  vidasBase: number = 3;
  vidasRestantes: number = 3;
  vida1Hovered: boolean = false;
  vida2Hovered: boolean = false;
  vida3Hovered: boolean = false;

  //Animaciones
  imageFade1: boolean = true;
  imageFade2: boolean = false;
  imageFade3: boolean = true;
  imageFade4: boolean = true;

  //Opciones
  generalDisableOption: boolean = false;

  manejoDeOpciones: Opcion[] = [
    { disabled: false, correct: false },
    { disabled: false, correct: false },
    { disabled: false, correct: false },
    { disabled: false, correct: false },
    { disabled: false, correct: false },
    { disabled: false, correct: false },
    { disabled: false, correct: false },
  ];

  opcionesCorrectas: string[] = [];

  valorPrevioEnAyuno: boolean | null = null;
  valorPrevioLuegoDeAlimentarse: boolean | null = null;

  opcionMenu: string = 'introduccion';
  opcionMenuTentativa: string = '';

  @Output() opcionMenuOutput = new EventEmitter<string>();

  @Input()
  set opcionMenuSeleccionada(opcionSeleccionada: string) {
    if (!opcionSeleccionada || this.opcionMenu === opcionSeleccionada) {
      return;
    }

    //Si estamos en introduccion o estamos en un ejercicio que no está en progreso, avanzar al ejercicio seleccionado
    if (this.opcionMenu === 'introduccion' || !this.ejercicioEnProgreso) {
      this.opcionMenu = opcionSeleccionada;
      this.opcionMenuOutput.emit(opcionSeleccionada);
      return;
    }

    //Si estamos en un ejercicio en progreso y nos queremos mover
    this.opcionMenuTentativa = opcionSeleccionada;
    this.popupSalirVisible = true;
  }

  //Mensajes
  estado: string = 'Normal'; //Hiperglucemia, estable, hipoglucemia
  mensajeAlerta: string = ''; //Mensaje en rojo si hay algo mal para describir el peligro

  //Popups
  popupResultadoCorrecto: boolean = true;
  popupResultadoVisible: boolean = false;
  showButtonsPopupResultado: boolean = false;
  mensajePopupResultado: string = 'Lograste estabilizar los niveles de glucosa';// "No lograste estabilizar los niveles de glucosa" para ejercicio
  popupResultadoFade: boolean = false;

  popupSalirVisible: boolean = false;
  popupPreEjercicioVisible: boolean = false;
  popupInsigniasVisible: boolean = false;

  //Medidas base y configuración de puntuaciones
  medidaBase: number = 110;
  medidaBaseEnAyuno: number = 50;
  medidaBaseLuegoDeAlimentarse: number = 210;
  medidaActual: number = 110;

  medidaCambioLuegoDeAlimentarse: number = 160;

  respuestasCorrectasEnAyuno: number = 0;
  puntuacionRespuestasCorrectasEnAyuno: number[] = [10, 10, 20, 10, 10];
  
  respuestasCorrectasLuegoDeAlimentarse: number = 0;
  puntuacionRespuestasCorrectasLuegoDeAlimentarse: number[] = [20, 10, 30, 20, 10, 10];

  escalaMedidas: number[] = [
    210, 200, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10
  ];
  
  intervaloMedida: any;

  // Hacer que el audio del juego sea opcional, poniendo un boton en algun lado
  // Hacer que el audio del juego sea opcional, poniendo un boton en algun lado

/*
audioContext!: AudioContext;
source!: AudioBufferSourceNode;

ngOnInit() {
  this.audioContext = new AudioContext();

  fetch('assets/sonido.mp3')
    .then(res => res.arrayBuffer())
    .then(data => this.audioContext.decodeAudioData(data))
    .then(buffer => {
      this.source = this.audioContext.createBufferSource();
      this.source.buffer = buffer;
      this.source.loop = true;
      this.source.connect(this.audioContext.destination);
      
      // Necesitas una interacción del usuario para iniciar el contexto
      document.addEventListener('click', () => {
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }
        this.source.start(0);
      }, { once: true });
    });
}
*/

  //Audio
  audioGame = new Audio();
  audioCorrecto = new Audio();
  audioIncorrecto = new Audio();
  audioHover = new Audio();
  audioClick = new Audio();
  audioWin = new Audio();
  audioGameOver = new Audio();
  audioHeartBeat = new Audio();

  
  //Confetti
  confettiDefaults = {
    origin: { y: 0.3 }
  };

  intervaloConfetti: any;

  fire(particleRatio: number, opts: confetti.Options | undefined) {
    confetti({
      ...this.confettiDefaults,
      ...opts,
      particleCount: Math.floor(100 * particleRatio)
    });
  }

  lanzarConfetti(angle: number) {
    this.fire(0.25, {
      spread: 26,
      startVelocity: 55,
      angle: angle,
    });
    this.fire(0.2, {
      spread: 60,
      angle: angle,
    });
    this.fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      angle: angle,
    });
    this.fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      angle: angle,
    });
    this.fire(0.1, {
      spread: 120,
      startVelocity: 45,
      angle: angle,
    });
  }

  confetti() {
    this.lanzarConfetti(45);
    
    this.lanzarConfetti(135);

    this.intervaloConfetti = setInterval(() => {
      this.lanzarConfetti(45);
      this.lanzarConfetti(135);
    }, 3000);
  }

  clearIntervaloConfetti(){
    clearInterval(this.intervaloConfetti);
  }

  ngOnInit(): void {
    // this.audioGame.src = 'sonidos/audio-game.mp3';
    // this.audioGame.load();
    // this.audioGame.volume = 0.3;
    // this.audioGame.loop = true;

    // this.audioCorrecto.src = 'sonidos/correcto.mp3';
    // this.audioIncorrecto.src = 'sonidos/incorrecto.wav';
    // this.audioHover.src = 'sonidos/hover.wav';
    // this.audioClick.src = 'sonidos/click.mp3';
    // this.audioWin.src = 'sonidos/win.wav';
    // this.audioGameOver.src = 'sonidos/game-over.mp3';
    // this.audioHeartBeat.src = 'sonidos/heartbeat-1.mp3';
  }

  irAlInicio() {
    this.popupResultadoVisible = false;
    this.opcionMenu = 'introduccion';
    this.opcionMenuOutput.emit('introduccion');
    this.resetearEjercicio();
  }

  irAlSiguienteEscenario() {
    this.popupResultadoVisible = false;
    this.opcionMenu = this.opcionMenu === 'enAyuno' ? 'luegoDeAlimentarse' : 'enAyuno';
    this.opcionMenuOutput.emit(this.opcionMenu);
    this.resetearEjercicio();
  }

  clearIntervaloMedida(){
    clearInterval(this.intervaloMedida);
  }

  playAudio(audio: HTMLAudioElement) {
    audio.load();
    audio.play();
  }

  hormonaSeleccionada(hormona: string) {
    this.popupResultadoFade = false;
    if (this.opcionMenu === 'enAyuno') {
      if (hormona !== 'insulina') {
        this.playAudio(this.audioCorrecto);
        this.popupResultadoCorrecto = true;
        this.mensajePopupResultado =
          'Esa hormona va a colaborar en esta estabilización';
      } else {
        this.playAudio(this.audioGameOver);
        this.popupResultadoCorrecto = false;
        this.mensajePopupResultado =
          'Esa hormona no va a colaborar en esta estabilización';
      }
    } else {
      if (hormona === 'insulina') {
        this.playAudio(this.audioCorrecto);
        this.popupResultadoCorrecto = true;
        this.mensajePopupResultado =
          'La insulina es la que va a colaborar en esta estabilización';
      } else {
        this.playAudio(this.audioGameOver);
        this.popupResultadoCorrecto = false;
        this.mensajePopupResultado =
          'Esa hormona no va a colaborar en esta estabilización';
      }
    }

    this.popupPreEjercicioVisible = false;
    this.popupResultadoVisible = true;
    this.showButtonsPopupResultado = false;

    if (this.popupResultadoCorrecto) {
      setTimeout(() => {
        this.popupResultadoFade = true;
      }, 2500);
      setTimeout(() => {
        this.popupResultadoVisible = false;
        this.popupResultadoFade = false;
        this.comenzarEjercicio();
        this.showButtonsPopupResultado = true;
      }, 3700);

      //En vez de esto, hacer un popup que explique que van a tener tres vidas y eso
      //bosquejar todo hasta que funcione y dejar los detalles para lo ultimo
      //hacer el diseño, las pantallas y popups para representar el flujo y después hacerlo funcional
      //una vez que todo el funcionamiento este listo, recién ahi puedo ocuparme de los detalles y de
      //que quede lindo con la cabeza 100% en eso, de otra manera estoy pensando siempre en las dos
      //cosas a la vez
    } else {
      this.showButtonsPopupResultado = true;
    }
  }

  comenzarEjercicio() {
    this.generalDisableOption = true;

    this.ejercicioEnProgreso = true;

    if (this.opcionMenu === 'enAyuno') {
      this.opcionesCorrectas = [
        'glucogenolisisHigado',
        'gluconeogenesis',
        'proteolisis',
        'betaOxidacion',
        'lipolisis',
      ];

      this.estado = 'Hipoglucemia';
      this.mensajeAlerta =
        'Tu paciente se encuentra desorientado y somnoliento';

      setTimeout(() => {
        this.imageFade2 = true;
        this.imageFade1 = false;
      }, 500);

      this.intervaloMedida = setInterval(() => {
        this.medidaActual -= 10;
      }, 500);

      setTimeout(() => {
        this.clearIntervaloMedida();
        this.generalDisableOption = false;
      }, 3000);
    } else {
      this.opcionesCorrectas = [
        'glucogenogenesisHigado',
        'glucolisis',
        'expresionGlut4Higado',
        'glucogenogenesisMusculo',
        'sintesisAcidosGrasos',
        'expresionGlut4Musculo'
      ];

      this.estado = 'Hiperglucemia';
      this.mensajeAlerta = 'Ocurrirán daños si la hiperglucemia continua';

      setTimeout(() => {
        this.imageFade2 = true;
        this.imageFade3 = false;
      }, 500);
      setTimeout(() => {
        this.imageFade3 = true;
        this.imageFade4 = false;
      }, 3000);

      this.intervaloMedida = setInterval(() => {
        this.medidaActual += 10;
      }, 500);

      setTimeout(() => {
        this.clearIntervaloMedida();
        this.generalDisableOption = false;
      }, 5000);
    }
  }

  resetearEjercicio() {
    this.ejercicioEnProgreso = false;
    this.opcionesCorrectas = [];
    this.medidaActual = this.medidaBase;
    this.estado = 'Normal';
    this.mensajeAlerta = '';
    this.imageFade1 = true;
    this.imageFade2 = false;
    this.imageFade3 = true;
    this.imageFade4 = true;
    this.vidasRestantes = this.vidasBase;
    this.manejoDeOpciones.forEach((o) => {
      o.correct = false;
      o.disabled = false;
    });

    if (this.opcionMenuTentativa) {
      this.opcionMenuOutput.emit(this.opcionMenuTentativa);
      this.opcionMenu = this.opcionMenuTentativa;
      this.opcionMenuTentativa = '';
    }
  }

  respuestaSeleccionada(respuesta: string, lineaDeOpciones: number) {
    if (this.opcionesCorrectas.includes(respuesta)) {
      this.playAudio(this.audioCorrecto);

      setTimeout(() => this.disableOption(lineaDeOpciones), 35);

      this.manejoDeOpciones[lineaDeOpciones].correct = true;

      if (this.opcionMenu === 'enAyuno') {
        this.medidaActual +=
          this.puntuacionRespuestasCorrectasEnAyuno[
            this.respuestasCorrectasEnAyuno
          ];
        this.respuestasCorrectasEnAyuno++;
      } else {
        this.medidaActual -=
          this.puntuacionRespuestasCorrectasLuegoDeAlimentarse[
            this.respuestasCorrectasLuegoDeAlimentarse
          ];
        this.respuestasCorrectasLuegoDeAlimentarse++;
      }
    } else {
      this.playAudio(this.audioIncorrecto);
      this.respuestasCorrectasEnAyuno = 0;
      this.respuestasCorrectasLuegoDeAlimentarse = 0;

      //Actualizo vidas
      this.vidasRestantes--;
      if (this.vidasRestantes === 0) {
        this.playAudio(this.audioGameOver);
        
        this.popupResultadoCorrecto = false;
        this.mensajePopupResultado =
          'No lograste estabilizar los niveles de glucosa';
        this.popupResultadoVisible = true;
        this.showButtonsPopupResultado = true;
      } else {
        this.manejoDeOpciones.forEach((o) => {
          o.correct = false;
          o.disabled = false;
        });

        this.medidaActual = this.opcionMenu === 'enAyuno' ? this.medidaBaseEnAyuno : this.medidaBaseLuegoDeAlimentarse;
      }
    }

    if (this.opcionMenu === 'luegoDeAlimentarse') {
      if (this.medidaActual <= this.medidaCambioLuegoDeAlimentarse) {
        this.imageFade4 = true;
        this.imageFade3 = false;
      } else {
        this.imageFade4 = false;
        this.imageFade3 = true;
      }
    }

    if (this.medidaActual === this.medidaBase) {
      this.imageFade1 = true;
      this.imageFade2 = false;
      this.imageFade3 = true;
      this.imageFade4 = true;
      setTimeout(() => {
        this.playAudio(this.audioWin);
        this.popupResultadoCorrecto = true;
        this.mensajePopupResultado =
          'Lograste estabilizar los niveles de glucosa';
        this.popupResultadoVisible = true;
        
        this.confetti();
      }, 1000);
    }
  }

  restart() {
    this.vidasRestantes = this.vidasBase;
    this.manejoDeOpciones.forEach((o) => {
      o.correct = false;
      o.disabled = false;
    });

    this.medidaActual = this.opcionMenu === 'enAyuno' ? this.medidaBaseEnAyuno : this.medidaBaseLuegoDeAlimentarse;
  }

  disableOption(lineaDeOpciones: number) {
    this.manejoDeOpciones[lineaDeOpciones].disabled = true;
  }
}
