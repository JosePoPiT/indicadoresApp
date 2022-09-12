import { TestBed } from '@angular/core/testing';

import { IndicadoresService } from './get-data.service';

describe('IndicadoresService', () => {
  let service: IndicadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
