import { FleetSummary } from './fleet-summary';
import { FleetVehicle } from './fleet-vehicle';
export interface DiagnosticRecord {
  readonly [key: string]: unknown;
}
export interface FleetMetadata extends DiagnosticRecord {
  readonly input_format: string;
  readonly price_reference_state: string;
  readonly currency: string;
  readonly availability: {
    readonly anp: boolean;
    readonly pbev_catalog: boolean;
    readonly anomaly_analysis: boolean;
  };
}
export interface FleetCategory extends DiagnosticRecord {
  readonly vehicle_category: string;
  readonly vehicles: number;
  readonly total_km: number | null;
  readonly total_expense_brl: number | null;
  readonly fuel_expense_brl: number | null;
  readonly maintenance_expense_brl: number | null;
  readonly priority_cases: number;
  readonly cost_per_km_brl: number | null;
}
export interface Coverage {
  readonly available: number;
  readonly vehicles: number;
}
export interface PeerGroup extends DiagnosticRecord {
  readonly model_norm: string;
  readonly peer_confidence: string;
  readonly vehicles: number;
  readonly eligible: number;
}
export interface ExpenseDistribution extends DiagnosticRecord {
  readonly field: string;
  readonly total_brl: number | null;
  readonly available_vehicles: number;
}
export interface ParetoEntry extends DiagnosticRecord {
  readonly fleet_id: string;
  readonly model: string;
  readonly total_expense: number | null;
  readonly cost_share_pct: number | null;
  readonly cost_cumulative_share_pct: number | null;
  readonly pareto_80_flag: boolean;
}
export interface ReferencePrice extends DiagnosticRecord {
  readonly uf: string;
  readonly produto: string;
  readonly mes: string;
  readonly preco_medio_brl_l: number | null;
}
export interface FuelScenario extends DiagnosticRecord {
  readonly combustivel: string;
  readonly uf: string;
  readonly mes_referencia: string;
  readonly preco_medio_referencia_brl_l: number | null;
  readonly litros_excedentes_est: number | null;
  readonly custo_cenario_brl: number | null;
  readonly metodologia: string;
}
export interface ModelValidation extends DiagnosticRecord {
  readonly status?: string;
  readonly approved_production?: boolean;
  readonly reason?: string;
  readonly automatic_recommendations?: boolean;
}
export interface FleetAnalysis {
  readonly analysis_id: string;
  readonly status: string;
  readonly metadata: FleetMetadata;
  readonly summary: FleetSummary;
  readonly vehicles: readonly FleetVehicle[];
  readonly categories: readonly FleetCategory[];
  readonly priorities: readonly FleetVehicle[];
  readonly quality: {
    readonly issues: readonly FleetVehicle[];
    readonly duplicates: readonly DiagnosticRecord[];
    readonly coverage: Readonly<Record<string, Coverage>>;
  };
  readonly comparisons: {
    readonly internal: readonly PeerGroup[];
    readonly public_references: readonly FleetVehicle[];
  };
  readonly financial: {
    readonly expense_distribution: readonly ExpenseDistribution[];
    readonly pareto: readonly ParetoEntry[];
    readonly fuel_scenarios: readonly FuelScenario[];
  };
  readonly reference_prices: readonly ReferencePrice[];
  readonly ml: {
    readonly enabled: boolean;
    readonly status: string;
    readonly reason: string;
    readonly used_for_operational_alerts: boolean;
    readonly models: Readonly<Record<string, ModelValidation>>;
    readonly crossval_predictions: readonly DiagnosticRecord[];
    readonly price_backtest: readonly DiagnosticRecord[];
    readonly price_forecast: readonly DiagnosticRecord[];
  };
}
