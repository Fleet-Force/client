export interface FleetSummary {
  readonly [key: string]: number | null;
  readonly vehicles: number | null;
  readonly eligible_vehicles: number | null;
  readonly quality_review_vehicles: number | null;
  readonly total_km: number | null;
  readonly total_expense_brl: number | null;
  readonly fuel_expense_brl: number | null;
  readonly maintenance_expense_brl: number | null;
  readonly cost_per_km_brl: number | null;
  readonly mean_expense_per_vehicle_brl: number | null;
  readonly fuel_share_pct: number | null;
  readonly eligible_peer_comparisons: number | null;
  readonly peer_priority_cases: number | null;
  readonly peer_priority_excess_liters_est: number | null;
  readonly high_category_cost_cases: number | null;
  readonly financial_integrity_review_cases: number | null;
  readonly exploratory_anomalies: number | null;
  readonly duplicate_review_vehicles: number | null;
  readonly unified_priority_cases: number | null;
  readonly validated_ml_reference_vehicles: number | null;
}
