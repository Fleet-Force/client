import { TestBed } from '@angular/core/testing';
import { FleetAnalysisApiService } from './fleet-analysis-api.service';

describe('FleetAnalysisApiService', () => {
  let service: FleetAnalysisApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetAnalysisApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
