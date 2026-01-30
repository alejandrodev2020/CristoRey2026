import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // 401: Unauthorized - Acceso denegado
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Acceso denegado! Usted no cuenta con los permisos nesesarios!',
          }).then(() => {
            // Aquí puedes navegar después de que el alert se cierre
            // Sin recargar la página, solo se redirige.
            // this.router.navigate(['/']);
          });
        }
        
        if (error.status === 403) {
          // 403: Forbidden - Token inválido o no autorizado
          // localStorage.removeItem('token'); // Elimina el token
          Swal.fire({
            icon: 'error',
            title: 'Acceso prohibido',
            text: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
          }).then(() => {
            // Aquí puedes redirigir después de que el alerta se cierre
            this.router.navigate(['/auth']);
          });
        }
        
        return throwError(error);
      })
    );
  }
}
