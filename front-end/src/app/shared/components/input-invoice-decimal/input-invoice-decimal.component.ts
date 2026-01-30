import { Component, NgZone, ChangeDetectorRef, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'input-invoice-decimal',
  templateUrl: './input-invoice-decimal.component.html',
  styleUrls: ['./input-invoice-decimal.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputInvoiceDecimalComponent,
      multi: true
    }
  ]
})

/**
 * @example
*
*         <input-invoice-decimal
            [icon]="icon"
            [label]="label"
            [formControl]="control('mainAmount')"
            (keyup)="onKeyUp($event)" >
        </input-invoice-decimal>
 */


export class InputInvoiceDecimalComponent implements ControlValueAccessor {
  @Output() keyUpEvent = new EventEmitter<string>();
  @Output() buttonClick = new EventEmitter<void>();

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
  numberDecimal: number = 2;
  label2: string = '';
  icon: string = '';
  image: string|null = null;
  active: boolean = false;
  justifyContent: string | null = null;

  @Input() formControl: FormControl;

  private innerValue: string = '';

  // Implementación del ControlValueAccessor
  get value(): string {
    return this.innerValue;
  }

  set value(val: string) {
    this.innerValue = val;
    this.onChange(val);
    this.onTouched();
  }

  @Input('label')
  set itemLabel(val: string | null) {
      this.label = val;
  }

  @Input('icon')
  set itemIcon(val: string) {
      this.icon = val;
  }

  @Input('image')
  set itemImage(val: string) {
      this.image = val;
  }

  @Input('active')
  set item2(val: any) {
      this.active = val;
  }

  @Input('justifyContent')
  set item3(val: any) {
      this.justifyContent = val;
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onKeyUp(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.keyUpEvent.emit(value); // Emitir el valor al componente padre
    this.value = value; // Actualiza el valor
  }

  onInputChange(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value;
    const validatedValue: string = this.validateDecimal(inputValue, this.numberDecimal);
    (event.target as HTMLInputElement).value = validatedValue;
    this.value = validatedValue; // Actualiza el valor
  }


  handleClick() {
      this.buttonClick.emit();
  }

  private validateDecimal(value: string, decimalPlaces: number): string {
    const numericValue: string = value.replace(/[^\d.]/g, '');
    const parts = numericValue.split('.');
    if (parts.length > 1) {
      parts[1] = parts[1].slice(0, decimalPlaces);
    }
    return parts.join('.');
  }

  constructor(private changeDetector: ChangeDetectorRef, private ngZone: NgZone) {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      this.recognition = new SpeechRecognitionAPI();
      this.recognition.lang = 'es-ES'; // Ajusta el idioma según sea necesario
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const result = event.results[event.resultIndex][0].transcript;
        const numericValue = this.convertToNumber(result);
        this.ngZone.run(() => {
          this.transcribedText += numericValue; // Agrega el resultado al texto transcrito
          this.value = this.transcribedText; // Establece el valor en el formulario
        });
        this.changeDetector.detectChanges(); // Fuerza la detección de cambios
      };

      this.recognition.onend = () => {
        this.ngZone.run(() => {
          this.isRecording = false;
        });
        this.changeDetector.detectChanges(); // Fuerza la detección de cambios
      };
    } else {
      console.error('SpeechRecognition not supported in this browser.');
    }
  }

  private convertToNumber(value: string): string {
    value = value.replace(/punto/gi, '.');
    const filteredValue = value.replace(/[^0-9.]/g, '');
    return filteredValue.trim();
  }

  startRecording() {
    if (this.recognition) {
      this.ngZone.run(() => {
        this.isRecording = true;
        this.transcribedText = ''; // Reinicia el texto transcrito
      });
      this.recognition.start(); // Comienza la grabación
      this.changeDetector.detectChanges(); // Fuerza la detección de cambios
    }
  }

  stopRecording() {
    if (this.recognition) {
      this.ngZone.run(() => {
        this.isRecording = false;
      });

      setTimeout(() => {
        this.recognition.stop(); // Detiene la grabación después de 1 segundo
        this.changeDetector.detectChanges(); // Fuerza la detección de cambios
      }, 1000); // 1000 milisegundos = 1 segundo
    }
  }
}
