import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { AuthEvent } from '../models/auth-event';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit{
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  @Output() authEvent = new EventEmitter<AuthEvent>();
  @Output() authClosing = new EventEmitter<true>();

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

  isLoginOn: boolean = true;
  showPassword: boolean = false;

  ejercicioGlucemiaSeleccionado: boolean = false;
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registroForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
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
            this.nameError = this.registroForm.get('name').hasError('required') || this.registroForm.get('name').hasError('minlength') ? true : false;
            break;
          case 'surname':
            this.surnameError = this.registroForm.get('surname').hasError('required') || this.registroForm.get('surname').hasError('minlength') ? true : false;
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

  login(){
    this.loading = true;
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          if(response && response.ok){
            this.handleResponse('Login');
          }
        },
        error: (error) => {
          this.handleResponse('Login', error.error.msg ?? 'Ocurrió un error al intentar realizar el login.');
        }
      });
  }

  registrar(){
    this.loading = true;
    this.authService.registro({...this.registroForm.value, isAdmin: false })
      .subscribe({
        next: (response) => {
          if(response && response.ok){
            this.handleResponse('Registro');
          }
        },
        error: (response) => {
          this.handleResponse('Registro', response?.error?.msg ?? 'Ocurrió un error al intentar realizar el registro.');
        }
      });
  }

  handleResponse(metodo: string, mensajeError: string | null = null){
    this.authEvent.emit({
      metodo,
      exito: !mensajeError,
      mensajeError
    });
    
    this.loading = false;
  }

  onAuthClose(){
    if(this.isLoginOn){
      this.authClosing.emit(true);
    }
    else{
      this.isLoginOn = true;
    }
  }

}
