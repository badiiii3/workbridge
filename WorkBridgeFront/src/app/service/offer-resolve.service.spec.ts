import { TestBed } from '@angular/core/testing';

import { OfferResolveService } from './offer-resolve.service';

describe('OfferResolveService', () => {
  let service: OfferResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
