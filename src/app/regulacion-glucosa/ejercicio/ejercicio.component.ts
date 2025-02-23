import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
  viewChild,
} from '@angular/core';

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

    // trigger('fadeIn2', [
    //   transition(':enter', [
    //     style({ opacity: 0 }),
    //     animate('0.5s ease-in', style({ opacity: 1 })),
    //   ]),
    // ]),

    // trigger('fadeIn2', [
    //   state('true', style({ opacity: 1 })),
    //   state('false', style({ opacity: 0 })),
    //   transition('false => true', animate('0.5s ease-in')),
    //   transition('true => false', animate('0.5s ease-out')),
    // ]),

    trigger('imageFade', [
      state('true', style({ opacity: 0 })),
      state('false', style({ opacity: 1 })),
      transition('true => false', animate('1s ease-in')),
      transition('false => true', animate('1s ease-out')),
    ]),

    trigger('popupFade', [
      state('true', style({ opacity: 0 })),
      state('false', style({ opacity: 1 })),
      transition('false => true', animate('1s ease-out')),
    ]),

    trigger('shrinkFade', [
      state(
        'false',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      state(
        'true',
        style({
          opacity: 0,
          transform: 'scale(0.5)',
        })
      ),
      transition('false => true', [animate('1s ease-out')]),
    ]),

    trigger('textAnimation', [
      transition(':enter', [
        query('span', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(100, [
            animate('1.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])

, 

// Animación para la opción correcta
trigger('correctaAnimacion', [
  state('normal', style({ transform: 'scale(1)', backgroundColor: '#ffffff' })),
  state('correcta', style({ transform: 'scale(1.5) rotate(360deg)', backgroundColor: '#00ff00', color: '#000' })),
  transition('normal => correcta', [
    animate('800ms ease-out', keyframes([
      style({ transform: 'scale(1.2)', offset: 0.2 }),
      style({ transform: 'scale(1.4) rotate(180deg)', offset: 0.5 }),
      style({ transform: 'scale(1.5) rotate(360deg)', backgroundColor: '#00ff00', offset: 1 }),
    ]))
  ]),
]),

// Animación para la opción incorrecta (sacudida)
trigger('incorrectaAnimacion', [
  state('normal', style({ transform: 'scale(1)', backgroundColor: '#ffffff' })),
  state('incorrecta', style({ transform: 'scale(1.1)', backgroundColor: '#ff0000', color: '#fff' })),
  transition('normal => incorrecta', [
    animate('500ms ease-in-out', keyframes([
      style({ transform: 'translateX(-10px)', offset: 0.1 }),
      style({ transform: 'translateX(10px)', offset: 0.2 }),
      style({ transform: 'translateX(-10px)', offset: 0.3 }),
      style({ transform: 'translateX(10px)', offset: 0.4 }),
      style({ transform: 'translateX(-10px)', offset: 0.5 }),
      style({ transform: 'translateX(10px)', offset: 0.6 }),
      style({ transform: 'translateX(-10px)', offset: 0.7 }),
      style({ transform: 'translateX(10px)', offset: 0.8 }),
      style({ transform: 'translateX(0px)', offset: 1 })
    ]))
  ]),
])


  ],
})
export class EjercicioComponent implements OnInit, AfterViewInit {

  opciones = ['Opción A', 'Opción B', 'Opción C'];
  correcta = 'Opción B'; // Definir la opción correcta
  estados: { [key: string]: string } = {}; // Guardar estado de cada opción

  seleccionar(opcion: string, event: MouseEvent) {
    if (opcion === this.correcta) {
      this.estados[opcion] = 'correcta';
      this.reproducirSonido('correcto');
      this.explosionParticulas(event.clientX, event.clientY);
    } else {
      this.estados[opcion] = 'incorrecta';
      this.reproducirSonido('incorrecto');
    }
  }

  reproducirSonido(tipo: 'correcto' | 'incorrecto') {
    const audio = new Audio(`sonidos/${tipo}.mp3`);
    audio.play();
  }

  explosionParticulas(x: number, y: number) {
    for (let i = 0; i < 15; i++) {
      const particula = this.renderer.createElement('div');
      this.renderer.addClass(particula, 'particula');

      // Posición inicial de la explosión
      this.renderer.setStyle(particula, 'left', `${x}px`);
      this.renderer.setStyle(particula, 'top', `${y}px`);

      document.body.appendChild(particula);

      // Animación con valores aleatorios para cada partícula
      setTimeout(() => {
        this.renderer.setStyle(particula, 'transform', `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0)`);
        this.renderer.setStyle(particula, 'opacity', '0');
      }, 10);

      // Eliminar la partícula después de la animación
      setTimeout(() => {
        this.renderer.removeChild(document.body, particula);
      }, 800);
    }
  }








  ejercicioEnProgreso: boolean = false;

  ///////////////////
  fadeMensajeFlotante: boolean = false;
  displayMensajeFlotante: boolean = false;
  //////////////////

  // View child signals
  imagen1 = viewChild<ElementRef>('imagen1');
  imagen2 = viewChild<ElementRef>('imagen2');
  imagen3 = viewChild<ElementRef>('imagen3');
  imagen4 = viewChild<ElementRef>('imagen4');
  contenedorBarraImagen = viewChild<ElementRef>('contenedorBarraImagen');
  barraLateralMedicion = viewChild<ElementRef>('barraLateralMedicion');

  //Escala y medida
  escalaMedidas: number[] = [
    10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1,
    0.5, 0,
  ];

  //Animaciones
  imageFade1: boolean = true;
  imageFade2: boolean = false;
  imageFade3: boolean = true;
  imageFade4: boolean = true;

  //Opciones
  generalDisableOption: boolean = false;
  disabledGlucogenogenesisHigado: boolean = false;
  disabledGlucogenolisisHigado: boolean = false;
  disabledGluconeogenesis: boolean = false;
  disabledGlucolisis: boolean = false;
  disabledBetaOxidacion: boolean = false;
  disabledSintesisAcidosGrasos: boolean = false;
  disabledGlucogenogenesisMusculo: boolean = false;
  disabledGlucogenolisisMusculo: boolean = false;
  disabledLipolisis: boolean = false;
  disabledLipogenesis: boolean = false;

  opcionesCorrectas: string[] = [];
  previousSelectedOption: string = '';

  //@Inputs definidos como señal
  valorPrevioEnAyuno: boolean | null = null;
  valorPrevioLuegoDeAlimentarse: boolean | null = null;

  opcionMenu: string = 'introduccion';
  opcionMenuTentativa: string = '';
  @Input() aaa: string = '';

  @Input()
  set opcionMenuSeleccionada(opcionSeleccionada: string) {
    if (this.opcionMenu === opcionSeleccionada) {
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
    this.dialogSalirVisible = true;
  }

  @Output() opcionMenuOutput = new EventEmitter<string>();

  medidaActual: number = 5;
  //1 indica que hay que incrementar para estabilizar, -1 lo opuesto
  direccionEstabilizacion: number = 0;

  private resizeObserver!: ResizeObserver;

  //Mensajes
  titulo: string = 'Niveles normales de Glucosa';
  descripcionEjercicio1: string = `En la imagen se ilustra sangre atravesando un capilar sanguineo, indicando el nivel de glucosa en la misma mediante la cantidad de cubos blancos visibles.`;
  descripcionEjercicio2: string = `Se define un nivel de estabilidad inicial y objetivo de 5mg/dl.`;
  descripcionEjercicio3: string = `Una vez elegida la modalidad del ejercicio, tu objetivo va a ser llevar el nivel de glucosa en sangre nuevamente a este valor, mediante la elección correcta de los procesos que colaboren a la estabilización, acorde a la situación del animal.`;
  estado: string = 'Normal'; //Hiperglucemia, estable, hipoglucemia
  mensajeAlerta: string = ''; //Mensaje en rojo si hay algo mal para describir el peligro
  mensajeEstado: string = ''; //Mensaje informativo inicial del ejercicio sobre el estado o después de haber elegido una respuesta

  //Popups
  dialogResultadoCorrecto: boolean = true;
  dialogResultadoVisible: boolean = false;
  showButtonsDialogResultado: boolean = false;
  mensajeDialogResultado: string = ''; //"Lograste estabilizar los niveles de glucosa" "No lograste estabilizar los niveles de glucosa" para ejercicio
  dialogResultadoFade: boolean = false;

  dialogSalirVisible: boolean = false;
  dialogPreEjercicioVisible: boolean = false;

  //Animaciones iconos
  switchBunnyIcon: boolean = false;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  ngOnInit(): void {
    // this.comenzarEjercicio();
  }

  ngAfterViewInit(): void {
    // this.comenzarEjercicio();
    //Produce overflow => tengo que resolverlo si quiero usarlo
    // this.contenedorBarraImagen()!.nativeElement.style.transform = `translateX(-${this.barraLateralMedicion()!.nativeElement.offsetWidth / 2}px)`;
  }

  private initializeResizeObserver(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      this.ngZone.run(() => {
        for (const entry of entries) {
          if (entry.target === this.imagen2()?.nativeElement) {
            //Así con cada imagen que necesite
            if (this.imagen1()) {
              this.imagen1()!.nativeElement.style.transform = `translateX(-${entry.contentRect.width}px)`;
            }
            if (this.imagen3()) {
              this.imagen3()!.nativeElement.style.transform = `translateX(-${entry.contentRect.width}px)`;
            }
            if (this.imagen4()) {
              this.imagen4()!.nativeElement.style.transform = `translateX(-${entry.contentRect.width}px)`;
            }
          }
        }
      });
    });

    this.resizeObserver.observe(this.imagen2()?.nativeElement);
  }

  hormonaSeleccionada(hormona: string) {
    this.dialogResultadoFade = false;
    if (this.opcionMenu === 'enAyuno') {
      if (hormona !== 'insulina') {
        //abrir popup de correcto! por un tiempo y después cerrar ambos para comenzar el ejercicio
        this.dialogResultadoCorrecto = true;
        this.mensajeDialogResultado =
          'Esa hormona va a colaborar en la estabilización';
      } else {
        //abrir popup de error y llevarlo al comienzo de la pantalla donde estaba
        this.dialogResultadoCorrecto = false;
        this.mensajeDialogResultado =
          'Esa hormona no va a colaborar en la estabilización';
      }
    } else {
      if (hormona === 'insulina') {
        //abrir popup de correcto! por un tiempo y después cerrar ambos para comenzar el ejercicio
        this.dialogResultadoCorrecto = true;
        this.mensajeDialogResultado =
          'La insulina es la que va a colaborar en la estabilización';
      } else {
        //abrir popup de error y llevarlo al comienzo de la pantalla donde estabas
        this.dialogResultadoCorrecto = false;
        this.mensajeDialogResultado =
          'Esa hormona no va a colaborar en la estabilización';
      }
    }

    this.dialogPreEjercicioVisible = false;
    this.dialogResultadoVisible = true;
    this.showButtonsDialogResultado = false;

    if (this.dialogResultadoCorrecto) {
      setTimeout(() => {
        this.dialogResultadoFade = true;
      }, 1500);
      setTimeout(() => {
        this.dialogResultadoVisible = false;
        this.displayMensajeFlotante = true;
      }, 2000);
      setTimeout(() => {
        this.fadeMensajeFlotante = true;
      }, 3000);
      setTimeout(() => {
        this.displayMensajeFlotante = false;
        this.fadeMensajeFlotante = false;
        this.comenzarEjercicio();
      }, 4000);

      //En vez de esto, hacer un popup que explique que van a tener tres vidas y eso
      //bosquejar todo hasta que funcione y dejar los detalles para lo ultimo
      //hacer el diseño, las pantallas y popups para representar el flujo y después hacerlo funcional
      //una vez que todo el funcionamiento este listo, recién ahi puedo ocuparme de los detalles y de
      //que quede lindo con la cabeza 100% en eso, de otra manera estoy pensando siempre en las dos
      //cosas a la vez
    } else {
      this.showButtonsDialogResultado = true;
    }
  }

  comenzarEjercicio() {
    this.initializeResizeObserver();

    this.generalDisableOption = true;

    this.ejercicioEnProgreso = true;
    this.descripcionEjercicio1 =
      'A continuación se muestran cinco pares de caminos metabólicos recíprocos.';
    this.descripcionEjercicio2 =
      '¿Cuáles son relevantes aquí y qué lado de las opciones ayudaría a restaurar los niveles de glucosa a un nivel normal?';

    if (this.opcionMenu === 'enAyuno') {
      this.titulo = 'En Ayuno';

      this.opcionesCorrectas = [
        'glucogenolisisHigado',
        'gluconeogenesis',
        'betaOxidacion',
        'lipolisis',
      ];

      this.direccionEstabilizacion = 1;

      this.estado = 'Hipoglucemia';
      this.mensajeAlerta =
        'Tu paciente se encuentra desorientado y somnoliento';
      // this.mensajeEstado = 'Se necesita tomar acción rápido.';

      setTimeout(() => {
        this.imageFade2 = true;
        this.imageFade1 = false;
      }, 500);

      const intervalo = setInterval(() => {
        this.medidaActual += -0.5 * this.direccionEstabilizacion;
      }, 500);

      setTimeout(() => {
        clearInterval(intervalo);
        this.generalDisableOption = false;
      }, 3000);
    } else {
      this.titulo = 'Luego de Alimentarse';

      this.opcionesCorrectas = [
        'glucogenogenesisHigado',
        'glucolisis',
        'sintesisAcidosGrasos',
        'glucogenogenesisMusculo',
      ];

      this.direccionEstabilizacion = -1;

      this.estado = 'Hiperglucemia';
      this.mensajeAlerta = 'Ocurrirán daños si la hiperglucemia continua';
      // this.mensajeEstado =
      //   'Si los niveles de glucosa exceden el límite renal, esta será desperdiciada en la orina.';

      setTimeout(() => {
        this.imageFade2 = true;
        this.imageFade3 = false;
      }, 500);
      setTimeout(() => {
        this.imageFade3 = true;
        this.imageFade4 = false;
      }, 3000);

      const intervalo = setInterval(() => {
        this.medidaActual += -0.5 * this.direccionEstabilizacion;
      }, 500);

      setTimeout(() => {
        clearInterval(intervalo);
        this.generalDisableOption = false;
      }, 5000);
    }
  }

  resetearEjercicio() {
    this.ejercicioEnProgreso = false;
    this.opcionesCorrectas = [];
    this.previousSelectedOption = '';
    this.medidaActual = 5;
    this.direccionEstabilizacion = 0;
    this.titulo = 'Niveles normales de Glucosa';
    this.descripcionEjercicio1 = `En la imagen se ilustra sangre atravesando un capilar sanguineo, indicando el nivel de glucosa en la misma mediante la cantidad de cubos blancos visibles.`;
    this.descripcionEjercicio2 = `Se define un nivel de estabilidad inicial y objetivo de 5mg/dl.`;
    this.descripcionEjercicio3 = `Una vez elegida la modalidad del ejercicio, tu objetivo va a ser llevar el nivel de glucosa en sangre nuevamente a este valor, mediante la elección correcta de los procesos que colaboren a la estabilización, acorde a la situación del animal.`;
    this.estado = 'Normal';
    this.mensajeAlerta = '';
    this.mensajeEstado = '';
    this.imageFade1 = true;
    this.imageFade2 = false;
    this.imageFade3 = true;
    this.imageFade4 = true;

    if (this.opcionMenuTentativa) {
      this.opcionMenuOutput.emit(this.opcionMenuTentativa);
      this.opcionMenu = this.opcionMenuTentativa;
      this.opcionMenuTentativa = '';
    }
  }

  activar: boolean = false; //???????????

  respuestaSeleccionada(respuesta: string) {
    if (this.previousSelectedOption === respuesta) {
      return;
    }
    this.previousSelectedOption = respuesta;
    this.activar = true; //???????????
    // this.activar = false;//???????????
    setTimeout(() => this.disableOption(respuesta), 35);

    if (this.opcionesCorrectas.includes(respuesta)) {
      this.medidaActual += 0.5 * this.direccionEstabilizacion;
      this.mensajeEstado =
        'Bien! Ese proceso va a colaborar en la estabilización.';
    } else {
      if (this.medidaActual === 10) {
        return;
      }

      this.mensajeEstado =
        'Pensalo mejor, esa respuesta no colabora con la situación actual.';

      this.medidaActual += 0.5 * -this.direccionEstabilizacion;

      if (this.medidaActual === 0) {
        this.dialogResultadoCorrecto = false;
        this.dialogResultadoVisible = true;
      }
    }

    if (this.direccionEstabilizacion === -1) {
      if (this.medidaActual <= 7.5) {
        this.imageFade4 = true;
        this.imageFade3 = false;
      } else {
        this.imageFade4 = false;
        this.imageFade3 = true;
      }
    }

    if (this.medidaActual === 5) {
      this.imageFade1 = true;
      this.imageFade2 = false;
      this.imageFade3 = true;
      this.imageFade4 = true;
      setTimeout(() => {
        this.dialogResultadoCorrecto = true;
        this.dialogResultadoVisible = true;
      }, 1000);
    }
  }

  disableOption(option: string) {
    this.disabledGlucogenogenesisHigado = false;
    this.disabledGlucogenolisisHigado = false;
    this.disabledGluconeogenesis = false;
    this.disabledGlucolisis = false;
    this.disabledBetaOxidacion = false;
    this.disabledSintesisAcidosGrasos = false;
    this.disabledGlucogenogenesisMusculo = false;
    this.disabledGlucogenolisisMusculo = false;
    this.disabledLipolisis = false;
    this.disabledLipogenesis = false;

    switch (option) {
      case 'glucogenogenesisHigado':
        this.disabledGlucogenogenesisHigado = true;
        break;
      case 'glucogenolisisHigado':
        this.disabledGlucogenolisisHigado = true;
        break;
      case 'gluconeogenesis':
        this.disabledGluconeogenesis = true;
        break;
      case 'glucolisis':
        this.disabledGlucolisis = true;
        break;
      case 'betaOxidacion':
        this.disabledBetaOxidacion = true;
        break;
      case 'sintesisAcidosGrasos':
        this.disabledSintesisAcidosGrasos = true;
        break;
      case 'glucogenogenesisMusculo':
        this.disabledGlucogenogenesisMusculo = true;
        break;
      case 'glucogenolisisMusculo':
        this.disabledGlucogenolisisMusculo = true;
        break;
      case 'lipolisis':
        this.disabledLipolisis = true;
        break;
      case 'lipogenesis':
        this.disabledLipogenesis = true;
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
