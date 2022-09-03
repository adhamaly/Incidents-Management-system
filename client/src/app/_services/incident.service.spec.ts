import { TestBed } from '@angular/core/testing';
import { IncidentSerevice } from './incident.service';

describe('IncidentSerevice', () => {
  let service: IncidentSerevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentSerevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
