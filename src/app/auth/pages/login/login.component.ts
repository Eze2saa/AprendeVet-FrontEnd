import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['Eze2sa.cuentas@gmail.com', [Validators.required, Validators.email]],
    password: ['123654789', [Validators.required, Validators.minLength(6)]]
  });

  login(){
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (result) => {
          console.log('login correcto');
          this.router.navigateByUrl('/dashboard')
        },
        error: (errorMessage) => {
          Swal.fire('Error al autenticar', errorMessage, 'error');
        }
      });
  }

}
