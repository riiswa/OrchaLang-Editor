import { TestBed } from '@angular/core/testing';

import { CodeMirrorOptionService } from './code-mirror-option.service';

describe('CodeMirrorOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeMirrorOptionService = TestBed.get(CodeMirrorOptionService);
    expect(service).toBeTruthy();
  });
});
