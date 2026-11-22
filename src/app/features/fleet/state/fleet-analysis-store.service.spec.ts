import { TestBed } from '@angular/core/testing';
import { FleetAnalysisStoreService } from './fleet-analysis-store.service';

describe('FleetAnalysisStoreService', () => {
  let service: FleetAnalysisStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetAnalysisStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
