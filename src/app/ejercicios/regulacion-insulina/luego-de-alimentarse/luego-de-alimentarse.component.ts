import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'luego-de-alimentarse',
  templateUrl: './luego-de-alimentarse.component.html',
  styleUrl: './luego-de-alimentarse.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ 
          opacity: 0
        }),
        animate('0.5s ease-out', style({ 
          opacity: 1
         }))
      ])
    ])
  ]
})
export class LuegoDeAlimentarseComponent implements OnInit{

  medidaActual: number = 10;

  ngOnInit() {}
  
}
