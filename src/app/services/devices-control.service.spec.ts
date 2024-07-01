import { TestBed } from '@angular/core/testing';

import { DevicesControlService } from './devices-control.service';

describe('DevicesControlService', () => {
  let service: DevicesControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicesControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
