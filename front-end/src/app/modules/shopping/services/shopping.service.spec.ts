import { TestBed } from '@angular/core/testing';
import { ShoppingService } from './shopping.service';

describe('AlertService', () => {
  let service: ShoppingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShoppingService
      ]
    });
    service = TestBed.inject(ShoppingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
