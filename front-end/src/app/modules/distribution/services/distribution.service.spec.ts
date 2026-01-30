import { TestBed } from '@angular/core/testing';
import { DistributionService } from './distribution.service';

describe('AlertService', () => {
  let service: DistributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DistributionService
      ]
    });
    service = TestBed.inject(DistributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
