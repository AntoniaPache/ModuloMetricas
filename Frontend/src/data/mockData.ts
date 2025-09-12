// Datos mock para el dashboard de métricas de reservas de vuelos

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
  icon?: string;
}

export interface FleetData {
  aircraftId: string;
  airline: string;
  model: string;
  totalSeats: number;
  firstClass: number;
  business: number;
  economy: number;
  utilization: number;
  status: 'active' | 'maintenance' | 'grounded';
}

export interface SeatOccupancyData {
  class: string;
  occupied: number;
  available: number;
  occupancyRate: number;
}

export interface PaymentMethodData {
  method: string;
  transactions: number;
  revenue: number;
  successRate: number;
}

export interface AirportData {
  code: string;
  name: string;
  city: string;
  country: string;
  departures: number;
  arrivals: number;
  revenue: number;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface RouteData {
  route: string;
  origin: string;
  destination: string;
  bookings: number;
  revenue: number;
}

export interface CountryData {
  country: string;
  continent: string;
  bookings: number;
  type: 'origin' | 'destination';
}

// Datos por mes para filtros
export interface MonthlyData {
  period: string;
  revenueMetrics: MetricCard[];
  engagementMetrics: MetricCard[];
  searchConversionTrend: ChartData[];
  monthlyRevenue: ChartData[];
}

// Datos para Enero 2025
const january2025Data: MonthlyData = {
  period: "2025-01",
  revenueMetrics: [
    {
      title: "Tasa de Conversión",
      value: "14.2",
      unit: "%",
      change: 13.6
    },
    {
      title: "Valor Promedio de Reserva",
      value: "$545",
      change: 12.4
    },
    {
      title: "Ingresos Mensuales",
      value: "$3.1M",
      change: 29.2
    },
    {
      title: "Valor del Ciclo de Vida",
      value: "$1,420",
      change: 13.6
    },
    {
      title: "Ingresos por Usuario",
      value: "$195",
      change: 16.1
    }
  ],
  engagementMetrics: [
    {
      title: "Usuarios Activos Diarios",
      value: "32,150",
      change: 26.4
    },
    {
      title: "Usuarios Activos Mensuales",
      value: "220,500",
      change: 22.3
    },
    {
      title: "Tasa de Retención",
      value: "84.2",
      unit: "%",
      change: 7.3
    },
    {
      title: "Duración de Sesión",
      value: "16.2",
      unit: "min",
      change: 11.7
    },
    {
      title: "Reservas Repetidas",
      value: "41.5",
      unit: "%",
      change: 26.5
    }
  ],
  searchConversionTrend: [
    { name: "1", value: 125000, searches: 125000, bookings: 17750, conversionRate: 14.2 },
    { name: "5", value: 132000, searches: 132000, bookings: 18744, conversionRate: 14.2 },
    { name: "10", value: 145000, searches: 145000, bookings: 20590, conversionRate: 14.2 },
    { name: "15", value: 158000, searches: 158000, bookings: 22436, conversionRate: 14.2 },
    { name: "20", value: 170000, searches: 170000, bookings: 24140, conversionRate: 14.2 },
    { name: "25", value: 185000, searches: 185000, bookings: 26270, conversionRate: 14.2 },
    { name: "31", value: 195000, searches: 195000, bookings: 27690, conversionRate: 14.2 }
  ],
  monthlyRevenue: [
    { name: "Sem 1", value: 0.8, bookings: 7200 },
    { name: "Sem 2", value: 0.9, bookings: 8100 },
    { name: "Sem 3", value: 0.8, bookings: 7800 },
    { name: "Sem 4", value: 0.6, bookings: 5400 }
  ]
};

// Datos para Febrero 2025
const february2025Data: MonthlyData = {
  period: "2025-02",
  revenueMetrics: [
    {
      title: "Tasa de Conversión",
      value: "13.8",
      unit: "%",
      change: -2.8
    },
    {
      title: "Valor Promedio de Reserva",
      value: "$520",
      change: -4.6
    },
    {
      title: "Ingresos Mensuales",
      value: "$2.9M",
      change: -6.5
    },
    {
      title: "Valor del Ciclo de Vida",
      value: "$1,385",
      change: -2.5
    },
    {
      title: "Ingresos por Usuario",
      value: "$185",
      change: -5.1
    }
  ],
  engagementMetrics: [
    {
      title: "Usuarios Activos Diarios",
      value: "29,850",
      change: -7.2
    },
    {
      title: "Usuarios Activos Mensuales",
      value: "205,400",
      change: -6.8
    },
    {
      title: "Tasa de Retención",
      value: "82.1",
      unit: "%",
      change: -2.5
    },
    {
      title: "Duración de Sesión",
      value: "15.8",
      unit: "min",
      change: -2.5
    },
    {
      title: "Reservas Repetidas",
      value: "38.9",
      unit: "%",
      change: -6.3
    }
  ],
  searchConversionTrend: [
    { name: "1", value: 115000, searches: 115000, bookings: 15870, conversionRate: 13.8 },
    { name: "5", value: 122000, searches: 122000, bookings: 16836, conversionRate: 13.8 },
    { name: "10", value: 135000, searches: 135000, bookings: 18630, conversionRate: 13.8 },
    { name: "15", value: 148000, searches: 148000, bookings: 20424, conversionRate: 13.8 },
    { name: "20", value: 160000, searches: 160000, bookings: 22080, conversionRate: 13.8 },
    { name: "25", value: 175000, searches: 175000, bookings: 24150, conversionRate: 13.8 },
    { name: "28", value: 185000, searches: 185000, bookings: 25530, conversionRate: 13.8 }
  ],
  monthlyRevenue: [
    { name: "Sem 1", value: 0.7, bookings: 6800 },
    { name: "Sem 2", value: 0.8, bookings: 7400 },
    { name: "Sem 3", value: 0.9, bookings: 8200 },
    { name: "Sem 4", value: 0.5, bookings: 4600 }
  ]
};

// Datos para Marzo 2025
const march2025Data: MonthlyData = {
  period: "2025-03",
  revenueMetrics: [
    {
      title: "Tasa de Conversión",
      value: "15.1",
      unit: "%",
      change: 9.4
    },
    {
      title: "Valor Promedio de Reserva",
      value: "$580",
      change: 11.5
    },
    {
      title: "Ingresos Mensuales",
      value: "$3.4M",
      change: 17.2
    },
    {
      title: "Valor del Ciclo de Vida",
      value: "$1,485",
      change: 7.2
    },
    {
      title: "Ingresos por Usuario",
      value: "$215",
      change: 16.2
    }
  ],
  engagementMetrics: [
    {
      title: "Usuarios Activos Diarios",
      value: "35,600",
      change: 19.3
    },
    {
      title: "Usuarios Activos Mensuales",
      value: "245,800",
      change: 19.7
    },
    {
      title: "Tasa de Retención",
      value: "86.4",
      unit: "%",
      change: 5.2
    },
    {
      title: "Duración de Sesión",
      value: "17.1",
      unit: "min",
      change: 8.2
    },
    {
      title: "Reservas Repetidas",
      value: "44.2",
      unit: "%",
      change: 13.6
    }
  ],
  searchConversionTrend: [
    { name: "1", value: 142000, searches: 142000, bookings: 21442, conversionRate: 15.1 },
    { name: "5", value: 155000, searches: 155000, bookings: 23405, conversionRate: 15.1 },
    { name: "10", value: 168000, searches: 168000, bookings: 25368, conversionRate: 15.1 },
    { name: "15", value: 182000, searches: 182000, bookings: 27482, conversionRate: 15.1 },
    { name: "20", value: 195000, searches: 195000, bookings: 29445, conversionRate: 15.1 },
    { name: "25", value: 208000, searches: 208000, bookings: 31408, conversionRate: 15.1 },
    { name: "31", value: 225000, searches: 225000, bookings: 33975, conversionRate: 15.1 }
  ],
  monthlyRevenue: [
    { name: "Sem 1", value: 0.9, bookings: 8500 },
    { name: "Sem 2", value: 1.0, bookings: 9200 },
    { name: "Sem 3", value: 0.9, bookings: 8800 },
    { name: "Sem 4", value: 0.6, bookings: 5500 }
  ]
};

// Datos para Noviembre 2024 (mes actual)
const november2024Data: MonthlyData = {
  period: "2024-11",
  revenueMetrics: [
    {
      title: "Tasa de Conversión",
      value: "12.5",
      unit: "%",
      change: 2.4
    },
    {
      title: "Valor Promedio de Reserva",
      value: "$485",
      change: 5.8
    },
    {
      title: "Ingresos Mensuales",
      value: "$2.4M",
      change: 15.2
    },
    {
      title: "Valor del Ciclo de Vida",
      value: "$1,250",
      change: 8.1
    },
    {
      title: "Ingresos por Usuario",
      value: "$168",
      change: 3.7
    }
  ],
  engagementMetrics: [
    {
      title: "Usuarios Activos Diarios",
      value: "25,432",
      change: 12.3
    },
    {
      title: "Usuarios Activos Mensuales",
      value: "180,250",
      change: 8.9
    },
    {
      title: "Tasa de Retención",
      value: "78.5",
      unit: "%",
      change: 4.2
    },
    {
      title: "Duración de Sesión",
      value: "14.5",
      unit: "min",
      change: -2.1
    },
    {
      title: "Reservas Repetidas",
      value: "32.8",
      unit: "%",
      change: 6.4
    }
  ],
  searchConversionTrend: [
    { name: "1", value: 98000, searches: 98000, bookings: 12200, conversionRate: 12.4 },
    { name: "5", value: 105000, searches: 105000, bookings: 13100, conversionRate: 12.5 },
    { name: "10", value: 120000, searches: 120000, bookings: 15000, conversionRate: 12.5 },
    { name: "15", value: 135000, searches: 135000, bookings: 17200, conversionRate: 12.7 },
    { name: "20", value: 145000, searches: 145000, bookings: 18400, conversionRate: 12.7 },
    { name: "25", value: 165000, searches: 165000, bookings: 21000, conversionRate: 12.7 },
    { name: "30", value: 180000, searches: 180000, bookings: 22900, conversionRate: 12.7 }
  ],
  monthlyRevenue: [
    { name: "Sem 1", value: 0.6, bookings: 5400 },
    { name: "Sem 2", value: 0.7, bookings: 6100 },
    { name: "Sem 3", value: 0.8, bookings: 6800 },
    { name: "Sem 4", value: 0.3, bookings: 2700 }
  ]
};

// Datos para Octubre 2024
const october2024Data: MonthlyData = {
  period: "2024-10",
  revenueMetrics: [
    {
      title: "Tasa de Conversión",
      value: "11.8",
      unit: "%",
      change: -0.7
    },
    {
      title: "Valor Promedio de Reserva",
      value: "$465",
      change: -4.1
    },
    {
      title: "Ingresos Mensuales",
      value: "$2.1M",
      change: -12.5
    },
    {
      title: "Valor del Ciclo de Vida",
      value: "$1,190",
      change: -4.8
    },
    {
      title: "Ingresos por Usuario",
      value: "$152",
      change: -9.5
    }
  ],
  engagementMetrics: [
    {
      title: "Usuarios Activos Diarios",
      value: "22,680",
      change: -10.8
    },
    {
      title: "Usuarios Activos Mensuales",
      value: "165,420",
      change: -8.2
    },
    {
      title: "Tasa de Retención",
      value: "75.2",
      unit: "%",
      change: -4.2
    },
    {
      title: "Duración de Sesión",
      value: "15.1",
      unit: "min",
      change: 4.1
    },
    {
      title: "Reservas Repetidas",
      value: "29.5",
      unit: "%",
      change: -10.1
    }
  ],
  searchConversionTrend: [
    { name: "1", value: 85000, searches: 85000, bookings: 10030, conversionRate: 11.8 },
    { name: "5", value: 92000, searches: 92000, bookings: 10856, conversionRate: 11.8 },
    { name: "10", value: 88000, searches: 88000, bookings: 10384, conversionRate: 11.8 },
    { name: "15", value: 95000, searches: 95000, bookings: 11210, conversionRate: 11.8 },
    { name: "20", value: 78000, searches: 78000, bookings: 9204, conversionRate: 11.8 },
    { name: "25", value: 82000, searches: 82000, bookings: 9676, conversionRate: 11.8 },
    { name: "31", value: 90000, searches: 90000, bookings: 10620, conversionRate: 11.8 }
  ],
  monthlyRevenue: [
    { name: "Sem 1", value: 0.5, bookings: 4800 },
    { name: "Sem 2", value: 0.6, bookings: 5200 },
    { name: "Sem 3", value: 0.6, bookings: 5400 },
    { name: "Sem 4", value: 0.4, bookings: 3600 }
  ]
};

// Datos para Septiembre 2024
const september2024Data: MonthlyData = {
  period: "2024-09",
  revenueMetrics: [
    {
      title: "Tasa de Conversión",
      value: "13.2",
      unit: "%",
      change: 5.6
    },
    {
      title: "Valor Promedio de Reserva",
      value: "$520",
      change: 7.2
    },
    {
      title: "Ingresos Mensuales",
      value: "$2.8M",
      change: 16.7
    },
    {
      title: "Valor del Ciclo de Vida",
      value: "$1,320",
      change: 5.6
    },
    {
      title: "Ingresos por Usuario",
      value: "$185",
      change: 10.1
    }
  ],
  engagementMetrics: [
    {
      title: "Usuarios Activos Diarios",
      value: "28,650",
      change: 12.6
    },
    {
      title: "Usuarios Activos Mensuales",
      value: "195,340",
      change: 8.4
    },
    {
      title: "Tasa de Retención",
      value: "81.3",
      unit: "%",
      change: 3.8
    },
    {
      title: "Duración de Sesión",
      value: "13.8",
      unit: "min",
      change: -4.8
    },
    {
      title: "Reservas Repetidas",
      value: "35.7",
      unit: "%",
      change: 8.9
    }
  ],
  searchConversionTrend: [
    { name: "1", value: 110000, searches: 110000, bookings: 14520, conversionRate: 13.2 },
    { name: "5", value: 118000, searches: 118000, bookings: 15576, conversionRate: 13.2 },
    { name: "10", value: 125000, searches: 125000, bookings: 16500, conversionRate: 13.2 },
    { name: "15", value: 132000, searches: 132000, bookings: 17424, conversionRate: 13.2 },
    { name: "20", value: 128000, searches: 128000, bookings: 16896, conversionRate: 13.2 },
    { name: "25", value: 135000, searches: 135000, bookings: 17820, conversionRate: 13.2 },
    { name: "30", value: 142000, searches: 142000, bookings: 18744, conversionRate: 13.2 }
  ],
  monthlyRevenue: [
    { name: "Sem 1", value: 0.7, bookings: 6200 },
    { name: "Sem 2", value: 0.8, bookings: 6800 },
    { name: "Sem 3", value: 0.7, bookings: 6400 },
    { name: "Sem 4", value: 0.6, bookings: 5600 }
  ]
};

// Exportar datos mensuales disponibles
export const monthlyData: MonthlyData[] = [
  january2025Data,
  february2025Data,
  march2025Data,
  november2024Data,
  october2024Data,
  september2024Data
];

// Función para obtener datos por período (simula llamada a API)
export const getDataByPeriod = (period: string): MonthlyData => {
  const data = monthlyData.find(d => d.period === period);
  return data || january2025Data; // Fallback a enero 2025 si no encuentra
};

// Exportaciones compatibles con el código existente (defaultea a enero 2025)
export const revenueMetrics: MetricCard[] = january2025Data.revenueMetrics;
export const engagementMetrics: MetricCard[] = january2025Data.engagementMetrics;
export const searchConversionTrend: ChartData[] = january2025Data.searchConversionTrend;
export const monthlyRevenue: ChartData[] = january2025Data.monthlyRevenue;

// Datos de operaciones por período
const operationsDataByPeriod: { [key: string]: any } = {
  "2025-01": {
    operationalMetrics: [
      {
        title: "Búsqueda → Reserva",
        value: "9.1",
        unit: "%",
        change: 11.0
      },
      {
        title: "Tasa de Éxito de Pago",
        value: "96.2",
        unit: "%",
        change: 1.6
      },
      {
        title: "Tiempo de Reserva",
        value: "4.2",
        unit: "min",
        change: -12.5
      }
    ],
    flightOperationsMetrics: [
      {
        title: "Tasa de Cancelación",
        value: "2.8",
        unit: "%",
        change: -12.5
      },
      {
        title: "Ocupación de Asientos",
        value: "85.7",
        unit: "%",
        change: 4.0
      },
      {
        title: "Tiempo de Anticipación",
        value: "23",
        unit: "días",
        change: 9.5
      }
    ],
    popularRoutes: [
      { route: "MAD - BCN", origin: "Madrid", destination: "Barcelona", bookings: 17200, revenue: 3.1 },
      { route: "BCN - MAD", origin: "Barcelona", destination: "Madrid", bookings: 16100, revenue: 2.9 },
      { route: "MAD - LHR", origin: "Madrid", destination: "Londres", bookings: 13400, revenue: 4.5 },
      { route: "BCN - CDG", origin: "Barcelona", destination: "París", bookings: 12800, revenue: 4.0 },
      { route: "MAD - FCO", origin: "Madrid", destination: "Roma", bookings: 10900, revenue: 3.6 },
      { route: "BCN - FRA", origin: "Barcelona", destination: "Frankfurt", bookings: 9800, revenue: 3.4 },
      { route: "MAD - LIS", origin: "Madrid", destination: "Lisboa", bookings: 9200, revenue: 2.3 },
      { route: "VLC - MAD", origin: "Valencia", destination: "Madrid", bookings: 8400, revenue: 2.0 }
    ],
    cancellationsByAirline: [
      { name: "Iberia", value: 2.0, total: 28900 },
      { name: "Vueling", value: 2.6, total: 23400 },
      { name: "Ryanair", value: 4.0, total: 31800 },
      { name: "Air Europa", value: 2.7, total: 19200 },
      { name: "Lufthansa", value: 1.6, total: 16200 },
      { name: "Air France", value: 2.2, total: 20400 },
      { name: "British Airways", value: 2.0, total: 17600 }
    ]
  },
  "2025-02": {
    operationalMetrics: [
      {
        title: "Búsqueda → Reserva",
        value: "8.8",
        unit: "%",
        change: -3.3
      },
      {
        title: "Tasa de Éxito de Pago",
        value: "95.4",
        unit: "%",
        change: -0.8
      },
      {
        title: "Tiempo de Reserva",
        value: "4.5",
        unit: "min",
        change: 7.1
      }
    ],
    flightOperationsMetrics: [
      {
        title: "Tasa de Cancelación",
        value: "3.1",
        unit: "%",
        change: 10.7
      },
      {
        title: "Ocupación de Asientos",
        value: "83.8",
        unit: "%",
        change: -2.2
      },
      {
        title: "Tiempo de Anticipación",
        value: "22",
        unit: "días",
        change: -4.3
      }
    ],
    popularRoutes: [
      { route: "MAD - BCN", origin: "Madrid", destination: "Barcelona", bookings: 14200, revenue: 2.6 },
      { route: "BCN - MAD", origin: "Barcelona", destination: "Madrid", bookings: 13400, revenue: 2.4 },
      { route: "MAD - LHR", origin: "Madrid", destination: "Londres", bookings: 11100, revenue: 3.8 },
      { route: "BCN - CDG", origin: "Barcelona", destination: "París", bookings: 10600, revenue: 3.4 },
      { route: "MAD - FCO", origin: "Madrid", destination: "Roma", bookings: 8900, revenue: 3.1 },
      { route: "BCN - FRA", origin: "Barcelona", destination: "Frankfurt", bookings: 8200, revenue: 2.9 },
      { route: "MAD - LIS", origin: "Madrid", destination: "Lisboa", bookings: 7600, revenue: 1.9 },
      { route: "VLC - MAD", origin: "Valencia", destination: "Madrid", bookings: 6800, revenue: 1.6 }
    ],
    cancellationsByAirline: [
      { name: "Iberia", value: 2.3, total: 24800 },
      { name: "Vueling", value: 3.1, total: 20600 },
      { name: "Ryanair", value: 4.6, total: 28200 },
      { name: "Air Europa", value: 3.2, total: 16800 },
      { name: "Lufthansa", value: 2.0, total: 14100 },
      { name: "Air France", value: 2.6, total: 17900 },
      { name: "British Airways", value: 2.4, total: 15200 }
    ]
  },
  "2025-03": {
    operationalMetrics: [
  {
    title: "Búsqueda → Reserva",
        value: "9.5",
    unit: "%",
        change: 8.0
  },
  {
    title: "Tasa de Éxito de Pago",
        value: "97.1",
    unit: "%",
        change: 1.8
  },
  {
    title: "Tiempo de Reserva",
        value: "4.0",
    unit: "min",
        change: -11.1
      }
    ],
    flightOperationsMetrics: [
  {
    title: "Tasa de Cancelación",
        value: "2.5",
    unit: "%",
        change: -19.4
  },
  {
    title: "Ocupación de Asientos",
        value: "87.2",
    unit: "%",
        change: 4.1
  },
  {
    title: "Tiempo de Anticipación",
        value: "24",
    unit: "días",
        change: 9.1
      }
    ],
    popularRoutes: [
      { route: "MAD - BCN", origin: "Madrid", destination: "Barcelona", bookings: 18200, revenue: 3.2 },
      { route: "BCN - MAD", origin: "Barcelona", destination: "Madrid", bookings: 17100, revenue: 3.0 },
      { route: "MAD - LHR", origin: "Madrid", destination: "Londres", bookings: 14800, revenue: 4.8 },
      { route: "BCN - CDG", origin: "Barcelona", destination: "París", bookings: 13600, revenue: 4.2 },
      { route: "MAD - FCO", origin: "Madrid", destination: "Roma", bookings: 11900, revenue: 3.8 },
      { route: "BCN - FRA", origin: "Barcelona", destination: "Frankfurt", bookings: 10800, revenue: 3.6 },
      { route: "MAD - LIS", origin: "Madrid", destination: "Lisboa", bookings: 9800, revenue: 2.4 },
      { route: "VLC - MAD", origin: "Valencia", destination: "Madrid", bookings: 9200, revenue: 2.1 }
    ],
    cancellationsByAirline: [
      { name: "Iberia", value: 1.8, total: 32100 },
      { name: "Vueling", value: 2.2, total: 26800 },
      { name: "Ryanair", value: 3.8, total: 35400 },
      { name: "Air Europa", value: 2.1, total: 21200 },
      { name: "Lufthansa", value: 1.4, total: 18900 },
      { name: "Air France", value: 1.9, total: 22400 },
      { name: "British Airways", value: 1.7, total: 19800 }
    ]
  }
};

// Datos de analytics por período
const analyticsDataByPeriod: { [key: string]: any } = {
  "2025-01": {
    dailyActiveUsers: [
      { name: "L", value: 35200 },
      { name: "M", value: 38900 },
      { name: "X", value: 36800 },
      { name: "J", value: 41200 },
      { name: "V", value: 45600 },
      { name: "S", value: 26400 },
      { name: "D", value: 22800 }
    ],
    destinationsByContinent: [
      { name: "Europa", value: 68.2, bookings: 98500 },
      { name: "América", value: 16.8, bookings: 24200 },
      { name: "Asia", value: 11.4, bookings: 16400 },
      { name: "África", value: 2.4, bookings: 3400 },
      { name: "Oceanía", value: 1.2, bookings: 1700 }
    ],
    topCountries: [
      { country: "España", continent: "Europa", bookings: 52100, type: "origin" as const },
      { country: "Francia", continent: "Europa", bookings: 21200, type: "destination" as const },
      { country: "Reino Unido", continent: "Europa", bookings: 18900, type: "destination" as const },
      { country: "Italia", continent: "Europa", bookings: 16800, type: "destination" as const },
      { country: "Alemania", continent: "Europa", bookings: 14200, type: "destination" as const },
      { country: "Portugal", continent: "Europa", bookings: 11100, type: "destination" as const },
      { country: "Estados Unidos", continent: "América", bookings: 10200, type: "destination" as const },
      { country: "Países Bajos", continent: "Europa", bookings: 8400, type: "destination" as const }
    ],
    popularDates: [
      { name: "Lunes", value: 15.8 },
      { name: "Martes", value: 18.2 },
      { name: "Miércoles", value: 16.9 },
      { name: "Jueves", value: 20.4 },
      { name: "Viernes", value: 23.8 },
      { name: "Sábado", value: 3.2 },
      { name: "Domingo", value: 1.7 }
    ],
    bookingAdvanceTime: [
      { name: "Mismo día", value: 6.8 },
      { name: "1-3 días", value: 14.2 },
      { name: "1 semana", value: 19.8 },
      { name: "2 semanas", value: 24.1 },
      { name: "1 mes", value: 26.5 },
      { name: "2+ meses", value: 8.6 }
    ]
  },
  "2025-02": {
    dailyActiveUsers: [
      { name: "L", value: 32400 },
      { name: "M", value: 35800 },
      { name: "X", value: 33600 },
      { name: "J", value: 37900 },
      { name: "V", value: 42100 },
      { name: "S", value: 24200 },
      { name: "D", value: 20800 }
    ],
    destinationsByContinent: [
      { name: "Europa", value: 62.4, bookings: 85200 },
      { name: "América", value: 20.1, bookings: 27400 },
      { name: "Asia", value: 13.8, bookings: 18800 },
      { name: "África", value: 2.1, bookings: 2900 },
      { name: "Oceanía", value: 1.6, bookings: 2200 }
    ],
    topCountries: [
      { country: "España", continent: "Europa", bookings: 41800, type: "origin" as const },
      { country: "Francia", continent: "Europa", bookings: 17600, type: "destination" as const },
      { country: "Reino Unido", continent: "Europa", bookings: 14200, type: "destination" as const },
      { country: "Italia", continent: "Europa", bookings: 12900, type: "destination" as const },
      { country: "Alemania", continent: "Europa", bookings: 10800, type: "destination" as const },
      { country: "Portugal", continent: "Europa", bookings: 8900, type: "destination" as const },
      { country: "Estados Unidos", continent: "América", bookings: 7800, type: "destination" as const },
      { country: "Países Bajos", continent: "Europa", bookings: 6400, type: "destination" as const }
    ],
    popularDates: [
      { name: "Lunes", value: 12.9 },
      { name: "Martes", value: 15.6 },
      { name: "Miércoles", value: 14.1 },
      { name: "Jueves", value: 17.8 },
      { name: "Viernes", value: 20.4 },
      { name: "Sábado", value: 11.2 },
      { name: "Domingo", value: 8.0 }
    ],
    bookingAdvanceTime: [
      { name: "Mismo día", value: 4.2 },
      { name: "1-3 días", value: 10.8 },
      { name: "1 semana", value: 16.4 },
      { name: "2 semanas", value: 21.2 },
      { name: "1 mes", value: 28.9 },
      { name: "2+ meses", value: 18.5 }
    ]
  },
  "2025-03": {
    dailyActiveUsers: [
      { name: "L", value: 38700 },
      { name: "M", value: 42500 },
      { name: "X", value: 40200 },
      { name: "J", value: 44800 },
      { name: "V", value: 49200 },
      { name: "S", value: 28900 },
      { name: "D", value: 25100 }
    ],
    destinationsByContinent: [
      { name: "Europa", value: 71.6, bookings: 105800 },
      { name: "América", value: 15.2, bookings: 22500 },
      { name: "Asia", value: 9.8, bookings: 14500 },
      { name: "África", value: 2.6, bookings: 3800 },
      { name: "Oceanía", value: 0.8, bookings: 1200 }
    ],
    topCountries: [
      { country: "España", continent: "Europa", bookings: 58900, type: "origin" as const },
      { country: "Francia", continent: "Europa", bookings: 24800, type: "destination" as const },
      { country: "Reino Unido", continent: "Europa", bookings: 21400, type: "destination" as const },
      { country: "Italia", continent: "Europa", bookings: 19200, type: "destination" as const },
      { country: "Alemania", continent: "Europa", bookings: 16800, type: "destination" as const },
      { country: "Portugal", continent: "Europa", bookings: 12600, type: "destination" as const },
      { country: "Estados Unidos", continent: "América", bookings: 11400, type: "destination" as const },
      { country: "Países Bajos", continent: "Europa", bookings: 9200, type: "destination" as const }
    ],
    popularDates: [
      { name: "Lunes", value: 16.4 },
      { name: "Martes", value: 19.1 },
      { name: "Miércoles", value: 17.8 },
      { name: "Jueves", value: 21.9 },
      { name: "Viernes", value: 24.8 },
      { name: "Sábado", value: 0.0 },
      { name: "Domingo", value: 0.0 }
    ],
    bookingAdvanceTime: [
      { name: "Mismo día", value: 7.4 },
      { name: "1-3 días", value: 15.8 },
      { name: "1 semana", value: 21.2 },
      { name: "2 semanas", value: 25.9 },
      { name: "1 mes", value: 24.1 },
      { name: "2+ meses", value: 5.6 }
    ]
  }
};

// Funciones para obtener datos por período
export const getOperationalMetricsByPeriod = (period: string): MetricCard[] => {
  return operationsDataByPeriod[period]?.operationalMetrics || operationsDataByPeriod["2025-01"].operationalMetrics;
};

export const getFlightOperationsMetricsByPeriod = (period: string): MetricCard[] => {
  return operationsDataByPeriod[period]?.flightOperationsMetrics || operationsDataByPeriod["2025-01"].flightOperationsMetrics;
};

export const getDailyActiveUsersByPeriod = (period: string): ChartData[] => {
  return analyticsDataByPeriod[period]?.dailyActiveUsers || analyticsDataByPeriod["2025-01"].dailyActiveUsers;
};

export const getDestinationsByContinentByPeriod = (period: string): ChartData[] => {
  return analyticsDataByPeriod[period]?.destinationsByContinent || analyticsDataByPeriod["2025-01"].destinationsByContinent;
};

export const getTopCountriesByPeriod = (period: string): CountryData[] => {
  return analyticsDataByPeriod[period]?.topCountries || analyticsDataByPeriod["2025-01"].topCountries;
};

export const getPopularDatesByPeriod = (period: string): ChartData[] => {
  return analyticsDataByPeriod[period]?.popularDates || analyticsDataByPeriod["2025-01"].popularDates;
};

export const getBookingAdvanceTimeByPeriod = (period: string): ChartData[] => {
  return analyticsDataByPeriod[period]?.bookingAdvanceTime || analyticsDataByPeriod["2025-01"].bookingAdvanceTime;
};

export const getPopularRoutesByPeriod = (period: string): RouteData[] => {
  return operationsDataByPeriod[period]?.popularRoutes || operationsDataByPeriod["2025-01"].popularRoutes;
};

export const getCancellationsByAirlineByPeriod = (period: string): ChartData[] => {
  return operationsDataByPeriod[period]?.cancellationsByAirline || operationsDataByPeriod["2025-01"].cancellationsByAirline;
};

// Excelencia Operativa (fallback para compatibilidad)
export const operationalMetrics: MetricCard[] = operationsDataByPeriod["2025-01"].operationalMetrics;

// Operaciones de Vuelo (fallback para compatibilidad)
export const flightOperationsMetrics: MetricCard[] = operationsDataByPeriod["2025-01"].flightOperationsMetrics;


// Rutas populares
export const popularRoutes: RouteData[] = [
  { route: "MAD - BCN", origin: "Madrid", destination: "Barcelona", bookings: 15420, revenue: 2.8 },
  { route: "BCN - MAD", origin: "Barcelona", destination: "Madrid", bookings: 14680, revenue: 2.6 },
  { route: "MAD - LHR", origin: "Madrid", destination: "Londres", bookings: 12350, revenue: 4.2 },
  { route: "BCN - CDG", origin: "Barcelona", destination: "París", bookings: 11200, revenue: 3.8 },
  { route: "MAD - FCO", origin: "Madrid", destination: "Roma", bookings: 9840, revenue: 3.4 },
  { route: "BCN - FRA", origin: "Barcelona", destination: "Frankfurt", bookings: 8920, revenue: 3.2 },
  { route: "MAD - LIS", origin: "Madrid", destination: "Lisboa", bookings: 8450, revenue: 2.1 },
  { route: "VLC - MAD", origin: "Valencia", destination: "Madrid", bookings: 7680, revenue: 1.8 }
];

// Fechas populares (tendencias estacionales)
export const popularDates: ChartData[] = [
  { name: "Lunes", value: 14.2 },
  { name: "Martes", value: 16.8 },
  { name: "Miércoles", value: 15.4 },
  { name: "Jueves", value: 18.9 },
  { name: "Viernes", value: 22.3 },
  { name: "Sábado", value: 8.1 },
  { name: "Domingo", value: 4.3 }
];

// Destinos por continente
export const destinationsByContinent: ChartData[] = [
  { name: "Europa", value: 65.4, bookings: 89500 },
  { name: "América", value: 18.2, bookings: 24900 },
  { name: "Asia", value: 12.8, bookings: 17500 },
  { name: "África", value: 2.3, bookings: 3100 },
  { name: "Oceanía", value: 1.3, bookings: 1800 }
];

// Países más frecuentes
export const topCountries: CountryData[] = [
  { country: "España", continent: "Europa", bookings: 45200, type: "origin" },
  { country: "Francia", continent: "Europa", bookings: 18900, type: "destination" },
  { country: "Reino Unido", continent: "Europa", bookings: 16400, type: "destination" },
  { country: "Italia", continent: "Europa", bookings: 14800, type: "destination" },
  { country: "Alemania", continent: "Europa", bookings: 12600, type: "destination" },
  { country: "Portugal", continent: "Europa", bookings: 9800, type: "destination" },
  { country: "Estados Unidos", continent: "América", bookings: 8900, type: "destination" },
  { country: "Países Bajos", continent: "Europa", bookings: 7200, type: "destination" }
];

// Cancelaciones por aerolínea
export const cancellationsByAirline: ChartData[] = [
  { name: "Iberia", value: 2.1, total: 28500 },
  { name: "Vueling", value: 2.8, total: 22100 },
  { name: "Ryanair", value: 4.2, total: 31200 },
  { name: "Air Europa", value: 2.9, total: 18400 },
  { name: "Lufthansa", value: 1.8, total: 15600 },
  { name: "Air France", value: 2.4, total: 19800 },
  { name: "British Airways", value: 2.2, total: 16900 }
];

// Usuarios activos por día (fallback para compatibilidad)
export const dailyActiveUsers: ChartData[] = analyticsDataByPeriod["2025-01"].dailyActiveUsers;

// Tiempo de anticipación de reserva
export const bookingAdvanceTime: ChartData[] = [
  { name: "Mismo día", value: 5.2 },
  { name: "1-3 días", value: 12.8 },
  { name: "1 semana", value: 18.4 },
  { name: "2 semanas", value: 22.6 },
  { name: "1 mes", value: 25.3 },
  { name: "2+ meses", value: 15.7 }
];

// =============================================================================
// NUEVAS MÉTRICAS ESPECÍFICAS DEL SISTEMA DE RESERVA DE VUELOS
// =============================================================================

// Gestión de flota - información de aviones por período
const fleetDataByPeriod: { [key: string]: any } = {
  "2025-01": {
    fleetMetrics: [
      {
        title: "Aviones Activos",
        value: "127",
        change: 3.2
      },
      {
        title: "Utilización de Flota",
        value: "87.4",
        unit: "%",
        change: 5.8
      },
      {
        title: "Tiempo Promedio de Vuelo",
        value: "2.3",
        unit: "hrs",
        change: 8.1
      },
      {
        title: "Aviones en Mantenimiento",
        value: "12",
        change: -15.2
      }
    ],
    aircraftByAirline: [
      { name: "Iberia", value: 45, utilization: 89.2 },
      { name: "Vueling", value: 38, utilization: 92.1 },
      { name: "Air Europa", value: 22, utilization: 85.7 },
      { name: "Ryanair", value: 15, utilization: 78.3 },
      { name: "Lufthansa", value: 7, utilization: 91.4 }
    ],
    seatOccupancyByClass: [
      { class: "Economy", occupied: 15420, available: 18250, occupancyRate: 84.5 },
      { class: "Business", occupied: 2850, available: 3650, occupancyRate: 78.1 },
      { class: "First Class", occupied: 580, available: 750, occupancyRate: 77.3 }
    ]
  },
  "2025-02": {
    fleetMetrics: [
      {
        title: "Aviones Activos",
        value: "124",
        change: -2.4
      },
      {
        title: "Utilización de Flota",
        value: "84.1",
        unit: "%",
        change: -3.8
      },
      {
        title: "Tiempo Promedio de Vuelo",
        value: "2.1",
        unit: "hrs",
        change: -8.7
      },
      {
        title: "Aviones en Mantenimiento",
        value: "15",
        change: 25.0
      }
    ],
    aircraftByAirline: [
      { name: "Iberia", value: 43, utilization: 86.8 },
      { name: "Vueling", value: 36, utilization: 88.4 },
      { name: "Air Europa", value: 21, utilization: 82.1 },
      { name: "Ryanair", value: 15, utilization: 75.9 },
      { name: "Lufthansa", value: 9, utilization: 89.2 }
    ],
    seatOccupancyByClass: [
      { class: "Economy", occupied: 13850, available: 17200, occupancyRate: 80.5 },
      { class: "Business", occupied: 2420, available: 3250, occupancyRate: 74.5 },
      { class: "First Class", occupied: 450, available: 680, occupancyRate: 66.2 }
    ]
  },
  "2025-03": {
    fleetMetrics: [
      {
        title: "Aviones Activos",
        value: "132",
        change: 6.5
      },
      {
        title: "Utilización de Flota",
        value: "91.2",
        unit: "%",
        change: 8.4
      },
      {
        title: "Tiempo Promedio de Vuelo",
        value: "2.5",
        unit: "hrs",
        change: 8.7
      },
      {
        title: "Aviones en Mantenimiento",
        value: "8",
        change: -33.3
      }
    ],
    aircraftByAirline: [
      { name: "Iberia", value: 48, utilization: 93.1 },
      { name: "Vueling", value: 41, utilization: 94.8 },
      { name: "Air Europa", value: 24, utilization: 89.2 },
      { name: "Ryanair", value: 12, utilization: 82.7 },
      { name: "Lufthansa", value: 7, utilization: 95.1 }
    ],
    seatOccupancyByClass: [
      { class: "Economy", occupied: 17890, available: 19800, occupancyRate: 90.4 },
      { class: "Business", occupied: 3180, available: 3950, occupancyRate: 80.5 },
      { class: "First Class", occupied: 680, available: 850, occupancyRate: 80.0 }
    ]
  }
};

// Métodos de pago por período
const paymentDataByPeriod: { [key: string]: any } = {
  "2025-01": {
    paymentMethods: [
      { method: "Tarjeta de Crédito", transactions: 45200, revenue: 2.1, successRate: 97.8 },
      { method: "PayPal", transactions: 18900, revenue: 0.9, successRate: 99.1 },
      { method: "Transferencia", transactions: 12400, revenue: 0.6, successRate: 95.2 },
      { method: "Bizum", transactions: 8500, revenue: 0.4, successRate: 98.9 },
      { method: "Apple Pay", transactions: 6200, revenue: 0.3, successRate: 99.4 }
    ],
    paymentMetrics: [
      {
        title: "Transacciones Exitosas",
        value: "97.8",
        unit: "%",
        change: 2.1
      },
      {
        title: "Tiempo Promedio de Pago",
        value: "18.4",
        unit: "seg",
        change: -12.5
      },
      {
        title: "Ingresos por Tarifas",
        value: "$125K",
        change: 15.8
      }
    ]
  },
  "2025-02": {
    paymentMethods: [
      { method: "Tarjeta de Crédito", transactions: 38600, revenue: 1.8, successRate: 96.9 },
      { method: "PayPal", transactions: 16100, revenue: 0.8, successRate: 98.7 },
      { method: "Transferencia", transactions: 10200, revenue: 0.5, successRate: 94.8 },
      { method: "Bizum", transactions: 7200, revenue: 0.3, successRate: 98.1 },
      { method: "Apple Pay", transactions: 5400, revenue: 0.2, successRate: 99.2 }
    ],
    paymentMetrics: [
      {
        title: "Transacciones Exitosas",
        value: "96.9",
        unit: "%",
        change: -0.9
      },
      {
        title: "Tiempo Promedio de Pago",
        value: "19.8",
        unit: "seg",
        change: 7.6
      },
      {
        title: "Ingresos por Tarifas",
        value: "$108K",
        change: -13.6
      }
    ]
  },
  "2025-03": {
    paymentMethods: [
      { method: "Tarjeta de Crédito", transactions: 52800, revenue: 2.5, successRate: 98.2 },
      { method: "PayPal", transactions: 22100, revenue: 1.0, successRate: 99.3 },
      { method: "Transferencia", transactions: 14200, revenue: 0.7, successRate: 95.8 },
      { method: "Bizum", transactions: 9800, revenue: 0.5, successRate: 99.1 },
      { method: "Apple Pay", transactions: 7400, revenue: 0.3, successRate: 99.6 }
    ],
    paymentMetrics: [
      {
        title: "Transacciones Exitosas",
        value: "98.2",
        unit: "%",
        change: 1.3
      },
      {
        title: "Tiempo Promedio de Pago",
        value: "16.9",
        unit: "seg",
        change: -14.6
      },
      {
        title: "Ingresos por Tarifas",
        value: "$142K",
        change: 13.6
      }
    ]
  }
};

// Datos de aeropuertos principales
export const airportData: AirportData[] = [
  { code: "MAD", name: "Adolfo Suárez Madrid-Barajas", city: "Madrid", country: "España", departures: 28500, arrivals: 27800, revenue: 4.2 },
  { code: "BCN", name: "Barcelona-El Prat", city: "Barcelona", country: "España", departures: 22100, arrivals: 21900, revenue: 3.8 },
  { code: "VLC", name: "Valencia", city: "Valencia", country: "España", departures: 8900, arrivals: 9200, revenue: 1.4 },
  { code: "SVQ", name: "Sevilla", city: "Sevilla", country: "España", departures: 6400, arrivals: 6100, revenue: 0.9 },
  { code: "LHR", name: "Heathrow", city: "Londres", country: "Reino Unido", departures: 0, arrivals: 15200, revenue: 2.8 },
  { code: "CDG", name: "Charles de Gaulle", city: "París", country: "Francia", departures: 0, arrivals: 12800, revenue: 2.4 },
  { code: "FCO", name: "Fiumicino", city: "Roma", country: "Italia", departures: 0, arrivals: 10900, revenue: 2.1 }
];

// Funciones para obtener datos de flota por período
export const getFleetMetricsByPeriod = (period: string): MetricCard[] => {
  return fleetDataByPeriod[period]?.fleetMetrics || fleetDataByPeriod["2025-01"].fleetMetrics;
};

export const getAircraftByAirlineByPeriod = (period: string): ChartData[] => {
  return fleetDataByPeriod[period]?.aircraftByAirline || fleetDataByPeriod["2025-01"].aircraftByAirline;
};

export const getSeatOccupancyByClassByPeriod = (period: string): SeatOccupancyData[] => {
  return fleetDataByPeriod[period]?.seatOccupancyByClass || fleetDataByPeriod["2025-01"].seatOccupancyByClass;
};

export const getPaymentMethodsByPeriod = (period: string): PaymentMethodData[] => {
  return paymentDataByPeriod[period]?.paymentMethods || paymentDataByPeriod["2025-01"].paymentMethods;
};

export const getPaymentMetricsByPeriod = (period: string): MetricCard[] => {
  return paymentDataByPeriod[period]?.paymentMetrics || paymentDataByPeriod["2025-01"].paymentMetrics;
};
