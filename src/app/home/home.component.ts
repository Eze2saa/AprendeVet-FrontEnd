import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router : Router
  ) {}

  cardSelected: boolean = false;

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

  showDialog: boolean = false;
  isLoginDialog: boolean = true;
  showPassword: boolean = false;
  
  ngOnInit(): void {
    document.body.classList.add('home');
    
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
    this.authService.validarToken()
      .subscribe((valid) => {
        if(valid){
          if(ejercicio === 'regulacionGlucosa'){
            this.router.navigateByUrl('/regulacion-glucosa');
          }
          else{
            //navegar a ocularVet
            this.showDialog = true;
          }
        }
        else{
          this.showDialog = true;
        }
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
      .subscribe((response) => {
        this.handleResponse('Login', response);
        if(response.ok){
          this.router.navigateByUrl('/regulacion-glucosa');
        };
      });
  }

  registrar(){
    this.loading = true;
    this.authService.registro({...this.registroForm.value, isAdmin: false })
      .subscribe((response) => this.handleResponse('Registro', response));
  }

  handleResponse(metodo: string, response: any){
    if(!response || typeof response == 'string'){
      this.messageService.add({ severity: 'error', summary: `Error en el ${metodo.toLocaleLowerCase()}`, detail: response, key: 'bc', sticky: true });
    }
    else{
      this.messageService.add({ severity: 'success', summary: `${metodo} correcto`, detail: `El ${metodo.toLocaleLowerCase()} se realizó correctamente`, key: 'bc', life: 3000 });
      this.showDialog = false;
    }
    
    this.loading = false;
  }

  onDialogClose(){
    if(this.isLoginDialog){
      this.showDialog = false;
      this.showPassword = false;
    }
    else{
      this.isLoginDialog = true;
    }
  }
}
