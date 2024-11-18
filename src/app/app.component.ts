import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { AuthService } from './auth/services/auth.service';

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

  private authService = inject(AuthService);
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

  //Evaluar si dejar esto o no, creo que no le veo utilidad la verdad
  //Está fallando después del logout
  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.Checking) {
      return true;
    }

    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.Checking:
        break;

      case AuthStatus.Authenticated:
        //Debería viajar a la última url visitada por el usuario, que se puede guardar en el guard si se lo vuelve global
        this.router.navigateByUrl('/dashboard');
        break;

      case AuthStatus.NotAuthenticated:
        this.router.navigateByUrl('/auth/login');
        break;
    }
  });
}
