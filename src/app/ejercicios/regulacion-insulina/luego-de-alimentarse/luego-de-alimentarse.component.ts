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
  NgZone,
  OnInit,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'luego-de-alimentarse',
  templateUrl: './luego-de-alimentarse.component.html',
  styleUrl: './luego-de-alimentarse.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 })),
      ]),
    ]),

    trigger('imageFade', [
      state('true', style({ opacity: 0 })),
      state('false', style({ opacity: 1 })),
      transition('true => false', animate('2.5s ease-in')),
      transition('false => true', animate('2.5s ease-out')),
    ]),
  ],
})
export class LuegoDeAlimentarseComponent implements OnInit, AfterViewInit {
  constructor(
    private ngZone: NgZone
  ) {}

  // View child signals
  imagen1 = viewChild<ElementRef>('imagen1');
  imagen2 = viewChild<ElementRef>('imagen2');
  contenedorBarraImagen = viewChild<ElementRef>('contenedorBarraImagen');
  barraLateralMedicion = viewChild<ElementRef>('barraLateralMedicion');

  escalaMedidas: number[] = [
   10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5,
   5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0
  ];

  medidaActual: number = 5.5;


  fadeImage1: boolean = false;
  fadeImage2: boolean = true;

  transition() {
    if (this.fadeImage1 === false) {
      this.fadeImage1 = true;
      this.fadeImage2 = false;
    } else {
      this.fadeImage1 = false;
      this.fadeImage2 = true;
    }
  }


  private resizeObserver!: ResizeObserver;

  ngOnInit(): void {
    this.initializeResizeObserver();
  }

  ngAfterViewInit(): void {
    //Produce overflow => tengo que resolverlo
    this.contenedorBarraImagen()!.nativeElement.style.transform = `translateX(-${this.barraLateralMedicion()!.nativeElement.offsetWidth / 2}px)`;
  }

  private initializeResizeObserver(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      this.ngZone.run(() => {
        for (const entry of entries) {
          if (entry.target === this.imagen1()?.nativeElement) {
            //Así con cada imagen que necesite
            if (this.imagen2()) {
              this.imagen2()!.nativeElement.style.transform = `translateX(-${entry.contentRect.width}px)`;
            }
          }
        }
      });
    });

    this.resizeObserver.observe(this.imagen1()?.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
