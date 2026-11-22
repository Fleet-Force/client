import { Service, signal, computed } from '@angular/core';
import { FleetAnalysis } from '../models/fleet-analysis';
import { FleetApiError } from '../models/fleet-api-error';
@Service()
export class FleetAnalysisStoreService {
  private readonly analysisState = signal<FleetAnalysis | null>(null);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<FleetApiError | null>(null);
  private readonly fileNameState = signal<string | null>(null);
  readonly analysis = this.analysisState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();
  readonly selectedFileName = this.fileNameState.asReadonly();
  readonly hasAnalysis = computed(() => this.analysis() !== null);
  startAnalysis(name: string): boolean {
    if (this.loading()) return false;
    this.analysisState.set(null);
    this.errorState.set(null);
    this.fileNameState.set(name);
    this.loadingState.set(true);
    return true;
  }
  completeAnalysis(value: FleetAnalysis): void {
    this.analysisState.set(value);
    this.errorState.set(null);
    this.loadingState.set(false);
  }
  failAnalysis(error: FleetApiError): void {
    this.analysisState.set(null);
    this.errorState.set(error);
    this.loadingState.set(false);
  }
  clearAnalysis(): void {
    this.analysisState.set(null);
    this.errorState.set(null);
    this.fileNameState.set(null);
    this.loadingState.set(false);
  }
  vehicleById(id: string) {
    return this.analysis()?.vehicles.find((vehicle) => vehicle.fleet_id === id);
  }
}
