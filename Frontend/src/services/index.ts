// =============================================================================
// SERVICE EXPORTS
// =============================================================================

// Axios Configuration
export { analyticsApi, ingestApi, apiRequest } from './axiosConfig';

// Analytics Service
export * from './analyticsService';

// Ingest Service
export * from './ingestService';

// =============================================================================
// TYPE EXPORTS
// =============================================================================

// Analytics Types
export type {
  HealthStatus,
  FunnelData,
  AverageFare,
  MonthlyRevenue,
  LifetimeValue,
  RevenuePerUser,
  PopularAirlines,
  UserOrigins,
  BookingHours,
  PaymentSuccess,
  CancellationRate,
  Anticipation,
  TimeToComplete,
} from './analyticsService';

// Ingest Types
export type {
  SearchEvent,
  ReservationEvent,
  PaymentEvent,
  CancellationEvent,
  IngestEvent,
  IngestResponse,
} from './ingestService';
