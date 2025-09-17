import { ingestApi, apiRequest } from './axiosConfig';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface SearchEvent {
  type: 'busqueda_realizada';
  ts: string;
  searchId: string;
  userId: string;
  origin: string;
  destination: string;
  dateOut: string;
  adults: number;
  cabin: string;
  sessionId: string;
}

export interface ReservationEvent {
  type: 'reserva_creada';
  ts: string;
  reservaId: string;
  vueloId: string;
  precio: number;
  userId: string;
  airlineCode: string;
  origin: string;
  destination: string;
  flightDate: string;
  searchId: string;
}

export interface PaymentEvent {
  type: 'pago_aprobado';
  ts: string;
  paymentId: string;
  reservaId: string;
  userId: string;
  amount: number;
}

export interface CancellationEvent {
  type: 'reserva_cancelada';
  ts: string;
  reservaId: string;
  userId: string;
  motivo: string;
}

export type IngestEvent = SearchEvent | ReservationEvent | PaymentEvent | CancellationEvent;

export interface IngestResponse {
  ok: boolean;
  eventId: string;
}

// =============================================================================
// INGEST API FUNCTIONS
// =============================================================================

// Generic event ingestion
export const ingestEvent = (event: IngestEvent): Promise<IngestResponse> =>
  apiRequest<IngestResponse>(ingestApi, {
    method: 'POST',
    url: '/events',
    data: event,
  });

// =============================================================================
// SPECIFIC EVENT FUNCTIONS
// =============================================================================

// Search Event
export const ingestSearchEvent = (searchData: {
  searchId: string;
  userId: string;
  origin: string;
  destination: string;
  dateOut: string;
  adults: number;
  cabin: string;
  sessionId: string;
}): Promise<IngestResponse> => {
  const event: SearchEvent = {
    type: 'busqueda_realizada',
    ts: new Date().toISOString(),
    ...searchData,
  };

  return ingestEvent(event);
};

// Reservation Event
export const ingestReservationEvent = (reservationData: {
  reservaId: string;
  vueloId: string;
  precio: number;
  userId: string;
  airlineCode: string;
  origin: string;
  destination: string;
  flightDate: string;
  searchId: string;
}): Promise<IngestResponse> => {
  const event: ReservationEvent = {
    type: 'reserva_creada',
    ts: new Date().toISOString(),
    ...reservationData,
  };

  return ingestEvent(event);
};

// Payment Event
export const ingestPaymentEvent = (paymentData: {
  paymentId: string;
  reservaId: string;
  userId: string;
  amount: number;
}): Promise<IngestResponse> => {
  const event: PaymentEvent = {
    type: 'pago_aprobado',
    ts: new Date().toISOString(),
    ...paymentData,
  };

  return ingestEvent(event);
};

// Cancellation Event
export const ingestCancellationEvent = (cancellationData: {
  reservaId: string;
  userId: string;
  motivo: string;
}): Promise<IngestResponse> => {
  const event: CancellationEvent = {
    type: 'reserva_cancelada',
    ts: new Date().toISOString(),
    ...cancellationData,
  };

  return ingestEvent(event);
};
