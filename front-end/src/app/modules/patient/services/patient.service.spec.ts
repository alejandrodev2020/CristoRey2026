import { TestBed } from '@angular/core/testing';
import { PatientService } from './patient.service';

describe('AlertService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PatientService
      ]
    });
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
