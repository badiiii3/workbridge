import { TestBed } from '@angular/core/testing';

import { ServiceResolveService } from './service-resolve.service';

describe('ServiceResolveService', () => {
  let service: ServiceResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
