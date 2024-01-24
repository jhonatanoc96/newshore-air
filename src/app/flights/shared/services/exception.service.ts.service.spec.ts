import { TestBed } from '@angular/core/testing';

import { ExceptionServiceTsService } from './exception.service.ts.service';

describe('ExceptionServiceTsService', () => {
  let service: ExceptionServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExceptionServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
