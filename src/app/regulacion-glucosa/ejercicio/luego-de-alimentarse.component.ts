import {
  animate,
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
  viewChild
} from '@angular/core';

@Component({
  selector: 'luego-de-alimentarse',
  templateUrl: './luego-de-alimentarse.component.html',
  styleUrl: './luego-de-alimentarse.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),

    trigger('fadeIn2', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),

    trigger('fadeIn2', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false => true', animate('0.5s ease-in')),
      transition('true => false', animate('0.5s ease-out')),
    ]),

    trigger('imageFade', [
      state('true', style({ opacity: 0 })),
      state('false', style({ opacity: 1 })),
      transition('true => false', animate('1s ease-in')),
      transition('false => true', animate('1s ease-out')),
    ]),
  ],
})
export class LuegoDeAlimentarseComponent implements OnInit, AfterViewInit {
  ejercicioEnProgreso: boolean = false;

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
  disabledGlucogenesisHigado: boolean = false;
  disabledGlucogenolosisHigado: boolean = false;
  disabledGluconeogenesis: boolean = false;
  disabledGlucolisis: boolean = false;
  disabledBetaOxidacion: boolean = false;
  disabledSintesisAcidosGrasos: boolean = false;
  disabledGlucogenesisMusculo: boolean = false;
  disabledGlucogenolosisMusculo: boolean = false;
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
    console.log(opcionSeleccionada);
    if(this.opcionMenu === opcionSeleccionada){
      return;
    }

    //Si estamos en introduccion o estamos en un ejercicio que no está en progreso, avanzar al ejercicio seleccionado
    if(this.opcionMenu === 'introduccion' || !this.ejercicioEnProgreso){
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

  dialogSalirVisible: boolean = false;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.initializeResizeObserver();
    // this.comenzarEjercicio();
  }

  ngAfterViewInit(): void {
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

  comenzarEjercicio() {
    this.opcionMenuOutput.emit('valor de aaa: ' + this.aaa);

    this.generalDisableOption = true;

    this.ejercicioEnProgreso = true;
    this.descripcionEjercicio1 =
      'A continuación se muestran cinco pares de caminos metabólicos recíprocos';
    this.descripcionEjercicio2 =
      '¿Cuáles son relevantes aquí y qué lado de las opciones ayudaría a restaurar los niveles de glucosa a un nivel normal?';

    if (this.opcionMenu === 'enAyuno') {
      this.titulo = 'En Ayuno';

      this.opcionesCorrectas = [
        'glucogenolosisHigado',
        'gluconeogenesis',
        'betaOxidacion',
        'lipolisis',
      ];

      this.direccionEstabilizacion = 1;

      this.estado = 'Hipoglucemia';
    } else {
      this.titulo = 'Luego de Alimentarse';

      this.opcionesCorrectas = [
        'glucogenesisHigado',
        'glucolisis',
        'sintesisAcidosGrasos',
        'glucogenesisMusculo',
      ];

      this.direccionEstabilizacion = -1;

      this.estado = 'Hiperglucemia';
      this.mensajeAlerta = 'Ocurrirán daños si la hiperglucemia continua.';
      this.mensajeEstado =
        'Si los niveles de glucosa exceden el límite renal, esta será desperdiciada en la orina.';
    }

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

    if(this.opcionMenuTentativa){
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
    } else {
      if (this.medidaActual === 10) {
        return;
      }

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
    this.disabledGlucogenesisHigado = false;
    this.disabledGlucogenolosisHigado = false;
    this.disabledGluconeogenesis = false;
    this.disabledGlucolisis = false;
    this.disabledBetaOxidacion = false;
    this.disabledSintesisAcidosGrasos = false;
    this.disabledGlucogenesisMusculo = false;
    this.disabledGlucogenolosisMusculo = false;
    this.disabledLipolisis = false;
    this.disabledLipogenesis = false;

    switch (option) {
      case 'glucogenesisHigado':
        this.disabledGlucogenesisHigado = true;
        break;
      case 'glucogenolosisHigado':
        this.disabledGlucogenolosisHigado = true;
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
      case 'glucogenesisMusculo':
        this.disabledGlucogenesisMusculo = true;
        break;
      case 'glucogenolosisMusculo':
        this.disabledGlucogenolosisMusculo = true;
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
