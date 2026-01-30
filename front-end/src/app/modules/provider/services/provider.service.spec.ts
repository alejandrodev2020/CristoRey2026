import { TestBed } from '@angular/core/testing';
import { ProviderService } from './provider.service';

describe('AlertService', () => {
  let service: ProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProviderService
      ]
    });
    service = TestBed.inject(ProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
