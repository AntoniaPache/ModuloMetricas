import React from 'react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import DataTable from './DataTable';
import {
  getDataByPeriod,
  MonthlyData,
  getPaymentMetricsByPeriod,
  getFleetMetricsByPeriod,
  getSeatOccupancyByClassByPeriod,
  airportData
} from '../data/mockData';

interface ExecutiveSummaryProps {
  selectedPeriod: string;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ selectedPeriod }) => {
  // Obtener datos según el período seleccionado
  const currentData: MonthlyData = getDataByPeriod(selectedPeriod);
  const paymentMetrics = getPaymentMetricsByPeriod(selectedPeriod);
  const fleetMetrics = getFleetMetricsByPeriod(selectedPeriod);
  const seatOccupancyData = getSeatOccupancyByClassByPeriod(selectedPeriod);

  // Preparar datos de ocupación de asientos para el gráfico
  const seatOccupancyChart = seatOccupancyData.map(item => ({
    name: item.class,
    value: item.occupancyRate,
    occupied: item.occupied,
    available: item.available
  }));

  // Preparar datos de aeropuertos (top 5 por ingresos)
  const topAirports = airportData
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const airportColumns = [
    { key: 'code', title: 'Código', render: (value: string) => <span className="airport-code">{value}</span> },
    { key: 'city', title: 'Ciudad' },
    { key: 'departures', title: 'Salidas', render: (value: number) => value.toLocaleString('es-ES') },
    { key: 'arrivals', title: 'Llegadas', render: (value: number) => value.toLocaleString('es-ES') },
    { key: 'revenue', title: 'Ingresos', render: (value: number) => `$${value}M` }
  ];

  return (
    <div className="tab-content">

      {/* Métricas de Ingresos y Reservas */}
      <section className="metrics-section">
        <h2 className="section-title">Rendimiento Financiero del Sistema de Reservas</h2>
        <div className="grid grid-cols-5">
          {currentData.revenueMetrics.map((metric, index) => (
            <MetricCard key={`revenue-${selectedPeriod}-${index}`} metric={metric} />
          ))}
        </div>
      </section>

      {/* Métricas Operativas de Flota y Pagos */}
      <section className="metrics-section">
        <h2 className="section-title">Excelencia Operativa</h2>
        <div className="grid grid-cols-7">
          {fleetMetrics.slice(0, 4).map((metric, index) => (
            <MetricCard key={`fleet-${selectedPeriod}-${index}`} metric={metric} />
          ))}
          {paymentMetrics.map((metric, index) => (
            <MetricCard key={`payment-${selectedPeriod}-${index}`} metric={metric} />
          ))}
        </div>
      </section>

      {/* Evolución de Búsquedas vs Reservas y Ocupación de Asientos */}
      <section className="metrics-section">
        <div className="grid grid-cols-2">
          <ChartCard 
            title="Evolución de Búsquedas vs Reservas"
            data={currentData.searchConversionTrend}
            type="area"
            height={400}
            valueKey="searches"
            valueKey2="bookings"
            color="#507BD8"
            color2="#34D399"
          />
          <ChartCard 
            title="Ocupación por Clase de Asiento (%)"
            data={seatOccupancyChart}
            type="bar"
            height={400}
            valueKey="value"
            color="#F59E0B"
          />
        </div>
      </section>

      {/* Rendimiento de Aeropuertos y Tendencia de Ingresos */}
      <section className="metrics-section">
        <div className="grid grid-cols-2">
          <DataTable 
            title="Aeropuertos Principales por Ingresos"
            data={topAirports}
            columns={airportColumns}
            maxRows={5}
          />
          <ChartCard 
            title="Ingresos Semanales ($M)"
            data={currentData.monthlyRevenue}
            type="line"
            height={400}
            valueKey="value"
            color="#10B981"
          />
        </div>
      </section>

      {/* Compromiso y Retención de Usuarios */}
      <section className="metrics-section">
        <h2 className="section-title">Experiencia del Usuario y Retención</h2>
        <div className="grid grid-cols-5">
          {currentData.engagementMetrics.map((metric, index) => (
            <MetricCard key={`engagement-${selectedPeriod}-${index}`} metric={metric} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExecutiveSummary;
