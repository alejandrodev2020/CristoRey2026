import { TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';

describe('AlertService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientService
      ]
    });
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
