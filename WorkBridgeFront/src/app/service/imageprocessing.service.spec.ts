import { TestBed } from '@angular/core/testing';

import { ImageprocessingService } from './imageprocessing.service';

describe('ImageprocessingService', () => {
  let service: ImageprocessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageprocessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
