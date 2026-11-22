import { Component, inject, signal, DestroyRef } from '@angular/core';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FleetAnalysisApiService } from '../../data-access/fleet-analysis-api.service';
import { FleetAnalysisStoreService } from '../../state/fleet-analysis-store.service';
import { FleetApiError } from '../../models/fleet-api-error';
import { API_CONFIG } from '../../../../core/config/api-config';
import { formatValue } from '../../../../shared/utils/presentation';
@Component({
  selector: 'app-fleet-import-page',
  templateUrl: './fleet-import-page.html',
  styleUrl: './fleet-import-page.scss',
})
export class FleetImportPage {
  readonly store = inject(FleetAnalysisStoreService);
  private readonly api = inject(FleetAnalysisApiService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly file = signal<File | null>(null);
  readonly uf = signal('MG');
  readonly validation = signal('');
  readonly states =
    'AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' ');
  readonly format = formatValue;
  selectFile(event: Event): void {
    if (this.store.loading()) return;
    const input = event.target as HTMLInputElement;
    const selected = input.files?.[0] ?? null;
    this.store.clearAnalysis();
    this.file.set(null);
    this.validation.set('');
    if (!selected) return;
    if (!selected.name.toLowerCase().endsWith('.csv')) {
      this.validation.set('Selecione um arquivo com extensão .csv.');
      return;
    }
    if (selected.size > API_CONFIG.maxUploadBytes) {
      this.validation.set('O arquivo deve ter no máximo 10 MiB.');
      return;
    }
    if (selected.size === 0) {
      this.validation.set('O arquivo está vazio.');
      return;
    }
    this.file.set(selected);
  }
  submit(event: Event): void {
    event.preventDefault();
    if (this.store.loading()) return;
    const file = this.file();
    if (!file) {
      this.validation.set('Selecione um arquivo CSV antes de analisar.');
      return;
    }
    if (!this.store.startAnalysis(file.name)) return;
    this.api
      .analyze(file, this.uf())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          if (this.store.loading())
            this.store.failAnalysis({
              status: 0,
              code: 'REQUEST_CANCELLED',
              message: 'A análise foi interrompida. Envie o CSV novamente.',
              backendMessage: null,
              details: {},
            });
        }),
      )
      .subscribe({
        next: (analysis) => {
          this.store.completeAnalysis(analysis);
          void this.router.navigate(['/analysis']);
        },
        error: (error: FleetApiError) => this.store.failAnalysis(error),
      });
  }
  errorDetails(error: FleetApiError): readonly string[] {
    const d = error.details;
    const lines: string[] = [];
    if (Array.isArray(d['missing_columns']))
      lines.push(
        'Colunas ausentes: ' +
          d['missing_columns'].filter((v: unknown) => typeof v === 'string').join(', '),
      );
    if (typeof d['row'] === 'number') lines.push('Linha: ' + d['row']);
    if (typeof d['column'] === 'string') lines.push('Coluna: ' + d['column']);
    if (typeof d['max_bytes'] === 'number')
      lines.push('Limite: ' + formatValue(d['max_bytes']) + ' bytes');
    return lines;
  }
}
