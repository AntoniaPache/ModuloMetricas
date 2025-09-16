import { UseQueryResult } from '@tanstack/react-query';

// Dashboard Types - Professional TypeScript definitions

export interface MetricData {
  title: string;
  value: string;
  unit?: string;
  change: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface TableColumn {
  key: string;
  title: string;
  render?: (value: any) => React.ReactNode;
}

export interface TableData {
  [key: string]: string | number;
}

// API Response Types
export interface FunnelData {
  period_days: number;
  searches: number;
  reservations: number;
  payments: number;
  conversion: {
    search_to_reserve: number;
    reserve_to_pay: number;
    search_to_pay: number;
  };
}

export interface AverageFareData {
  period_days: number;
  avg_fare: number;
}

export interface MonthlyRevenueData {
  months: number;
  monthly: Array<{
    ym: string;
    revenue: number;
    payments: number;
  }>;
}

export interface LifetimeValueData {
  top: number;
  ltv: Array<{
    userId: string;
    total_spend: number;
    payments: number;
  }>;
}

export interface RevenuePerUserData {
  period_days: number;
  top: number;
  revenue_per_user: Array<{
    userId: string;
    revenue: number;
    payments: number;
  }>;
}

export interface PaymentSuccessData {
  period_days: number;
  approved: number;
  rejected: number;
  success_rate_percent: number;
}

export interface AnticipationData {
  period_days: number;
  avg_anticipation_days: number;
}

export interface BookingHoursData {
  period_days: number;
  histogram: Array<{
    hour_utc: number;
    count: number;
  }>;
}

export interface UserOriginsData {
  period_days: number;
  top: number;
  user_origins: Array<{
    country: string;
    users: number;
  }>;
}

export interface PopularAirlinesData {
  period_days: number;
  top: number;
  popular_airlines: Array<{
    airlineCode: string;
    count: number;
    avg_price: number;
  }>;
}

export interface CancellationRateData {
  period_days: number;
  created: number;
  canceled: number;
  cancellation_rate_percent: number;
}

export interface TimeToCompleteData {
  period_days: number;
  avg_minutes: {
    search_to_reserve: number;
    reserve_to_pay: number;
    search_to_pay: number;
  };
}

// Component Props Types
export interface ComponentProps {
  selectedPeriod: string;
}

// Transformed Data Types for UI
export interface TransformedMetricData extends MetricData {}

export interface TransformedChartData extends ChartDataPoint {}

export interface TransformedTableData extends TableData {}

// TanStack Query types are imported at the top

// Specific Hook Return Types
export interface ExecutiveSummaryHookReturn {
  funnelData: UseQueryResult<FunnelData>;
  averageFare: UseQueryResult<AverageFareData>;
  monthlyRevenue: UseQueryResult<MonthlyRevenueData>;
  lifetimeValue: UseQueryResult<LifetimeValueData>;
  revenuePerUser: UseQueryResult<RevenuePerUserData>;
  paymentSuccess: UseQueryResult<PaymentSuccessData>;
  anticipation: UseQueryResult<AnticipationData>;
  isLoading: boolean;
  isError: boolean;
}

export interface OperationsHookReturn {
  funnelData: UseQueryResult<FunnelData>;
  paymentSuccess: UseQueryResult<PaymentSuccessData>;
  timeToComplete: UseQueryResult<TimeToCompleteData>;
  cancellationRate: UseQueryResult<CancellationRateData>;
  popularAirlines: UseQueryResult<PopularAirlinesData>;
  isLoading: boolean;
  isError: boolean;
}

export interface AnalyticsHookReturn {
  bookingHours: UseQueryResult<BookingHoursData>;
  userOrigins: UseQueryResult<UserOriginsData>;
  paymentSuccess: UseQueryResult<PaymentSuccessData>;
  anticipation: UseQueryResult<AnticipationData>;
  isLoading: boolean;
  isError: boolean;
}

export interface PopularAirlinesHookReturn {
  data?: PopularAirlinesData;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
}
