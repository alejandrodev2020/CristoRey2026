/**
 *
 * @references
 *
 * guia
 * https://stackblitz.com/edit/angular-phone-mask-directive?file=app%2Fapp.component.html
 */

 import {
    Directive,
    ElementRef,
    Input,
    OnInit,
    OnDestroy,
    Renderer2,
  } from '@angular/core';
  import { AbstractControl } from '@angular/forms';
  import { Subscription } from 'rxjs';
import { TextGenericMethods } from '../class/text-generic-methods';

  
  @Directive({
    selector: '[decimalMask]',
  })
  export class DecimalMaskDirective implements OnInit, OnDestroy {
    private _decimalControl!: AbstractControl;
  
    @Input()
    set decimalControl(control: AbstractControl) {
      this._decimalControl = control;
    }
  
    decimalNumber = 2;
    @Input('decimalNumber')
    set prop001(control: number) {
      if(control){
        this.decimalNumber = control;
      }
    }
  
    private sub!: Subscription;
  
    constructor(private el: ElementRef, private renderer: Renderer2) {}
  
    ngOnInit() {
      this.decimalValidate();
      this.prevValue = this._decimalControl.value;
    }
  
    ngOnDestroy() {
      this.sub?.unsubscribe();
    }
  
    prevValue!: string;
    decimalValidate() {
      this.sub = this._decimalControl.valueChanges.subscribe((data) => {
        if(data===null) return;
  
        let newVal = data;
        if (newVal?.length == 0) {
          newVal = '';
          this._decimalControl.setValue(newVal, { emitEvent: false });
          this.el.nativeElement.setSelectionRange(0, 0);
          return;
        }
  
        //const numberConvert = parseFloat(data.replace(/,/g, '')); // preguntar si es decimal o no
        const numberInput: string = data.replace(/,/g, '');
        const numberConvert = Number(numberInput).toFixed(
          TextGenericMethods.numberDecimal(numberInput).length
        );
        
        if (data.charAt(data.length - 1) === '.') {
          newVal = TextGenericMethods.countPoint(data);
  
          let start = this.el.nativeElement.selectionStart;
          let end = this.el.nativeElement.selectionEnd;
          let commaCount = TextGenericMethods.countComma(newVal, end);
  
          if (newVal.length === (commaCount === 0 ? start : start + 1)) {
            start = newVal.length;
            end = newVal.length;
          } else {
            start = start + commaCount - (commaCount === 0 ? 0 : 1);
            end = end + commaCount - (commaCount === 0 ? 0 : 1);
          }
  
          this._decimalControl.setValue(newVal, { emitEvent: false });
          this.el.nativeElement.setSelectionRange(start, end);
          return;
        } else {
          const exp = new RegExp(`^\\d*\\.?\\d{0,${this.decimalNumber}}$`);
          // if (!String(numberConvert).match(/^\d*\.?\d{0,2}$/g)) {//igual a exp
          if (!String(numberConvert).match(exp)) {
            newVal = TextGenericMethods.formatNumber(this.prevValue || '');
  
            let start = this.el.nativeElement.selectionStart;
            let end = this.el.nativeElement.selectionEnd;
            let commaCount = TextGenericMethods.countComma(newVal, end);
  
            if (newVal.length === (commaCount === 0 ? start : start + 1)) {
              start = newVal.length;
              end = newVal.length;
            } else {
              start = start + commaCount - (commaCount === 0 ? 0 : 1);
              end = end + commaCount - (commaCount === 0 ? 0 : 1);
            }
  
            this._decimalControl.setValue(newVal, { emitEvent: false });
            this.el.nativeElement.setSelectionRange(start, end);
            return;
          }
  
          newVal = TextGenericMethods.formatNumber(numberConvert);
  
          this.prevValue = numberConvert;
  
          let start = this.el.nativeElement.selectionStart;
          let end = this.el.nativeElement.selectionEnd;
          let commaCount = TextGenericMethods.countComma(newVal, end);
  
          if (newVal.length === (commaCount === 0 ? start : start + 1)) {
            start = newVal.length;
            end = newVal.length;
          } else {
            start = start + commaCount - (commaCount === 0 ? 0 : 1);
            end = end + commaCount - (commaCount === 0 ? 0 : 1);
          }
  
          this._decimalControl.setValue(newVal, { emitEvent: false });
          this.el.nativeElement.setSelectionRange(start, end);
        }
      });
    }
  
  }
  