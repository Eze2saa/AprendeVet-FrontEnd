import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAgentService {

  ingresoDesdeDispositivoMovil(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipad|ipod|blackberry|windows phone|opera mini|iemobile|webos|kindle/.test(userAgent);
  }

}