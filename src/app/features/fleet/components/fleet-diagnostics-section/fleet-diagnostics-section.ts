import { Component, input, computed } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FleetAnalysis } from '../../models/fleet-analysis';
import { columns, labels } from '../../models/fleet-presentation';
import { DataTable } from '../../../../shared/components/data-table/data-table';
@Component({
  selector: 'app-fleet-diagnostics-section',
  imports: [DataTable, JsonPipe],
  templateUrl: './fleet-diagnostics-section.html',
  styleUrl: './fleet-diagnostics-section.scss',
})
export class FleetDiagnosticsSection {
  readonly section = input("overview");
 readonly analysis = input<FleetAnalysis | null>(null);
  readonly coverage = computed(() =>
    Object.entries(this.analysis()?.quality.coverage ?? {}).map(([field, value]) => ({
      field: labels[field] ?? field,
      ...value,
    })),
  );
  readonly modelRows = computed(() =>
    Object.entries(this.analysis()?.ml.models ?? {}).map(([name, value]) => ({ name, ...value })),
  );
  readonly duplicateColumns = computed(() => {
    const keys = [
      ...new Set(this.analysis()?.quality.duplicates.flatMap((row) => Object.keys(row)) ?? []),
    ];
    return columns(...keys);
  });
  readonly categoryColumns = columns(
    'vehicle_category',
    'vehicles',
    'total_km',
    'total_expense_brl',
    'fuel_expense_brl',
    'maintenance_expense_brl',
    'priority_cases',
    'cost_per_km_brl',
  );
  readonly priorityColumns = columns(
    'fleet_id',
    'model',
    'peer_confidence',
    'peer_reference_method',
    'unified_priority_source',
    'unified_priority_liters_est',
    'priority_alert',
    'unified_priority_alert',
    'category_cost_alert',
    'expense_integrity_alert',
  );
  readonly issueColumns = columns(
    'fleet_id',
    'model',
    'quality_status',
    'quality_reason',
    'requires_review',
  );
  readonly coverageColumns = columns('field', 'available', 'vehicles');
  readonly distributionColumns = columns('field', 'total_brl', 'available_vehicles');
  readonly paretoColumns = columns(
    'fleet_id',
    'model',
    'total_expense',
    'cost_share_pct',
    'cost_cumulative_share_pct',
    'pareto_80_flag',
  );
  readonly scenarioColumns = columns(
    'combustivel',
    'uf',
    'mes_referencia',
    'preco_medio_referencia_brl_l',
    'litros_excedentes_est',
    'custo_cenario_brl',
  );
  readonly peerColumns = columns('model_norm', 'vehicles', 'eligible', 'peer_confidence');
  readonly publicColumns = columns(
    'fleet_id',
    'model',
    'pbev_min_kmpl',
    'pbev_reference_year',
    'pbev_comparison_confidence',
    'pbev_alert_exploratory',
  );
  readonly priceColumns = columns('produto', 'uf', 'mes', 'preco_medio_brl_l');
  readonly validationColumns = [
    { key: 'name', label: 'Modelo analítico' },
    ...columns('status', 'approved_production', 'reason', 'automatic_recommendations'),
  ];
}
