import { TestBed } from '@angular/core/testing';
import { WarehouseService } from './warehouse.service';

describe('AlertService', () => {
  let service: WarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WarehouseService
      ]
    });
    service = TestBed.inject(WarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
