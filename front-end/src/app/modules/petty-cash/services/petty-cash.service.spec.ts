import { TestBed } from '@angular/core/testing';
import { PettyCashService } from './petty-cash.service';

describe('AlertService', () => {
  let service: PettyCashService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PettyCashService
      ]
    });
    service = TestBed.inject(PettyCashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
