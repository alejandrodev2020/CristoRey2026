import { TestBed } from '@angular/core/testing';
import { SaleService } from './sale.service';

describe('AlertService', () => {
  let service: SaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SaleService
      ]
    });
    service = TestBed.inject(SaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
