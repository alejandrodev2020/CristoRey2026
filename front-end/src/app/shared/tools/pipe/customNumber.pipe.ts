import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe implements PipeTransform {
  transform(value: number, digits?: string): string {
    if (!value && value !== 0) {
      return '';
    }
    const [integer, decimal] = value.toString().split('.');
    if (!decimal) {
      return integer;
    }
    return value.toFixed(decimal.length);
  }
}