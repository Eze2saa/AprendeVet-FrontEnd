import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  
  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private messageService: MessageService
  ) {}

  loginForm: any;
  registroForm: any;

  showDialog: boolean = true;
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
      password: ['', [Validators.required, Validators.minLength(6), this.camposIguales('password', 'rePassword')]],
      rePassword: ['', [Validators.required, Validators.minLength(6), this.camposIguales('password', 'rePassword')]],
      codigoRegistro: ['', [Validators.required]]
    });
    // , 
    // {
    //   validators: [this.camposIguales('password', 'rePassword')]
    // });
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

  ngOnDestroy(): void {
    document.body.classList.remove('home');
  }

  login(){
    this.backendService.login(this.loginForm.value)
      .subscribe((response) => this.handleResponse('Login', response));
  }

  registrar(){
    this.backendService.registro({...this.registroForm.value, isAdmin: false })
      .subscribe((response) => this.handleResponse('Registro', response));
  }

  handleResponse(metodo: string, response: any){
    console.log('response del método ', metodo, ' ', response);
    if(typeof response == 'string'){
      this.messageService.add({ severity: 'error', summary: 'Error en el registro', detail: response, key: 'bc', sticky: true });
    }
    else{
      this.messageService.add({ severity: 'success', summary: `${metodo} correcto`, detail: `El ${metodo.toLocaleLowerCase()} se realizó correctamente`, key: 'bc', life: 3000 });
    }
  }
}
