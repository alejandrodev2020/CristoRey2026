import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string|Date|null|undefined, format : string | null = null) {
    if(value){
      var datePipe = new DatePipe("en-US");
      var formatEnd = (format)? format : 'dd/MM/yyyy'; 
      value = datePipe.transform(value, formatEnd) || value;
      return value || '';
    }else{
      return value || '';
    }
    
 }

}
