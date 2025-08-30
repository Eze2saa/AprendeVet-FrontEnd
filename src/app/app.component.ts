import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  
  ngOnInit() {}

  //este componente seguramente sea el padre de todo y en el destroy de aca tenga que eliminar el token del localStorage
}
