import { Component, input, signal, computed } from '@angular/core';
import { FleetVehicle } from '../../models/fleet-vehicle';
import { columns } from '../../models/fleet-presentation';
import { DataTable } from '../../../../shared/components/data-table/data-table';
@Component({
  selector: 'app-fleet-vehicles-table',
  imports: [DataTable],
  templateUrl: './fleet-vehicles-table.html',
  styleUrl: './fleet-vehicles-table.scss',
})
export class FleetVehiclesTable {
  readonly vehicles = input<readonly FleetVehicle[]>([]);
  readonly query = signal('');
  readonly category = signal('');
  readonly priorityOnly = signal(false);
  readonly reviewOnly = signal(false);
  readonly categories = computed(() =>
    [
      ...new Set(
        this.vehicles()
          .map((v) => v.vehicle_category)
          .filter((v): v is string => typeof v === 'string'),
      ),
    ].sort(),
  );
  readonly filtered = computed(() => {
    const query = this.query().trim().toLocaleLowerCase('pt-BR');
    return this.vehicles().filter(
      (v) =>
        (!query || `${v.fleet_id} ${v.model}`.toLocaleLowerCase('pt-BR').includes(query)) &&
        (!this.category() || v.vehicle_category === this.category()) &&
        (!this.priorityOnly() || v.unified_priority_alert === true || v.priority_alert === true) &&
        (!this.reviewOnly() || v.requires_review === true),
    );
  });
  readonly tableColumns = columns(
    'fleet_id',
    'model',
    'vehicle_category',
    'km',
    'kmpl',
    'liters_est',
    'total_expense',
    'cost_per_km',
    'quality_status',
    'unified_priority_alert',
  );
}
