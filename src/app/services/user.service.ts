import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getLocalUser() {
    const user = localStorage.getItem('aprendeVetUser');
    return user ? JSON.parse(user) : null;
  }

  setLocalUser(user: any) {
    localStorage.setItem('aprendeVetUser', JSON.stringify(user));
  }

  clearLocalUser() {
    localStorage.removeItem('aprendeVetUser');
  }
}