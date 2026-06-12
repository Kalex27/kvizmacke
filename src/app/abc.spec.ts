import { TestBed } from '@angular/core/testing';

import { Abc } from './abc';

describe('Abc', () => {
  let service: Abc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Abc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
