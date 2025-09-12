import React from 'react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import DataTable from './DataTable';
import {
  getOperationalMetricsByPeriod,
  getFlightOperationsMetricsByPeriod,
  getPopularRoutesByPeriod,
  getCancellationsByAirlineByPeriod,
  getAircraftByAirlineByPeriod,
  getSeatOccupancyByClassByPeriod,
  airportData
} from '../data/mockData';

interface OperationsProps {
  selectedPeriod: string;
}

const Operations: React.FC<OperationsProps> = ({ selectedPeriod }) => {
  // Obtener datos dinámicos basados en el período seleccionado
  const operationalMetrics = getOperationalMetricsByPeriod(selectedPeriod);
  const flightOperationsMetrics = getFlightOperationsMetricsByPeriod(selectedPeriod);
  const popularRoutes = getPopularRoutesByPeriod(selectedPeriod);
  const cancellationsByAirline = getCancellationsByAirlineByPeriod(selectedPeriod);
  const aircraftByAirline = getAircraftByAirlineByPeriod(selectedPeriod);
  const seatOccupancyData = getSeatOccupancyByClassByPeriod(selectedPeriod);

  // Preparar datos de aeropuertos operativos (solo nacionales)
  const nationalAirports = airportData.filter(airport => airport.country === 'España');
  
  const routeColumns = [
    { key: 'route', title: 'Ruta', render: (value: string) => <span className="route-badge">{value}</span> },
    { key: 'origin', title: 'Origen' },
    { key: 'destination', title: 'Destino' },
    { key: 'bookings', title: 'Reservas', render: (value: number) => value.toLocaleString('es-ES') },
    { key: 'revenue', title: 'Ingresos', render: (value: number) => `$${value}M` }
  ];

  const airportColumns = [
    { key: 'code', title: 'Código', render: (value: string) => <span className="airport-code">{value}</span> },
    { key: 'city', title: 'Ciudad' },
    { key: 'departures', title: 'Salidas', render: (value: number) => value.toLocaleString('es-ES') },
    { key: 'arrivals', title: 'Llegadas', render: (value: number) => value.toLocaleString('es-ES') }
  ];

  // Convertir datos de ocupación de asientos para gráfico
  const seatAvailabilityChart = seatOccupancyData.map(item => ({
    name: item.class,
    value: item.available - item.occupied, // Requerido por ChartData interface
    available: item.available - item.occupied,
    occupied: item.occupied,
    total: item.available
  }));

  return (
    <div className="tab-content">
      {/* Métricas de Reservas y Conversión */}
      <section className="metrics-section">
        <h2 className="section-title">Rendimiento del Sistema de Reservas</h2>
        <div className="grid grid-cols-3">
          {operationalMetrics.map((metric, index) => (
            <MetricCard key={`operational-${index}`} metric={metric} />
          ))}
        </div>
      </section>

      {/* Operaciones de Vuelo y Disponibilidad */}
      <section className="metrics-section">
        <h2 className="section-title">Gestión de Vuelos y Disponibilidad</h2>
        <div className="grid grid-cols-3">
          {flightOperationsMetrics.map((metric, index) => (
            <MetricCard key={`flight-${index}`} metric={metric} />
          ))}
        </div>
      </section>

      {/* Distribución de Flota y Disponibilidad de Asientos */}
      <section className="metrics-section">
        <div className="grid grid-cols-2">
          <ChartCard 
            title="Distribución de Aviones por Aerolínea"
            data={aircraftByAirline}
            type="pie"
            height={350}
            valueKey="value"
          />
          <ChartCard 
            title="Disponibilidad de Asientos por Clase"
            data={seatAvailabilityChart}
            type="bar"
            height={350}
            valueKey="available"
            valueKey2="occupied"
            color="#10B981"
            color2="#EF4444"
          />
        </div>
      </section>

      {/* Rutas Populares y Aeropuertos Nacionales */}
      <section className="metrics-section">
        <div className="grid grid-cols-2">
          <DataTable 
            title="Rutas Más Populares"
            data={popularRoutes}
            columns={routeColumns}
            maxRows={8}
          />
          <DataTable 
            title="Aeropuertos Nacionales - Operaciones"
            data={nationalAirports}
            columns={airportColumns}
            maxRows={8}
          />
        </div>
      </section>

      {/* Análisis de Cancelaciones por Aerolínea */}
      <section className="metrics-section">
        <ChartCard 
          title="Tasa de Cancelación por Aerolínea (%)"
          data={cancellationsByAirline}
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
