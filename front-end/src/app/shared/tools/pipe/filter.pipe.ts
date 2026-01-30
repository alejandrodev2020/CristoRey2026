import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: Record<string, any>): any[] {
    if (!items || !filter) {
      return items;
    }

    const keys = Object.keys(filter); 
    return items.filter(item => {
      return keys.some(key => {
        const filterValue = (filter[key] || '').toLocaleLowerCase();
        const itemValue = (item[key] || '').toString().toLocaleLowerCase();
        return itemValue.indexOf(filterValue) !== -1;
      });
    });
  }
}
