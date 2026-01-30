import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[decimalNumberMask]',
})
export class DecimalNumberDirective implements OnInit, OnDestroy {
  private _decimalControl!: AbstractControl;
  prevValue: string = '';
  @Input()
  set decimalControl(control: AbstractControl) {
    this._decimalControl = control;
  }

  /**
   * indicador de cantidad de números total con enteros y decimales
   */
  numberInt = 16;
  @Input('numberInt')
  set prop001(control: number) {
    if (control) {
      this.numberInt = control;
    }
  }
  /**
   * indicador de cantidad de números decimales
   */
  decimalNumber = 6;
  @Input('decimalNumber')
  set prop002(control: number) {
    if (control) {
      this.decimalNumber = control;
    }
  }
  isNegativeValue!:boolean;
  /**
   * indicador para aceptar números negativos
   */
  @Input('isNegativeValue')
  set prop003(value: boolean) {
      this.isNegativeValue = value;
  }

  private sub!: Subscription;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    let totalDigits = this.numberInt + this.decimalNumber;
    if (totalDigits <= 16) {
      this.numberInt =
        this.numberInt > this.decimalNumber
          ? this.numberInt - this.decimalNumber
          : this.numberInt;
    } else {
      if (this.numberInt <= 16 && this.decimalNumber <= 6) {
        this.numberInt = this.numberInt - this.decimalNumber;
      } else {
        this.numberInt = 10;
        this.decimalNumber = 6;
      }
    }

    this.prevValue = this._decimalControl.value;
    this.decimalValidate(this.isNegativeValue);
  }
  ngOnChanges(): void {}

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  decimalValidate(isNegativeValue:boolean) {
    this.sub = this._decimalControl.valueChanges.subscribe((data) => {
      const string = data;
      const regex = /[a-zA-Z]/g;
      const matches = string?.match(regex);
      if (matches?.length > 0) {
        data = data.replace(matches[0], '');
        this._decimalControl.setValue(data, { emitEvent: false });
        return;
      }

      const exp = new RegExp(`^[0-9.,-]+$`);
      if (!String(data)?.match(exp)) {
        data = data?.slice(0, -1);
        this._decimalControl.setValue(data, { emitEvent: false });
        return;
      }
      this.prevValue = this._decimalControl.value;
      if (data === null) return;

      let isNumber = Number(data);

      if (isNaN(isNumber) && this.countEqualCharacters(data, '-') >= 2) {
        const posicion = this.positionChar(data, '-');
        data = data.slice(0, posicion) + data.slice(posicion + 1);

        this._decimalControl.setValue(data, { emitEvent: false });
        return;
      }
      let newVal = data;
      if (newVal?.length == 0) {
        newVal = '';
        this._decimalControl.setValue(newVal, { emitEvent: false });
        return;
      }

      if (newVal === '.') {
        newVal = '';
        this._decimalControl.setValue(newVal, { emitEvent: false });
        return;
      }

      const numberInput: string = data.replace(/,/g, '');
      var numberConvert = '';
      if (this.isNegativeValue) {
        if (newVal != '-') {
          numberConvert = Number(numberInput).toFixed(
            this.numberDecimal(numberInput).length
          );
        } else {
          numberConvert = newVal;
        }
      } else {
        const numberInput: string = data.replace(/-/g, '');
        numberConvert = Number(numberInput).toFixed(
          this.numberDecimal(numberInput).length
        );
      }

      if (data.charAt(data.length - 1) === '.') {
        newVal = this.countPoint(data);

        let start = this.el.nativeElement.selectionStart;
        let end = this.el.nativeElement.selectionEnd;
        let commaCount = this.countComma(newVal, end);

        if (newVal.length === (commaCount === 0 ? start : start + 1)) {
          start = newVal.length;
          end = newVal.length;
        } else {
          start = start + commaCount - (commaCount === 0 ? 0 : 1);
          end = end + commaCount - (commaCount === 0 ? 0 : 1);
        }

        this._decimalControl.setValue(newVal, { emitEvent: false });
        return;
      } else {
        const exp = new RegExp(
          `^-?\\d{1,${this.numberInt}}(\\.\\d{0,${this.decimalNumber}})?$`
        );
        if (!String(numberConvert).match(exp)) {
          newVal = this.formatNumber(this.prevValue || '');

          let start = this.el.nativeElement.selectionStart;
          let end = this.el.nativeElement.selectionEnd;
          let commaCount = this.countComma(newVal, end);

          if (newVal.length === (commaCount === 0 ? start : start + 1)) {
            start = newVal.length;
            end = newVal.length;
          } else {
            start = start + commaCount - (commaCount === 0 ? 0 : 1);
            end = end + commaCount - (commaCount === 0 ? 0 : 1);
          }

          this._decimalControl.setValue(newVal, { emitEvent: false });
          return;
        }

        newVal = this.formatNumber(numberConvert);

        this.prevValue = numberConvert;

        let start = this.el.nativeElement.selectionStart;
        let end = this.el.nativeElement.selectionEnd;
        let commaCount = this.countComma(newVal, end);

        if (newVal.length === (commaCount === 0 ? start : start + 1)) {
          start = newVal.length;
          end = newVal.length;
        } else {
          start = start + commaCount - (commaCount === 0 ? 0 : 1);
          end = end + commaCount - (commaCount === 0 ? 0 : 1);
        }

        this._decimalControl.setValue(newVal, { emitEvent: false });
      }
    });
  }

  numberDecimal(num: string): string {
    let numDecimal = '';
    for (let i = 0; i < num.length; i++) {
      const element = num[i];
      if (element === '.') {
        numDecimal = num.substr(i + 1, num.length);
        break;
      }
    }
    return numDecimal;
  }

  countPoint(num: string): string {
    let count = 0;
    let index = 0;
    let newNumber = num;
    for (let i = 0; i < num.length; i++) {
      const element = num[i];
      if (element === '.') {
        count++;
        index = i;
        if (count > 1) break;
      }
    }
    if (count > 1) {
      return newNumber.substring(0, index);
    }
    return newNumber;
  }

  countComma(num: string, to: number): number {
    let count = 0;
    for (let i = 0; i < to; i++) {
      const element = num[i];
      if (element === ',') {
        count++;
      }
    }
    return count;
  }

  formatNumber(num: number | string) {
    if (typeof num === 'string') {
      num = this.formatMilToNumber(num);
    }
    return this.localeString(String(num));
  }

  static countComma(num: string, to: number): number {
    let count = 0;
    for (let i = 0; i < to; i++) {
      const element = num[i];
      if (element === ',') {
        count++;
      }
    }
    return count;
  }
  countEqualCharacters(string: string, char: string): number {
    let contador = 0;
    let position = 0;
    for (let i = 0; i < string.length; i++) {
      if (string.length > 1) {
        if (string[i] === char) {
          contador++;
          position = i;
        }
      }
    }
    return contador + position;
  }
  positionChar(string: string, char: string): number {
    let position = 0;
    for (let i = 0; i < string.length; i++) {
      if (string.length > 1) {
        if (string[i] === char) {
          position = i;
        }
      }
    }
    return position;
  }
  formatMilToNumber(num: string) {
    return String(num).replace(/,/g, '');
  }
  localeString(nStr: string) {
    if (nStr === '') return '';
    let x: string[], x1: string, x2: string, rgx: any, y1: string, y2: string[];
    nStr += '';
    x = nStr.split(',');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    let result: string = '';
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    if (x1.indexOf('.') !== -1) {
      y1 = x1.slice(x1.lastIndexOf('.')).replace(/\,/g, '');

      y2 = x1.split('.');

      result = y2[0] + y1;
    } else {
      result = x1 + x2;
      if (this.missingOneDecimalCheck(result)) return (result += '0');
    }
    return result;
  }

  missingOneDecimalCheck(nStr: string) {
    nStr += '';
    const x = nStr.split('.')[1];
    if (x && x.length === 1) return true;
    return false;
  }
  /**
   * validacion para los mensaje de cantidad de dígitos
   * @param numberEntry cantidad Total de dígitos
   * @param numberDecimal cantidad de dígitos de decimal
   * @param msgEntry mensaje para la cantidad de enteros
   * @param msgDecimal mensaje de cantidad de decimal
   * @returns
   */
  static ValidateDecimal(numberEntry: number, numberDecimal: number): any {
    return (control: AbstractControl) => {
      const exp = new RegExp(`^[0-9.,-]+$`);
      if (!String(control.value).match(exp)) {
        return;
      }
      let msgEntry: string = 'Máximo ' + numberEntry + ' enteros';
      let msgDecimal: string = 'Máximo ' + numberDecimal + ' decimales';
      if (!control.value) return null;

      const inputDate: string[] = (control.value + '').split('.');
      const splitComma: string[] = (inputDate[0] + '').split(',');

      inputDate[0] = inputDate[0].replace(/-/g, '');
      splitComma[0] = splitComma[0].replace(/-/g, '');
      let total = 0;
      for (let i = 0; i < splitComma.length; i++) {
        total = total + splitComma[i].length;
      }
      const lengthEntry: number = total;
      if (inputDate[1] != null || inputDate[1] != undefined) {
        const lengthDecimal: number = inputDate[1]?.length;
        if (!lengthDecimal) {
          return { regex: `Completar con la parte decimal` };
        }
        if (lengthDecimal <= numberDecimal) {
          if (lengthEntry <= numberEntry) {
            return null;
          } else {
            return { regex: `${msgEntry} ` };
          }
        } else {
          return { regex: `${msgDecimal} ` };
        }
      }
      if (!lengthEntry) return null;

      if (lengthEntry <= numberEntry) {
        return null;
      } else {
        return { regex: `${msgEntry} ` };
      }
    };
  }
  static decimalStringToParseFloat(num: string): number {
    return parseFloat(String(num).replace(/,/g, ''));
  }
  static getCountDecimal( origin: number): number {
    const stringLength = origin.toString();
    const positionDecimal = stringLength.indexOf('.');
    
    if (positionDecimal === -1) {
      return 0; 
    } else {
      return stringLength.length - positionDecimal - 1;
    }
  }
  static roundOut(data: number,origin: number): number {
    const epsilon = 0.9999999;
    const decimal =this.getCountDecimal(origin);
    if (Math.abs(data - Math.floor(data)) >= epsilon) {
      const epsilon = 0.9999999999999999; 
    const valor = data - Math.floor(data);
    const valor1 = Math.abs(valor) ;
    if (valor1 < epsilon) {
      return Math.round(data);
    } else {
      return data;
    }
    } else {
      return parseFloat(data.toFixed(decimal));
    }
  }
  
}
