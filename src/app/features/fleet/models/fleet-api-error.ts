export interface FleetApiError {
  readonly status: number;
  readonly code: string;
  readonly message: string;
  readonly backendMessage: string | null;
  readonly details: Readonly<Record<string, unknown>>;
}
export interface FleetApiErrorEnvelope {
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly details?: Readonly<Record<string, unknown>>;
  };
}
