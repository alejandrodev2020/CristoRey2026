import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {

  actionStyle: string = 'translateX(0)';  // Inicialmente no hay movimiento


  color: string = 'green';
  label: string = 'value';
  icon: string = 'value';
  withFull: boolean = false;
  disabled: boolean = false;
  shadow: boolean = false;

  constructor(private dialogRef: MatDialogRef<any>){

  }



  moveButtons() {
    // Mueve los botones 10px hacia abajo
    this.actionStyle = 'translateY(10px)';
  }

  moveButtonsMore() {
    // Mueve los botones 30px hacia abajo
    this.actionStyle = 'translateY(30px)';
  }

  download() {
    console.log('Iniciando descarga del APK...');
    const downloadLink = document.createElement('a');
    downloadLink.href = '/assets/apps/app_v1.0.0.apk';
    downloadLink.download = 'app_v1.0.0.apk';
    downloadLink.click();
  }

  hideModal() {
    console.log('No mostrar más');
    this.dialogRef.close();
    localStorage.removeItem('viewAlert');
    // Implementa tu lógica de "No mostrar más"
  }






}
