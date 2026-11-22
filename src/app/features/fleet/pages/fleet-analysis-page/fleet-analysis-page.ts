import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FleetAnalysisStoreService } from '../../state/fleet-analysis-store.service';
import { FleetSummary } from '../../components/fleet-summary/fleet-summary';
import { FleetVehiclesTable } from '../../components/fleet-vehicles-table/fleet-vehicles-table';
import { FleetDiagnosticsSection } from '../../components/fleet-diagnostics-section/fleet-diagnostics-section';
@Component({
  selector: 'app-fleet-analysis-page',
  imports: [RouterLink, FleetSummary, FleetVehiclesTable, FleetDiagnosticsSection],
  templateUrl: './fleet-analysis-page.html',
  styleUrl: './fleet-analysis-page.scss',
})
export class FleetAnalysisPage {
  readonly store = inject(FleetAnalysisStoreService);
}
