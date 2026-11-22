import { Component, input, computed, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableColumn, formatValue } from '../../utils/presentation';
@Component({
  selector: 'app-data-table',
  imports: [RouterLink],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  readonly rows = input<readonly Readonly<Record<string, unknown>>[]>([]);
  readonly columns = input<readonly TableColumn[]>([]);
  readonly caption = input('Dados');
  readonly vehicleLinks = input(false);
  readonly pageSize = 25;
  readonly page = linkedSignal({ source: () => this.rows(), computation: () => 0 });
  readonly pages = computed(() => Math.max(1, Math.ceil(this.rows().length / this.pageSize)));
  readonly visibleRows = computed(() =>
    this.rows().slice(this.page() * this.pageSize, (this.page() + 1) * this.pageSize),
  );
  readonly format = formatValue;
}
