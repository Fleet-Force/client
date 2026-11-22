import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FleetAnalysisStoreService } from '../state/fleet-analysis-store.service';

export const fleetAnalysisGuard: CanActivateFn = () => {
  const store = inject(FleetAnalysisStoreService);
  const router = inject(Router);

  return store.hasAnalysis() || router.createUrlTree(['/import']);
};
