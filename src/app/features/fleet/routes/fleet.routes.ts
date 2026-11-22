import { Routes } from '@angular/router';
import { fleetAnalysisGuard } from '../guards/fleet-analysis-guard';
export const FLEET_ROUTES: Routes = [
  {
    path: 'import',
    title: 'Importar frota · Fleet Force',
    loadComponent: () =>
      import('../pages/fleet-import-page/fleet-import-page').then((m) => m.FleetImportPage),
  },
  {
    path: 'analysis',
    canActivate: [fleetAnalysisGuard],
    runGuardsAndResolvers: 'always',
    title: 'Diagnóstico · Fleet Force',
    loadComponent: () =>
      import('../pages/fleet-analysis-page/fleet-analysis-page').then((m) => m.FleetAnalysisPage),
  },
  {
    path: 'analysis/vehicles/:fleetId',
    canActivate: [fleetAnalysisGuard],
    title: 'Veículo · Fleet Force',
    loadComponent: () =>
      import('../pages/fleet-vehicle-detail-page/fleet-vehicle-detail-page').then(
        (m) => m.FleetVehicleDetailPage,
      ),
  },
];
