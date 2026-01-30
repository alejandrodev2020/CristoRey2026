export class TextGenericMethods {
    //* 12,125      --->      12125
    //* 12,125.11   --->      12125.11
    //* 12,125,125  --->      12125125
    static formatMilToNumber(num: string) {
      return String(num).replace(/,/g, '');
    }
  
    //* 12125.15      --->      12,125.15
    static formatNumber(num: number | string) {
      if (typeof num === 'string') {
        num = TextGenericMethods.formatMilToNumber(num);
      }
      return this.localeString(String(num));
      // return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
    }
  
    //* 12,125.      --->     12,125.
    //* 12,125.11   --->      12,125.11
    //* 12,125.11.  --->      12,125.11
    static countPoint(num: string): string {
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
  
    //* 12,125.      --->     12,125.
    //* 12,125.11   --->      12,125.11
    //* 12,125.11.  --->      12,125.11
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
  
    //* 12,125.      --->
    //* 12,125.11   --->      11
    //* 12,125.112  --->      112
    static numberDecimal(num: string): string {
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
  
    static isInteger(numero: number): boolean {
      return numero % 1 == 0 ? true : false;
    }
  
    // METHODS ADD
    private static missingOneDecimalCheck(nStr: string) {
      nStr += '';
      const x = nStr.split('.')[1];
      if (x && x.length === 1) return true;
      return false;
    }
  
    private static localeString(nStr: string) {
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
  }
  