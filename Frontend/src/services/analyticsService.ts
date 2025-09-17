import { analyticsApi, apiRequest } from './axiosConfig';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface HealthStatus {
  status: string;
  timestamp: string;
  service: string;
  api_gateway: string;
  purpose: string;
  version: string;
}

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

export interface AverageFare {
  period_days: number;
  avg_fare: number;
}

export interface MonthlyRevenue {
  months: number;
  monthly: Array<{
    ym: string;
    revenue: number;
    payments: number;
  }>;
}

export interface LifetimeValue {
  top: number;
  ltv: Array<{
    userId: string;
    total_spend: number;
    payments: number;
  }>;
}

export interface RevenuePerUser {
  period_days: number;
  top: number;
  revenue_per_user: Array<{
    userId: string;
    revenue: number;
    payments: number;
  }>;
}

export interface PopularAirlines {
  period_days: number;
  top: number;
  popular_airlines: Array<{
    airlineCode: string;
    count: number;
    avg_price: number;
  }>;
}

export interface UserOrigins {
  period_days: number;
  top: number;
  user_origins: Array<{
    country: string;
    users: number;
  }>;
}

export interface BookingHours {
  period_days: number;
  histogram: Array<{
    hour_utc: number;
    count: number;
  }>;
}

export interface PaymentSuccess {
  period_days: number;
  approved: number;
  rejected: number;
  success_rate_percent: number;
}

export interface CancellationRate {
  period_days: number;
  created: number;
  canceled: number;
  cancellation_rate_percent: number;
}

export interface Anticipation {
  period_days: number;
  avg_anticipation_days: number;
}

export interface TimeToComplete {
  period_days: number;
  avg_minutes: {
    search_to_reserve: number;
    reserve_to_pay: number;
    search_to_pay: number;
  };
}

// =============================================================================
// ANALYTICS API FUNCTIONS
// =============================================================================

// Health Check
export const getHealthStatus = (): Promise<HealthStatus> =>
  apiRequest<HealthStatus>(analyticsApi, {
    method: 'GET',
    url: '/health',
  });

// Funnel Analytics
export const getFunnelData = (days: number = 7): Promise<FunnelData> =>
  apiRequest<FunnelData>(analyticsApi, {
    method: 'GET',
    url: '/funnel',
    params: { days },
  });

// Average Fare
export const getAverageFare = (days: number = 7): Promise<AverageFare> =>
  apiRequest<AverageFare>(analyticsApi, {
    method: 'GET',
    url: '/avg-fare',
    params: { days },
  });

// Monthly Revenue
export const getMonthlyRevenue = (months: number = 6): Promise<MonthlyRevenue> =>
  apiRequest<MonthlyRevenue>(analyticsApi, {
    method: 'GET',
    url: '/revenue-monthly',
    params: { months },
  });

// Lifetime Value
export const getLifetimeValue = (top: number = 10): Promise<LifetimeValue> =>
  apiRequest<LifetimeValue>(analyticsApi, {
    method: 'GET',
    url: '/ltv',
    params: { top },
  });

// Revenue per User
export const getRevenuePerUser = (days: number = 7, top: number = 10): Promise<RevenuePerUser> =>
  apiRequest<RevenuePerUser>(analyticsApi, {
    method: 'GET',
    url: '/revenue-per-user',
    params: { days, top },
  });

// Popular Airlines
export const getPopularAirlines = (days: number = 7, top: number = 5): Promise<PopularAirlines> =>
  apiRequest<PopularAirlines>(analyticsApi, {
    method: 'GET',
    url: '/popular-airlines',
    params: { days, top },
  });

// User Origins
export const getUserOrigins = (days: number = 7, top: number = 10): Promise<UserOrigins> =>
  apiRequest<UserOrigins>(analyticsApi, {
    method: 'GET',
    url: '/user-origins',
    params: { days, top },
  });

// Booking Hours
export const getBookingHours = (days: number = 7): Promise<BookingHours> =>
  apiRequest<BookingHours>(analyticsApi, {
    method: 'GET',
    url: '/booking-hours',
    params: { days },
  });

// Payment Success Rate
export const getPaymentSuccessRate = (days: number = 7): Promise<PaymentSuccess> =>
  apiRequest<PaymentSuccess>(analyticsApi, {
    method: 'GET',
    url: '/payment-success',
    params: { days },
  });

// Cancellation Rate
export const getCancellationRate = (days: number = 7): Promise<CancellationRate> =>
  apiRequest<CancellationRate>(analyticsApi, {
    method: 'GET',
    url: '/cancellation-rate',
    params: { days },
  });

// Anticipation
export const getAnticipation = (days: number = 90): Promise<Anticipation> =>
  apiRequest<Anticipation>(analyticsApi, {
    method: 'GET',
    url: '/anticipation',
    params: { days },
  });

// Time to Complete
export const getTimeToComplete = (days: number = 7): Promise<TimeToComplete> =>
  apiRequest<TimeToComplete>(analyticsApi, {
    method: 'GET',
    url: '/time-to-complete',
    params: { days },
  });
