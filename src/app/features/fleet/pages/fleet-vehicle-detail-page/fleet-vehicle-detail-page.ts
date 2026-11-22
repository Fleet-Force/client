import { Component, inject, computed } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FleetAnalysisStoreService } from '../../state/fleet-analysis-store.service';
import { column } from '../../models/fleet-presentation';
import { formatValue } from '../../../../shared/utils/presentation';
@Component({
  selector: 'app-fleet-vehicle-detail-page',
  imports: [RouterLink, JsonPipe],
  templateUrl: './fleet-vehicle-detail-page.html',
  styleUrl: './fleet-vehicle-detail-page.scss',
})
export class FleetVehicleDetailPage {
  readonly store = inject(FleetAnalysisStoreService);
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });
  readonly vehicle = computed(() => this.store.vehicleById(this.params().get('fleetId') ?? ''));
  readonly format = formatValue;
  private readonly sections = [
    {
      title: 'Identificação, distância e eficiência',
      keys: 'fleet_id model model_norm vehicle_category km kmpl km_covered km_uncovered kmpl_coverage_pct liters_est liters_source',
    },
    {
      title: 'Despesas e manutenção',
      keys: 'total_expense cost_per_km fuel_expense labor_internal labor_external parts tires lubricant wash os_count fuel_cost_per_km_historical maintenance_expense_known maintenance_cost_per_km fuel_share_pct maintenance_share_pct',
    },
    {
      title: 'Qualidade e integridade',
      keys: 'quality_status quality_reason requires_review valid_efficiency expense_integrity_alert expense_integrity_delta_brl',
    },
    {
      title: 'Pares e prioridades',
      keys: 'peer_status peer_confidence peer_reference_method other_peer_count peer_median_kmpl peer_overuse_pct excess_liters_vs_peer_est priority_alert actionable_excess_liters_est category_cost_alert category_cost_over_median_pct unified_priority_alert unified_priority_source unified_priority_liters_est active_reference_source active_reference_kmpl',
    },
    {
      title: 'Referência pública exploratória PBEV',
      keys: 'pbev_min_kmpl pbev_reference_year pbev_comparison_confidence pbev_alert_exploratory',
    },
    {
      title: 'Inferência de machine learning',
      keys: 'ml_predicted_kmpl ml_inference_status ml_priority_alert',
    },
  ];
  readonly groups = computed(() =>
    this.sections.map((section) => ({
      title: section.title,
      fields: section.keys
        .split(' ')
        .map((key) => ({ ...column(key), value: this.vehicle()?.[key] })),
    })),
  );
}
