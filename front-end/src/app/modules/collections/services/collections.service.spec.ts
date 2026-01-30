import { TestBed } from '@angular/core/testing';
import { CollectionsService } from './collections.service';

describe('AlertService', () => {
  let service: CollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionsService
      ]
    });
    service = TestBed.inject(CollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
