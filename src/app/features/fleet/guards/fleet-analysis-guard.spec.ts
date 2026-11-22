import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { fleetAnalysisGuard } from './fleet-analysis-guard';

describe('fleetAnalysisGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => fleetAnalysisGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
