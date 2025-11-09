import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { InsigniasResponse, InsigniasUsuarioGlucemia } from '../models/insignias-usuario-glucemia.model';

@Injectable({
  providedIn: 'root'
})
export class InsigniasService {
  //crear environment y meter la url ahi
  private readonly apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  guardarInsignias(userId: string, insignias: InsigniasUsuarioGlucemia): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/usuario/${userId}/guardarInsigniasGlucemia`, insignias);
  }

  obtenerInsignias(userId: string): Observable<InsigniasResponse> {
    return this.http.get<InsigniasResponse>(`${this.apiBaseUrl}/usuario/${userId}/obtenerInsigniasGlucemia`);
  }
}