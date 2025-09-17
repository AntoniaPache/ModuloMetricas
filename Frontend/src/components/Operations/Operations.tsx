import React from 'react';
import { MetricCard, ChartCard } from '../Common';
import { MetricCardSkeleton, ChartCardSkeleton } from '../Skeletons';
import { useOperations } from '../../hooks/useAnalytics';
import { 
  ComponentProps, 
  MetricData, 
  ChartDataPoint
} from '../../types/dashboard';
import '../../components/LoadingStates.css';

interface OperationsProps extends ComponentProps {}

const Operations: React.FC<OperationsProps> = ({ selectedPeriod }) => {
  // Convert selectedPeriod to days for API calls
  const getDaysFromPeriod = (period: string): number => {
    return parseInt(period, 10) || 30; // Default to 30 days if parsing fails
  };

  const days = getDaysFromPeriod(selectedPeriod);
  
  // Use TanStack Query hooks for real-time data
  const {
    funnelData,
    paymentSuccess,
    timeToComplete,
    cancellationRate,
    popularAirlines,
    isLoading: apiLoading,
    isError: apiError
  } = useOperations(days);

  // Transform API data to match component expectations with proper typing
  const realTimeOperationalMetrics: MetricData[] = [
    {
      title: "Búsqueda → Reserva",
      value: funnelData?.data?.conversion?.search_to_reserve?.toFixed(1) || "0.0",
      unit: "%",
      change: 0
    },
    {
      title: "Tasa de Éxito de Pago",
      value: paymentSuccess?.data?.success_rate_percent?.toFixed(1) || "0.0",
      unit: "%",
      change: 0
    },
    {
      title: "Tiempo de Reserva",
      value: timeToComplete?.data?.avg_minutes?.search_to_reserve?.toFixed(1) || "0.0",
      unit: "min",
      change: 0
    }
  ];

  const realTimeFlightMetrics: MetricData[] = [
    {
      title: "Tasa de Cancelación",
      value: cancellationRate?.data?.cancellation_rate_percent?.toFixed(1) || "0.0",
      unit: "%",
      change: 0
    },
    {
      title: "Tiempo de Pago a Reserva",
      value: timeToComplete?.data?.avg_minutes?.reserve_to_pay?.toFixed(1) || "0.0",
      unit: "min",
      change: 0
    },
    {
      title: "Tiempo Total de Reserva",
      value: timeToComplete?.data?.avg_minutes?.search_to_pay?.toFixed(1) || "0.0",
      unit: "min",
      change: 0
    }
  ];

  // Create popular airlines data from API with proper typing
  const popularAirlinesData: ChartDataPoint[] = popularAirlines?.data?.popular_airlines?.map((airline: { airlineCode: string; count: number; avg_price: number }) => ({
    name: airline.airlineCode,
    value: airline.count,
    avgPrice: airline.avg_price,
    count: airline.count
  })) || [];

  // Create cancellation data from API with proper typing
  const cancellationData: ChartDataPoint[] = popularAirlines?.data?.popular_airlines?.map((airline: { airlineCode: string; count: number }) => ({
    name: airline.airlineCode,
    value: 0, // This would need a separate API call for cancellation rates per airline
    count: airline.count
  })) || [];

  // Show loading state with skeleton
  if (apiLoading) {
    return (
      <div className="tab-content">
        {/* Booking System Performance Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Rendimiento del Sistema de Reservas</h2>
          <div className="grid grid-cols-3">
            <MetricCardSkeleton count={3} />
          </div>
        </section>

        {/* Flight Operations Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Operaciones de Vuelo y Disponibilidad</h2>
          <div className="grid grid-cols-3">
            <MetricCardSkeleton count={3} />
          </div>
        </section>

        {/* Popular Airlines Distribution Skeleton */}
        <section className="metrics-section">
          <div className="grid grid-cols-1">
            <ChartCardSkeleton height={350} type="pie" />
          </div>
        </section>

        {/* Cancellation Analysis Skeleton */}
        <section className="metrics-section">
          <ChartCardSkeleton height={300} type="bar" />
        </section>
      </div>
    );
  }

  // Show error state
  if (apiError) {
    return (
      <div className="tab-content">
        <div className="error-container">
          <p>Error loading operations data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      {/* Booking System Performance */}
      <section className="metrics-section">
        <h2 className="section-title">Rendimiento del Sistema de Reservas</h2>
        <div className="grid grid-cols-3">
          {realTimeOperationalMetrics.map((metric, index) => (
            <MetricCard key={`operational-${index}`} metric={metric} />
          ))}
        </div>
      </section>

      {/* Flight Operations and Availability */}
      <section className="metrics-section">
        <h2 className="section-title">Operaciones de Vuelo y Disponibilidad</h2>
        <div className="grid grid-cols-3">
          {realTimeFlightMetrics.map((metric, index) => (
            <MetricCard key={`flight-${index}`} metric={metric} />
          ))}
        </div>
      </section>

      {/* Popular Airlines Distribution */}
      <section className="metrics-section">
        <div className="grid grid-cols-1">
          <ChartCard 
            title="Distribución de Aerolíneas Populares"
            data={popularAirlinesData}
            type="pie"
            height={350}
            valueKey="value"
          />
        </div>
      </section>

      {/* Cancellation Analysis */}
      <section className="metrics-section">
        <ChartCard 
          title="Análisis de Tasa de Cancelación"
          data={cancellationData}
          type="bar"
          height={300}
          valueKey="value"
          color="#EF4444"
        />
      </section>
    </div>
  );
};

export default Operations;
