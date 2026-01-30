import { Component, NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'input-voice-recorder',
  templateUrl: './input-voice-recorder.component.html',
  styleUrls: ['./input-voice-recorder.component.scss']
})
export class InputVoiceRecorderComponent {
  isRecording = false;
  transcribedText = '';
  label = '';
  private recognition: SpeechRecognition | null = null;
  @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
  controls: string = 'discount'; 
  controlValue: string = ''; 
  nameInput: string = ''; 
  placeholderValue = '';
  numberDecimal:number =2;
  label2:string ='';
  icon:string ='';


  @Input() formControl: FormControl;

  @Input()
  set type(value: string) {
    this.controls = value;
  }

  @Input()
  set type1(value: string) {
    this.controlValue = value;
  }

  @Input()
  set name(value: string) {
    this.nameInput = value;
  }

  @Input()
  set placeholder(value: string) {
    this.placeholderValue = value;
  }

  @Input('numberDecimal')
  set prop001(value: string) {
    this.numberDecimal = parseFloat(value);
  }

  @Input('label')
  set prop002(value: string) {
    this.label = value;
  }

  @Input('icon')
  set prop003(value: string) {
    this.icon = value;
  }

  onEnter(): void {
    this.enterPressed.emit();
  }

  control(key: string): FormControl {
     return null;
  }

  onInputChange(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value;
    const validatedValue: string = this.validateDecimal(inputValue, this.numberDecimal);
    (event.target as HTMLInputElement).value = validatedValue;
    this.valueChanged.emit(inputValue);
  }

  private validateDecimal(value: string, decimalPlaces: number): string {
    const numericValue: string = value.replace(/[^\d.]/g, '');
    const parts = numericValue.split('.');
    if (parts.length > 1) {
      parts[1] = parts[1].slice(0, decimalPlaces);
    }
    return parts.join('.');
  }

  cleanSearch(){
  }

  constructor(private changeDetector: ChangeDetectorRef, private ngZone: NgZone) {    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      this.recognition = new SpeechRecognitionAPI();
      this.recognition.lang = 'es-ES'; // Ajusta el idioma según sea necesario
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const result = event.results[event.resultIndex][0].transcript;
        this.ngZone.run(() => {
          this.transcribedText += result + ' '; // Agrega el resultado al texto transcrito
        });
        this.changeDetector.detectChanges(); // Fuerza la detección de cambios
      };

      this.recognition.onend = () => {
        this.ngZone.run(() => {
          this.isRecording = false;
          this.label = 'DETENIDO'; // Cambia el label al detener la grabación
        });
        this.changeDetector.detectChanges(); // Fuerza la detección de cambios
      };
    } else {
      console.error('SpeechRecognition not supported in this browser.');
    }
  }

  startRecording() {
    if (this.recognition) {
      this.ngZone.run(() => {
        this.isRecording = true;
        this.transcribedText = ''; // Reinicia el texto transcrito
        this.label = 'GRABANDO'; // Cambia el label al iniciar la grabación
      });
      this.recognition.start(); // Comienza la grabación
      this.changeDetector.detectChanges(); // Fuerza la detección de cambios
    }
  }

  stopRecording() {
    if (this.recognition) {
      // Actualizamos isRecording y mostramos el valor en pantalla
      this.ngZone.run(() => {
        this.isRecording = false;
        this.label = 'DETENIDO'; // Cambia el label cuando se detiene la grabación
      });

      // Agregamos un retraso de 1 segundo antes de detener la grabación
      setTimeout(() => {
        this.recognition.stop(); // Detiene la grabación después de 1 segundo
        this.changeDetector.detectChanges(); // Fuerza la detección de cambios
      }, 1000); // 1000 milisegundos = 1 segundo
    }
  }
}
