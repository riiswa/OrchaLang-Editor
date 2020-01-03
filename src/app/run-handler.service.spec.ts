import { TestBed } from '@angular/core/testing';

import { RunHandlerService } from './run-handler.service';

describe('RunHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunHandlerService = TestBed.get(RunHandlerService);
    expect(service).toBeTruthy();
  });
});
