import { ElementRef } from "@angular/core";
import { DecimalNumberDirective } from "./decimal-number.directive";
describe('DecimalNumberDirective', () => {
  let elementRefMock: ElementRef;
  beforeEach(() => {
    elementRefMock = new ElementRef(document.createElement('input'));
  });
  it('should create an instance', () => {
    const directive = new DecimalNumberDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});
