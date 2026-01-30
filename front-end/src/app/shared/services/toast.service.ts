import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}
  action = 'Cerrar';
  show(message: string, duration: number = 3000) {
    // const className = this.getClassName(type);
    this.snackBar.open(message, this.action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      // panelClass: [className] // Aplica la clase CSS personalizada
    });
  }
}