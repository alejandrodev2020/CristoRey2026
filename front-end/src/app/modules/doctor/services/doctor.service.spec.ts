import { TestBed } from '@angular/core/testing';
import { DoctorService } from './doctor.service';

describe('AlertService', () => {
  let service: DoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DoctorService
      ]
    });
    service = TestBed.inject(DoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
