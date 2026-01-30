import { CustomNumberPipe } from './customNumber.pipe';

describe('CustomNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
