import { TestBed } from '@angular/core/testing';

import { EncriptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
