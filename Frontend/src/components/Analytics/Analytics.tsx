import React from 'react';
import { ChartCard, DataTable } from '../Common';
import { ChartCardSkeleton, DataTableSkeleton } from '../Skeletons';
import { useAnalytics } from '../../hooks/useAnalytics';
import { 
  ComponentProps, 
  ChartDataPoint,
  TableColumn
} from '../../types/dashboard';
import '../../components/LoadingStates.css';

interface AnalyticsProps extends ComponentProps {}

const Analytics: React.FC<AnalyticsProps> = ({ selectedPeriod }) => {
  // Convert selectedPeriod to days for API calls
  const getDaysFromPeriod = (period: string): number => {
    return parseInt(period, 10) || 30; // Default to 30 days if parsing fails
  };

  const days = getDaysFromPeriod(selectedPeriod);
  
  // Use TanStack Query hooks for real-time data
  const {
    bookingHours,
    userOrigins,
    paymentSuccess,
    anticipation,
    isLoading: apiLoading,
    isError: apiError
  } = useAnalytics(days);

  // Create booking hours data from API with proper typing
  const bookingHoursData: ChartDataPoint[] = bookingHours?.data?.histogram?.map((item: { hour_utc: number; count: number }) => ({
    name: `${item.hour_utc}:00`,
    value: item.count,
    hour: item.hour_utc,
    count: item.count
  })) || [];

  // Create user origins data from API with proper typing
  const userOriginsData: ChartDataPoint[] = userOrigins?.data?.user_origins?.map((origin: { country: string; users: number }) => ({
    name: origin.country,
    value: origin.users,
    country: origin.country,
    users: origin.users
  })) || [];

  // Create payment success data from API with proper typing
  const paymentSuccessData: ChartDataPoint[] = [
    {
      name: "Aprobado",
      value: paymentSuccess?.data?.approved || 0,
      count: paymentSuccess?.data?.approved || 0
    },
    {
      name: "Rechazado",
      value: paymentSuccess?.data?.rejected || 0,
      count: paymentSuccess?.data?.rejected || 0
    }
  ];

  // Create anticipation data from API with proper typing
  const anticipationData: ChartDataPoint[] = [
    {
      name: "Anticipación Promedio",
      value: anticipation?.data?.avg_anticipation_days || 0,
      days: anticipation?.data?.avg_anticipation_days || 0
    }
  ];
  
  // Create columns for user origins table with proper typing
  const userOriginsColumns: TableColumn[] = [
    { key: 'country', title: 'País' },
    { key: 'users', title: 'Usuarios', render: (value: number) => value.toLocaleString() }
  ];

  // Show loading state with skeleton
  if (apiLoading) {
    return (
      <div className="tab-content">
        {/* User Activity Analysis Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Análisis de Comportamiento del Usuario</h2>
          <ChartCardSkeleton height={300} type="bar" />
        </section>

        {/* Payment Success Analysis Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Análisis de Éxito de Pago</h2>
          <div className="grid grid-cols-1">
            <ChartCardSkeleton height={300} type="pie" />
          </div>
        </section>

        {/* User Origins Analysis Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Análisis de Orígenes del Usuario</h2>
          <div className="grid grid-cols-2">
            <ChartCardSkeleton height={300} type="pie" />
            <DataTableSkeleton rows={8} columns={2} />
          </div>
        </section>

        {/* Anticipation Analysis Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Análisis de Anticipación de Reserva</h2>
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
          <p>Error loading analytics data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      {/* User Activity Analysis */}
      <section className="metrics-section">
        <h2 className="section-title">Análisis de Comportamiento del Usuario</h2>
        <ChartCard 
          title="Actividad de Reserva por Hora (UTC)"
          data={bookingHoursData}
          type="bar"
          height={300}
          valueKey="value"
          color="#34D399"
        />
      </section>

      {/* Payment Success Analysis */}
      <section className="metrics-section">
        <h2 className="section-title">Análisis de Éxito de Pago</h2>
        <div className="grid grid-cols-1">
          <ChartCard 
            title="Tasa de Éxito de Pago"
            data={paymentSuccessData}
            type="pie"
            height={300}
            valueKey="value"
          />
        </div>
      </section>

      {/* User Origins Analysis */}
      <section className="metrics-section">
        <h2 className="section-title">Análisis de Orígenes del Usuario</h2>
        <div className="grid grid-cols-2">
          <ChartCard 
            title="Orígenes del Usuario por País"
            data={userOriginsData}
            type="pie"
            height={300}
            valueKey="value"
          />
          <DataTable 
            title="Top Orígenes del Usuario"
            data={userOriginsData}
            columns={userOriginsColumns}
            maxRows={8}
          />
        </div>
      </section>

      {/* Anticipation Analysis */}
      <section className="metrics-section">
        <h2 className="section-title">Análisis de Anticipación de Reserva</h2>
        <div className="grid grid-cols-1">
          <ChartCard 
            title="Anticipación Promedio de Reserva (Días)"
            data={anticipationData}
            type="bar"
            height={300}
            valueKey="value"
            color="#F59E0B"
          />
        </div>
      </section>
    </div>
  );
};

export default Analytics;