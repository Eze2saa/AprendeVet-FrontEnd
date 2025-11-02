import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { InsigniasResponse, InsigniasUsuarioGlucemia } from '../models/insignias-usuario-glucemia.model';

@Injectable({
  providedIn: 'root'
})
export class InsigniasService {
  //crear environment y meter la url ahi
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  guardarInsignias(userId: string, insignias: InsigniasUsuarioGlucemia): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuario/${userId}/guardarInsigniasGlucemia`, insignias);
  }

  obtenerInsignias(userId: string): Observable<InsigniasResponse> {
    return this.http.get<InsigniasResponse>(`${this.baseUrl}/usuario/${userId}/obtenerInsigniasGlucemia`);
  }
}