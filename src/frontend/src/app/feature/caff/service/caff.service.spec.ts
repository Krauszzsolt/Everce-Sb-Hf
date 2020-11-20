import { TestBed } from '@angular/core/testing';

import { CaffService } from './caff.service';

describe('CaffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaffService = TestBed.get(CaffService);
    expect(service).toBeTruthy();
  });
});
