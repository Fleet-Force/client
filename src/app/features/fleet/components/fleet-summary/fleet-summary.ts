import { Component, input, computed } from '@angular/core';
import { FleetSummary as Summary } from '../../models/fleet-summary';
import { column } from '../../models/fleet-presentation';
import { formatValue } from '../../../../shared/utils/presentation';
@Component({
  selector: 'app-fleet-summary',
  templateUrl: './fleet-summary.html',
  styleUrl: './fleet-summary.scss',
})
export class FleetSummary {
  readonly summary = input<Summary | null>(null);
  readonly indicators = computed(() =>
    ['vehicles','total_expense_brl','total_km','cost_per_km_brl','unified_priority_cases','quality_review_vehicles','fuel_expense_brl','maintenance_expense_brl','mean_expense_per_vehicle_brl','fuel_share_pct','eligible_vehicles','eligible_peer_comparisons','peer_priority_cases','duplicate_review_vehicles'].map(key => [key, this.summary()?.[key]] as const).map(([key, value]) => ({ ...column(key), value })),
  );
  readonly format = formatValue;
}
