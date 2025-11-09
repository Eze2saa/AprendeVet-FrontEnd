import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  user: User | null = null;

  showConfirmLogoutDialog: boolean = false;

  loginForm: any;
  registroForm: any;
  loading: boolean = false;

  //form validations
  emailLoginError: boolean = false;
  passwordLoginError: boolean = false;
  nameError: boolean = false;
  surnameError: boolean = false;
  DNIError: boolean = false;
  emailRegistroError: boolean = false;
  passwordRegistroError: boolean = false;
  rePasswordError: boolean = false;
  codigoRegistroError: boolean = false;

  showLoginRegisterDialog: boolean = false;
  isLoginDialog: boolean = true;
  showPassword: boolean = false;

  ejercicioGlucemiaSeleccionado: boolean = false;
  
  ngOnInit(): void {
    document.body.classList.add('home');

    this.authService.validarToken()
      .subscribe((valid) => {
        if(valid){
          this.user = this.userService.getLocalUser() ?? null;
        }
      });
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      DNI: ['', [Validators.required, Validators.min(1000000)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]],
      codigoRegistro: ['', [Validators.required]]
    }, 
    {
      validators: [this.camposIguales('password', 'rePassword')]
    });
  }

  iniciarEjercicio(ejercicio: string){
    this.ejercicioGlucemiaSeleccionado = ejercicio == 'regulacionGlucemia';

    if(ejercicio === 'reflejoFotopupilar'){
      this.loading = true;
      
      setTimeout(() => {
        this.loading = false;
        window.open(environment.ocularVetUrl, '_blank');
      }, 1000);
    }
    else{
      this.authService.validarToken()
        .subscribe((valid) => {
          if(valid){
            this.loading = true;

            setTimeout(() => {
              this.loading = false;
              window.open('/regulacion-glucemia', '_blank');
            }, 1000);
          }
          else{
            this.showLoginRegisterDialog = true;
          }
        });
    }
  }

  camposIguales(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (formGroup.get(campo1)?.value !== formGroup.get(campo2)?.value) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      } 

      formGroup.get(campo2)?.setErrors(null);
      return null;
    }
  }
  
  checkFormFieldValidation(campo: string, esLogin: boolean) {
    if(esLogin){
      if(this.loginForm.get(campo).dirty || this.loginForm.get(campo).touched) {
        if(campo === 'email'){
          this.emailLoginError = this.loginForm.get('email').hasError('required') || this.loginForm.get('email').hasError('email') ? true : false;
        }
        else{
          this.passwordLoginError = this.loginForm.get('password').hasError('required') ? true : false;
        }
      }
    }
    else {
      if(this.registroForm.get(campo).dirty || this.registroForm.get(campo).touched) {
        switch(campo){
          case 'name':
            this.nameError = this.registroForm.get('name').hasError('required') ? true : false;
            break;
          case 'surname':
            this.surnameError = this.registroForm.get('surname').hasError('required') ? true : false;
            break;
          case 'DNI':
            this.DNIError = this.registroForm.get('DNI').hasError('required') || this.registroForm.get('DNI').hasError('min') ? true : false;
            break;
          case 'email':
            this.emailRegistroError = this.registroForm.get('email').hasError('required') || this.registroForm.get('email').hasError('email') ? true : false;
            break;
          case 'password':
            this.passwordRegistroError = this.registroForm.get('password').hasError('required') || this.registroForm.get('password').hasError('minlength') ? true : false;
            break;
          case 'rePassword':
            this.rePasswordError = this.registroForm.get('rePassword').hasError('required') || this.registroForm.get('rePassword').hasError('noIguales') ? true : false;
            break;
          default:
            this.codigoRegistroError = this.registroForm.get('codigoRegistro').hasError('required') ? true : false;
            break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('home');
  }

  login(){
    this.loading = true;
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          if(response && response.ok){
            this.handleResponseSuccess('Login', response);
            this.resetLoginRegistro();
          }
        },
        error: (error) => {
          this.handleResponseError('Login', error.error.msg);
        }
      });
  }

  registrar(){
    this.loading = true;
    this.authService.registro({...this.registroForm.value, isAdmin: false })
      .subscribe({
        next: (response) => {
          if(response && response.ok){
            this.handleResponseSuccess('Registro', response);
            this.resetLoginRegistro();
          }
        },
        error: (error) => {
          this.handleResponseError('Registro', error.error.msg);
        }
      });
  }

  handleResponseSuccess(metodo: string, response: AuthResponse){
    this.user = {
      uid: response.uid,
      name: response.name,
      surname: response.surname,
      DNI: response.DNI,
      email: response.email,
      isAdmin: response.isAdmin
    };
    
    this.userService.setLocalUser(this.user);

    this.messageService.add(
      { 
        severity: 'success',
        summary: `${metodo} correcto`,
        detail: `El ${metodo.toLocaleLowerCase()} se realizó correctamente. ${this.ejercicioGlucemiaSeleccionado ? 'Ya podes ingresar al ejercicio.' : ''}`,
        key: 'bc',
        sticky: true
      });
    
    this.ejercicioGlucemiaSeleccionado = false;
    this.showLoginRegisterDialog = false;
    
    this.loading = false;
  }

  handleResponseError(metodo: string, mensajeError: string){
    this.messageService.add(
      {
        severity: 'error',
        summary: `Error en el ${metodo.toLocaleLowerCase()}`,
        detail: mensajeError,
        key: 'bc',
        sticky: true
      });
    
    this.loading = false;
  }

  resetLoginRegistro(){
    this.showPassword = false;
    this.isLoginDialog = true;
    this.loginForm.reset();
    this.registroForm.reset();
  }

  logout(){
    this.userService.clearLocalUser();
    this.authService.clearLocalToken();
    this.user = null;
  }

  onDialogClose(){
    if(this.isLoginDialog){
      this.showLoginRegisterDialog = false;
      this.showPassword = false;
      this.ejercicioGlucemiaSeleccionado = false;
    }
    else{
      this.isLoginDialog = true;
    }
  }
}
