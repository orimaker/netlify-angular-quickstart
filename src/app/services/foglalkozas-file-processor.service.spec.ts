import { TestBed } from '@angular/core/testing';

import { FoglalkozasFileProcessorService } from './foglalkozas-file-processor.service';

describe('FoglalkozasFileProcessorService', () => {
  let service: FoglalkozasFileProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoglalkozasFileProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
