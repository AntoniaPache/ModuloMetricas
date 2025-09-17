import React from 'react';
import { MetricCard, ChartCard, DataTable } from '../Common';
import { MetricCardSkeleton, ChartCardSkeleton, DataTableSkeleton } from '../Skeletons';
import { usePopularAirlines } from '../../hooks/useAnalytics';
import { 
  ComponentProps, 
  MetricData, 
  ChartDataPoint,
  TableColumn,
  TableData
} from '../../types/dashboard';
import '../../components/LoadingStates.css';

interface FleetManagementProps extends ComponentProps {}

const FleetManagement: React.FC<FleetManagementProps> = ({ selectedPeriod }) => {
  // Convert selectedPeriod to days for API calls
  const getDaysFromPeriod = (period: string): number => {
    return parseInt(period, 10) || 30; // Default to 30 days if parsing fails
  };

  const days = getDaysFromPeriod(selectedPeriod);
  
  // Use TanStack Query hooks for real-time data
  const { data: popularAirlinesData, isLoading: apiLoading, isError: apiError } = usePopularAirlines(days, 5);

  // Create fleet metrics from API data with proper typing
  const fleetMetrics: MetricData[] = [
    {
      title: "Total de Aerolíneas",
      value: popularAirlinesData?.popular_airlines?.length?.toString() || "0",
      change: 0
    },
    {
      title: "Total de Reservas",
      value: popularAirlinesData?.popular_airlines?.reduce((sum: number, airline: { count: number }) => sum + airline.count, 0)?.toLocaleString() || "0",
      change: 0
    },
    {
      title: "Precio Promedio",
      value: `$${popularAirlinesData?.popular_airlines?.length ? 
        (popularAirlinesData.popular_airlines.reduce((sum: number, airline: { avg_price: number }) => sum + airline.avg_price, 0) / popularAirlinesData.popular_airlines.length).toFixed(0) : 
        "0"}`,
      change: 0
    },
    {
      title: "Aerolínea Principal",
      value: popularAirlinesData?.popular_airlines?.[0]?.airlineCode || "N/A",
      change: 0
    }
  ];

  // Create popular airlines chart data from API with proper typing
  const popularAirlinesChartData: ChartDataPoint[] = popularAirlinesData?.popular_airlines?.map((airline: { airlineCode: string; count: number; avg_price: number }) => ({
    name: airline.airlineCode,
    value: airline.count,
    avgPrice: airline.avg_price,
    count: airline.count
  })) || [];

  // Create airline details table data from API with proper typing
  const airlineDetailsData: TableData[] = popularAirlinesData?.popular_airlines?.map((airline: { airlineCode: string; count: number; avg_price: number }) => ({
    airlineCode: airline.airlineCode,
    bookings: airline.count,
    avgPrice: airline.avg_price,
    revenue: airline.count * airline.avg_price
  })) || [];

  // Create columns for airline details table with proper typing
  const airlineColumns: TableColumn[] = [
    { key: 'airlineCode', title: 'Código de Aerolínea' },
    { key: 'bookings', title: 'Reservas', render: (value: number) => value.toLocaleString() },
    { key: 'avgPrice', title: 'Precio Promedio', render: (value: number) => `$${value.toFixed(0)}` },
    { key: 'revenue', title: 'Ingresos', render: (value: number) => `$${value.toLocaleString()}` }
  ];

  // Show loading state with skeleton
  if (apiLoading) {
    return (
      <div className="tab-content">
        {/* Fleet Performance Metrics Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Rendimiento de la Flota</h2>
          <div className="grid grid-cols-4">
            <MetricCardSkeleton count={4} />
          </div>
        </section>

        {/* Popular Airlines Distribution Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Distribución de Aerolíneas Populares</h2>
          <div className="grid grid-cols-1">
            <ChartCardSkeleton height={400} type="pie" />
          </div>
        </section>

        {/* Airline Performance Details Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Detalles de Rendimiento de Aerolíneas</h2>
          <div className="grid grid-cols-1">
            <DataTableSkeleton rows={10} columns={4} />
          </div>
        </section>

        {/* Average Price Analysis Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Análisis de Precios Promedio</h2>
          <div className="grid grid-cols-1">
            <ChartCardSkeleton height={300} type="bar" />
          </div>
        </section>
      </div>
    );
  }

  // Show error state
  if (apiError) {
    return (
      <div className="tab-content">
        <div className="error-container">
          <p>Error loading fleet data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      {/* Fleet Performance Metrics */}
      <section className="metrics-section">
        <h2 className="section-title">Rendimiento de la Flota</h2>
        <div className="grid grid-cols-4">
          {fleetMetrics.map((metric, index) => (
            <MetricCard key={`fleet-metric-${index}`} metric={metric} />
          ))}
        </div>
      </section>

      {/* Popular Airlines Distribution */}
      <section className="metrics-section">
        <h2 className="section-title">Distribución de Aerolíneas Populares</h2>
        <div className="grid grid-cols-1">
          <ChartCard 
            title="Aerolíneas por Volumen de Reservas"
            data={popularAirlinesChartData}
            type="pie"
            height={400}
            valueKey="value"
          />
        </div>
      </section>

      {/* Airline Performance Details */}
      <section className="metrics-section">
        <h2 className="section-title">Detalles de Rendimiento de Aerolíneas</h2>
        <div className="grid grid-cols-1">
          <DataTable 
            title="Métricas de Rendimiento de Aerolíneas"
            data={airlineDetailsData}
            columns={airlineColumns}
            maxRows={10}
          />
        </div>
      </section>

      {/* Average Price Analysis */}
      <section className="metrics-section">
        <h2 className="section-title">Análisis de Precios Promedio</h2>
        <div className="grid grid-cols-1">
          <ChartCard 
            title="Precios Promedio por Aerolínea"
            data={popularAirlinesChartData}
            type="bar"
            height={300}
            valueKey="avgPrice"
            color="#10B981"
          />
        </div>
      </section>
    </div>
  );
};

export default FleetManagement;