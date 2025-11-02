import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //crear environment y meter la url ahi
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

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