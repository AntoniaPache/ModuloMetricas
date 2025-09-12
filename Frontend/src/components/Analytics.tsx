import React from 'react';
import ChartCard from './ChartCard';
import DataTable from './DataTable';
import {
  getDailyActiveUsersByPeriod,
  getDestinationsByContinentByPeriod,
  getTopCountriesByPeriod,
  getPopularDatesByPeriod,
  getBookingAdvanceTimeByPeriod,
  getPaymentMethodsByPeriod,
  getSeatOccupancyByClassByPeriod
} from '../data/mockData';

interface AnalyticsProps {
  selectedPeriod: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ selectedPeriod }) => {
  // Obtener datos dinámicos basados en el período seleccionado
  const dailyActiveUsers = getDailyActiveUsersByPeriod(selectedPeriod);
  const destinationsByContinent = getDestinationsByContinentByPeriod(selectedPeriod);
  const topCountries = getTopCountriesByPeriod(selectedPeriod);
  const popularDates = getPopularDatesByPeriod(selectedPeriod);
  const bookingAdvanceTime = getBookingAdvanceTimeByPeriod(selectedPeriod);
  const paymentMethods = getPaymentMethodsByPeriod(selectedPeriod);
  const seatOccupancyData = getSeatOccupancyByClassByPeriod(selectedPeriod);
  
  const countryColumns = [
    { key: 'country', title: 'País' },
    { key: 'continent', title: 'Continente', render: (value: string) => <span className="continent-badge">{value}</span> },
    { key: 'bookings', title: 'Reservas', render: (value: number) => value.toLocaleString('es-ES') },
    { key: 'type', title: 'Tipo', render: (value: string) => <span className={`type-badge ${value}`}>{value === 'origin' ? 'Origen' : 'Destino'}</span> }
  ];

  const paymentColumns = [
    { key: 'method', title: 'Método de Pago' },
    { key: 'transactions', title: 'Transacciones', render: (value: number) => value.toLocaleString('es-ES') },
    { key: 'revenue', title: 'Ingresos', render: (value: number) => `$${value}M` },
    { key: 'successRate', title: 'Tasa Éxito', render: (value: number) => `${value}%` }
  ];

  // Preparar datos de métodos de pago para gráficos
  const paymentRevenueChart = paymentMethods.map(item => ({
    name: item.method,
    value: item.revenue
  }));

  const paymentTransactionsChart = paymentMethods.map(item => ({
    name: item.method.split(' ')[0], // Tomar solo la primera palabra para el eje
    value: item.transactions
  }));

  // Preparar datos detallados de ocupación de asientos
  const seatAnalysisChart = seatOccupancyData.map(item => ({
    name: item.class,
    value: item.occupancyRate, // Requerido por ChartData interface
    occupancyRate: item.occupancyRate,
    occupied: item.occupied,
    available: item.available - item.occupied
  }));

  return (
    <div className="tab-content">
      {/* Actividad de Usuarios */}
      <section className="metrics-section">
        <h2 className="section-title">Análisis de Comportamiento de Usuarios</h2>
        <ChartCard 
          title="Usuarios Activos Diarios por Día de la Semana"
          data={dailyActiveUsers}
          type="bar"
          height={300}
          valueKey="value"
          color="#34D399"
        />
      </section>

      {/* Análisis de Métodos de Pago */}
      <section className="metrics-section">
        <h2 className="section-title">Análisis de Métodos de Pago</h2>
        <div className="grid grid-cols-2">
          <ChartCard 
            title="Ingresos por Método de Pago ($M)"
            data={paymentRevenueChart}
            type="pie"
            height={350}
            valueKey="value"
          />
          <DataTable 
            title="Rendimiento de Métodos de Pago"
            data={paymentMethods}
            columns={paymentColumns}
            maxRows={6}
          />
        </div>
      </section>

      {/* Análisis de Ocupación de Asientos */}
      <section className="metrics-section">
        <h2 className="section-title">Análisis de Clases de Asientos</h2>
        <div className="grid grid-cols-2">
          <ChartCard 
            title="Tasa de Ocupación por Clase (%)"
            data={seatAnalysisChart}
            type="bar"
            height={300}
            valueKey="occupancyRate"
            color="#8B5CF6"
          />
          <ChartCard 
            title="Transacciones por Método de Pago"
            data={paymentTransactionsChart}
            type="bar"
            height={300}
            valueKey="value"
            color="#06B6D4"
          />
        </div>
      </section>

      {/* Análisis Geográfico */}
      <section className="metrics-section">
        <h2 className="section-title">Análisis Geográfico de Destinos</h2>
        <div className="grid grid-cols-2">
          <ChartCard 
            title="Distribución de Destinos por Continente (%)"
            data={destinationsByContinent}
            type="pie"
            height={350}
            valueKey="value"
          />
          <DataTable 
            title="Países Más Frecuentes en Reservas"
            data={topCountries}
            columns={countryColumns}
            maxRows={8}
          />
        </div>
      </section>

      {/* Análisis Temporal de Reservas */}
      <section className="metrics-section">
        <h2 className="section-title">Patrones Temporales de Reservas</h2>
        <div className="grid grid-cols-2">
          <ChartCard 
            title="Preferencia de Días para Viajar (%)"
            data={popularDates}
            type="bar"
            height={300}
            valueKey="value"
            color="#F59E0B"
          />
          <ChartCard 
            title="Planificación: Tiempo de Anticipación (%)"
            data={bookingAdvanceTime}
            type="bar"
            height={300}
            valueKey="value"
            color="#EF4444"
          />
        </div>
      </section>
    </div>
  );
};

export default Analytics;
