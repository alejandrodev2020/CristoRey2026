import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dynamicPipe'
})
export class DynamicPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, pipes: any[] = []): any {
    let result = value;

    // Aplicar cada pipe dinámicamente
    pipes.forEach(pipe => {
      if (pipe.name === 'dateFormatHours' && value) {
        result = this.datePipe.transform(result, 'dd/MM/yyyy HH:mm');
      } else if (pipe.name === 'number' && value) {
        // Aplicar el pipe number
        result = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: pipe.minFractionDigits || 1,
          maximumFractionDigits: pipe.maxFractionDigits || 2
        }).format(result);
      } else if (pipe.name === 'truncate' && value) {
        // Aplicar el pipe truncate
        result = result.length > pipe.limit ? result.substring(0, pipe.limit) + '...' : result;
      }
    });

    return result;
  }
}
