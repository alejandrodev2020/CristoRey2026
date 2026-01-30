import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatHours'
})
export class DateFormatHoursPipe implements PipeTransform {

  transform(value: string|Date|null|undefined) {
    if(value){
      var datePipe = new DatePipe("en-US");
      value = datePipe.transform(value, 'dd/MM/yyyy HH:mm') || value;
      return value || '';
    }else{
      return value || '';
    }
    
 }

}
