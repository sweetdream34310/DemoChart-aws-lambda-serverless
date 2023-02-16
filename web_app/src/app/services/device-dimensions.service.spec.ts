import { TestBed } from '@angular/core/testing';

import { DeviceDimensionsService } from './device-dimensions.service';

describe('DeviceDimensionsService', () => {
  let service: DeviceDimensionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceDimensionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
