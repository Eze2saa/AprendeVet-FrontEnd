import { Component, computed, inject, Signal } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

  
  private authService = inject(AuthService);

  user: Signal<User | null> = computed(() => this.authService.currentUser());

  onLogout(){
    this.authService.logout();
  }
}
