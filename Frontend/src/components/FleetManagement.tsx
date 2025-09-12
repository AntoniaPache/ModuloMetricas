import React from 'react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import DataTable from './DataTable';
import {
  getFleetMetricsByPeriod,
  getAircraftByAirlineByPeriod,
  getSeatOccupancyByClassByPeriod,
  airportData
} from '../data/mockData';

interface FleetManagementProps {
  selectedPeriod: string;
}

const FleetManagement: React.FC<FleetManagementProps> = ({ selectedPeriod }) => {
  // Obtener datos dinámicos basados en el período seleccionado
  const fleetMetrics = getFleetMetricsByPeriod(selectedPeriod);
  const aircraftByAirline = getAircraftByAirlineByPeriod(selectedPeriod);
  const seatOccupancyData = getSeatOccupancyByClassByPeriod(selectedPeriod);

  // Preparar datos sintéticos de detalle de flota (simulando conexión con API de aviones)
  const fleetDetails = [
    { aircraftId: 'IB-2401', airline: 'Iberia', model: 'A350-900', totalSeats: 348, status: 'Activo', utilization: 92.5, route: 'MAD-JFK' },
    { aircraftId: 'VY-8301', airline: 'Vueling', model: 'A320-200', totalSeats: 180, status: 'Activo', utilization: 87.3, route: 'BCN-ROM' },
    { aircraftId: 'UX-1205', airline: 'Air Europa', model: 'B787-8', totalSeats: 296, status: 'Mantenimiento', utilization: 0, route: '-' },
    { aircraftId: 'FR-4502', airline: 'Ryanair', model: 'B737-800', totalSeats: 189, status: 'Activo', utilization: 76.8, route: 'MAD-DUB' },
    { aircraftId: 'LH-7801', airline: 'Lufthansa', model: 'A340-600', totalSeats: 379, status: 'Activo', utilization: 94.2, route: 'MAD-FRA' }
  ];

  // Preparar datos de asientos detallados por avión (simulando API de asientos)
  const seatDistribution = [
    { airline: 'Iberia', firstClass: 580, business: 2850, economy: 15420, total: 18850 },
    { airline: 'Vueling', firstClass: 0, business: 1240, economy: 8920, total: 10160 },
    { airline: 'Air Europa', firstClass: 170, business: 1820, economy: 6800, total: 8790 },
    { airline: 'Ryanair', firstClass: 0, business: 0, economy: 4950, total: 4950 },
    { airline: 'Lufthansa', firstClass: 280, business: 1680, economy: 3240, total: 5200 }
  ];

  const fleetColumns = [
    { key: 'aircraftId', title: 'ID Avión', render: (value: string) => <span className="aircraft-id">{value}</span> },
    { key: 'airline', title: 'Aerolínea' },
    { key: 'model', title: 'Modelo' },
    { key: 'totalSeats', title: 'Asientos', render: (value: number) => value.toLocaleString('es-ES') },
    { key: 'status', title: 'Estado', render: (value: string) => 
      <span className={`status-badge ${value.toLowerCase()}`}>
        {value === 'Activo' ? '🟢 Activo' : value === 'Mantenimiento' ? '🟡 Mantenimiento' : '🔴 Inactivo'}
      </span> 
    },
    { key: 'utilization', title: 'Utilización', render: (value: number) => `${value}%` },
    { key: 'route', title: 'Ruta Actual' }
  ];

  const seatColumns = [
    { key: 'airline', title: 'Aerolínea' },
    { key: 'firstClass', title: 'First Class', render: (value: number) => value.toLocaleString('es-ES') },
    { key: 'business', title: 'Business', render: (value: number) => value.toLocaleString('es-ES') },
    { key: 'economy', title: 'Economy', render: (value: number) => value.toLocaleString('es-ES') },
    { key: 'total', title: 'Total', render: (value: number) => value.toLocaleString('es-ES') }
  ];

  // Preparar datos para gráficos de utilización
  const utilizationChart = aircraftByAirline.map(item => ({
    name: item.name,
    value: item.utilization,
    aircraft: item.value
  }));

  // Preparar datos de ocupación vs disponibilidad
  const occupancyDetailChart = seatOccupancyData.map(item => ({
    name: item.class,
    value: item.occupancyRate, // Requerido por ChartData interface (para ocupación)
    occupancyRate: item.occupancyRate,
    occupied: item.occupied,
    available: item.available,
    revenue: item.occupied * (item.class === 'First Class' ? 1200 : item.class === 'Business' ? 650 : 280) // Simulación precios promedio
  }));

  // Preparar datos específicos para el gráfico de ingresos
  const revenueChart = seatOccupancyData.map(item => ({
    name: item.class,
    value: item.occupied * (item.class === 'First Class' ? 1200 : item.class === 'Business' ? 650 : 280), // Requerido por ChartData interface (para ingresos)
    revenue: item.occupied * (item.class === 'First Class' ? 1200 : item.class === 'Business' ? 650 : 280),
    occupied: item.occupied
  }));

  return (
    <div className="tab-content">
      {/* Métricas Principales de Flota */}
      <section className="metrics-section">
        <h2 className="section-title">Estado General de la Flota</h2>
        <div className="grid grid-cols-4">
          {fleetMetrics.map((metric, index) => (
            <MetricCard key={`fleet-metric-${index}`} metric={metric} />
          ))}
        </div>
      </section>

      {/* Distribución de Aviones y Utilización */}
      <section className="metrics-section">
        <h2 className="section-title">Distribución y Utilización de Flota</h2>
        <div className="grid grid-cols-2">
          <ChartCard 
            title="Aviones por Aerolínea"
            data={aircraftByAirline}
            type="pie"
            height={350}
            valueKey="value"
          />
          <ChartCard 
            title="Utilización de Flota por Aerolínea (%)"
            data={utilizationChart}
            type="bar"
            height={350}
            valueKey="value"
            color="#10B981"
          />
        </div>
      </section>

      {/* Análisis Detallado de Asientos */}
      <section className="metrics-section">
        <h2 className="section-title">Análisis de Capacidad de Asientos</h2>
        <div className="grid grid-cols-2">
          <ChartCard 
            title="Tasa de Ocupación por Clase (%)"
            data={occupancyDetailChart}
            type="bar"
            height={350}
            valueKey="occupancyRate"
            color="#8B5CF6"
          />
          <DataTable 
            title="Distribución de Asientos por Aerolínea"
            data={seatDistribution}
            columns={seatColumns}
            maxRows={6}
          />
        </div>
      </section>

      {/* Detalle de Flota Individual */}
      <section className="metrics-section">
        <h2 className="section-title">Estado Detallado de Aviones</h2>
        <DataTable 
          title="Inventario Actual de Flota"
          data={fleetDetails}
          columns={fleetColumns}
          maxRows={10}
        />
      </section>

      {/* Análisis de Ingresos por Clase */}
      <section className="metrics-section">
        <h2 className="section-title">Rendimiento Financiero por Clase de Asiento</h2>
        <ChartCard 
          title="Ingresos Estimados por Clase (Miles $)"
          data={revenueChart}
          type="bar"
          height={300}
          valueKey="value"
          color="#F59E0B"
        />
      </section>
    </div>
  );
};

export default FleetManagement;
