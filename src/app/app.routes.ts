import { Routes } from '@angular/router';
import { AppShell } from './core/layouts/app-shell/app-shell';
export const routes: Routes = [
  {
    path: '',
    component: AppShell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'import' },
      {
        path: '',
        loadChildren: () =>
          import('./features/fleet/routes/fleet.routes').then((m) => m.FLEET_ROUTES),
      },
      { path: '**', redirectTo: 'import' },
    ],
  },
];
