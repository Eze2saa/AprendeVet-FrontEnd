import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from '../../environments/environment';
import { AuthEvent } from '../models/auth-event';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserAgentService } from '../services/user-agent.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
   animations: [
      trigger('fadeIn1', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('1s ease-in', style({ opacity: 1 })),
        ]),
      ]),
      trigger('fadeIn2', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('2s ease-in', style({ opacity: 1 })),
        ]),
      ]),
    ]
})
export class HomeComponent implements OnInit, OnDestroy{
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private userAgentService: UserAgentService
  ) {}

  ingresoDesdeDispositivoMovil: boolean = false;

  user: User | null = null;

  showConfirmLogoutDialog: boolean = false;

  loading: boolean = false;

  showLoginRegisterDialog: boolean = false;

  ejercicioGlucemiaSeleccionado: boolean = false;
  
  ngOnInit(): void {
    document.body.classList.add('home');

    this.ingresoDesdeDispositivoMovil = this.userAgentService.ingresoDesdeDispositivoMovil();

    if(!this.ingresoDesdeDispositivoMovil){
      this.loading = true;
      this.authService.validarToken()
        .subscribe({
          next:(valid) => {
            this.loading = false;
            if(valid){
              this.user = this.userService.getLocalUser() ?? null;
            }
          },
          error: () => this.loading = false
        });
    }
  }

  iniciarEjercicio(ejercicio: string){
    this.loading = true;
    this.ejercicioGlucemiaSeleccionado = ejercicio == 'regulacionGlucemia';

    if(ejercicio === 'reflejoFotopupilar'){
      setTimeout(() => {
        this.loading = false;
        window.open(environment.ocularVetUrl, '_blank');
      }, 1000);
    }
    else{
      this.authService.validarToken()
        .subscribe({
          next: (valid) => {
            if(valid){
              setTimeout(() => {
                this.loading = false;
                this.router.navigate(['/regulacion-glucemia']);
              }, 1000);
            }
            else{
              this.loading = false;
              this.showLoginRegisterDialog = true;
            }
          },
          error: () => this.loading = false
        });
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('home');
  }

  onAuthEvent(event: AuthEvent){
    if(event.exito){
      this.messageService.add(
        { 
          severity: 'success',
          summary: `${event.metodo} correcto`,
          detail: `El ${event.metodo.toLocaleLowerCase()} se realizó correctamente. ${this.ejercicioGlucemiaSeleccionado ? 'Ya podes ingresar al ejercicio.' : ''}`,
          key: 'bc',
          sticky: false
        });

      this.user = this.userService.getLocalUser();
    
      this.ejercicioGlucemiaSeleccionado = false;
      this.showLoginRegisterDialog = false;
    }
    else{
      this.messageService.add(
        {
          severity: 'error',
          summary: `Error en el ${event.metodo.toLocaleLowerCase()}`,
          detail: event.mensajeError!,
          key: 'bc',
          sticky: true
        });
    }
  }

  logout(){
    this.userService.clearLocalUser();
    this.authService.clearLocalToken();
    this.user = null;
  }
}
