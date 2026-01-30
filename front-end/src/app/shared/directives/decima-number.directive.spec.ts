import { DecimalMaskDirective } from "./decima-number.directive";

describe('DecimalNumber', () => {
  it('should create an instance', () => {
    const directive = new DecimalMaskDirective(<any>{},<any>{});
    expect(directive).toBeTruthy();
  });
});
