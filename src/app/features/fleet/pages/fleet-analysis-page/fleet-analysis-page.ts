import { column } from '../../models/fleet-presentation';
import { formatValue } from '../../../../shared/utils/presentation';
import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  readonly params = toSignal(inject(ActivatedRoute).queryParamMap);
 readonly section = computed(() => this.params()?.get('section') ?? 'overview');
 readonly store = inject(FleetAnalysisStoreService);
 readonly summaryDetails = computed(() => Object.entries(this.store.analysis()?.summary ?? {}).map(([key,value]) => ({label:column(key).label,value:formatValue(value,column(key).format)})));
}
