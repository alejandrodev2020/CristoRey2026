import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  // Método para obtener la ubicación actual
  getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position), // Si obtiene la posición
          error => reject(error)          // Si ocurre un error
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }
}
