import { TestBed } from '@angular/core/testing';

import { StorageappService } from './storageapp.service';

describe('StorageappService', () => {
  let service: StorageappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
