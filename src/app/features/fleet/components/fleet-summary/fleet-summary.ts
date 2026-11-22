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
    Object.entries(this.summary() ?? {}).map(([key, value]) => ({ ...column(key), value })),
  );
  readonly format = formatValue;
}
