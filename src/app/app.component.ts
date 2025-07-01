import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  expandPrimero: boolean = false;
  expandSegundo: boolean = false;
  expandTercero: boolean = false;
  expandCuarto: boolean = false;
  expandQuinto: boolean = false;

  catedrasPrimero: string[] = ['Cátedra 1', 'Cátedra 2', 'Cátedra 3'];
  catedrasSegundo: string[] = ['Cátedra 1', 'Cátedra 2', 'Cátedra 3'];

  private router = inject(Router);

  sidebarVisible: boolean = false;

  closeCallback(): void {
    this.sidebarVisible = false;
    this.expandPrimero = false;
    this.expandSegundo = false;
    this.expandTercero = false;
    this.expandCuarto = false;
    this.expandQuinto = false;
  }

  ngOnInit() {}

  //este componente seguramente sea el padre de todo y en el destroy de aca tenga que eliminar el token del localStorage
}
