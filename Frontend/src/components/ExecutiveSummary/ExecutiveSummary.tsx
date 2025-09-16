import React from 'react';
import { MetricCard, ChartCard } from '../Common';
import { MetricCardSkeleton, ChartCardSkeleton } from '../Skeletons';
import { useExecutiveSummary } from '../../hooks/useAnalytics';
import { 
  ComponentProps, 
  MetricData, 
  ChartDataPoint
} from '../../types/dashboard';
import '../../components/LoadingStates.css';

interface ExecutiveSummaryProps extends ComponentProps {}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ selectedPeriod }) => {
  // Convert selectedPeriod to days for API calls
  const getDaysFromPeriod = (period: string): number => {
    // For now, return 30 days for any period
    // You can implement more sophisticated logic based on your needs
    return 30;
  };

  const days = getDaysFromPeriod(selectedPeriod);
  
  // Use TanStack Query hooks for real-time data
  const {
    funnelData,
    averageFare,
    monthlyRevenue,
    lifetimeValue,
    revenuePerUser,
    paymentSuccess,
    anticipation,
    isLoading: apiLoading,
    isError: apiError
  } = useExecutiveSummary(days);

  // Transform API data to match component expectations with proper typing
  const realTimeMetrics: MetricData[] = [
    {
      title: "Conversion Rate",
      value: funnelData?.data?.conversion?.search_to_pay?.toFixed(1) || "0.0",
      unit: "%",
      change: 0 // This would come from comparison with previous period
    },
    {
      title: "Average Booking Value",
      value: `$${averageFare?.data?.avg_fare?.toFixed(0) || "0"}`,
      change: 0
    },
    {
      title: "Monthly Revenue",
      value: `$${monthlyRevenue?.data?.monthly?.reduce((sum: number, month: { revenue: number }) => sum + month.revenue, 0)?.toFixed(1) || "0"}M`,
      change: 0
    },
    {
      title: "Lifetime Value",
      value: `$${lifetimeValue?.data?.ltv?.[0]?.total_spend?.toFixed(0) || "0"}`,
      change: 0
    },
    {
      title: "Revenue per User",
      value: `$${revenuePerUser?.data?.revenue_per_user?.[0]?.revenue?.toFixed(0) || "0"}`,
      change: 0
    }
  ];

  // Create operational metrics from API data with proper typing
  const operationalMetrics: MetricData[] = [
    {
      title: "Payment Success Rate",
      value: paymentSuccess?.data?.success_rate_percent?.toFixed(1) || "0.0",
      unit: "%",
      change: 0
    },
    {
      title: "Average Anticipation",
      value: `${anticipation?.data?.avg_anticipation_days?.toFixed(0) || "0"}`,
      unit: "days",
      change: 0
    }
  ];

  // Create revenue trend data from monthly revenue with proper typing
  const revenueTrendData: ChartDataPoint[] = monthlyRevenue?.data?.monthly?.map((month: { ym: string; revenue: number; payments: number }) => ({
    name: month.ym,
    value: month.revenue / 1000000, // Convert to millions
    revenue: month.revenue,
    payments: month.payments
  })) || [];

  // Create user engagement metrics from API data with proper typing
  const engagementMetrics: MetricData[] = [
    {
      title: "Total Searches",
      value: funnelData?.data?.searches?.toLocaleString() || "0",
      change: 0
    },
    {
      title: "Total Reservations",
      value: funnelData?.data?.reservations?.toLocaleString() || "0",
      change: 0
    },
    {
      title: "Total Payments",
      value: funnelData?.data?.payments?.toLocaleString() || "0",
      change: 0
    },
    {
      title: "Search to Reserve",
      value: funnelData?.data?.conversion?.search_to_reserve?.toFixed(1) || "0.0",
      unit: "%",
      change: 0
    },
    {
      title: "Reserve to Pay",
      value: funnelData?.data?.conversion?.reserve_to_pay?.toFixed(1) || "0.0",
      unit: "%",
      change: 0
    }
  ];

  // Show loading state with skeleton
  if (apiLoading) {
    return (
      <div className="tab-content">
        {/* Financial Performance Metrics Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Financial Performance of Booking System</h2>
          <div className="grid grid-cols-5">
            <MetricCardSkeleton count={5} />
          </div>
        </section>

        {/* Operational Excellence Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">Operational Excellence</h2>
          <div className="grid grid-cols-2">
            <MetricCardSkeleton count={2} />
          </div>
        </section>

        {/* Revenue Trend Skeleton */}
        <section className="metrics-section">
          <div className="grid grid-cols-1">
            <ChartCardSkeleton height={400} type="line" />
          </div>
        </section>

        {/* User Engagement Skeleton */}
        <section className="metrics-section">
          <h2 className="section-title">User Experience and Retention</h2>
          <div className="grid grid-cols-5">
            <MetricCardSkeleton count={5} />
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
          <p>Error loading data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      {/* Financial Performance Metrics */}
      <section className="metrics-section">
        <h2 className="section-title">Financial Performance of Booking System</h2>
        <div className="grid grid-cols-5">
          {realTimeMetrics.map((metric, index) => (
            <MetricCard key={`revenue-${selectedPeriod}-${index}`} metric={metric} />
          ))}
        </div>
      </section>

      {/* Operational Excellence */}
      <section className="metrics-section">
        <h2 className="section-title">Operational Excellence</h2>
        <div className="grid grid-cols-2">
          {operationalMetrics.map((metric, index) => (
            <MetricCard key={`operational-${selectedPeriod}-${index}`} metric={metric} />
          ))}
        </div>
      </section>

      {/* Revenue Trend */}
      <section className="metrics-section">
        <div className="grid grid-cols-1">
          <ChartCard 
            title="Monthly Revenue Trend ($M)"
            data={revenueTrendData}
            type="line"
            height={400}
            valueKey="value"
            color="#10B981"
          />
        </div>
      </section>

      {/* User Engagement and Retention */}
      <section className="metrics-section">
        <h2 className="section-title">User Experience and Retention</h2>
        <div className="grid grid-cols-5">
          {engagementMetrics.map((metric, index) => (
            <MetricCard key={`engagement-${selectedPeriod}-${index}`} metric={metric} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExecutiveSummary;
