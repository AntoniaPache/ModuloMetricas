import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ingestEvent, 
  ingestSearchEvent,
  ingestReservationEvent,
  ingestPaymentEvent,
  ingestCancellationEvent,
  IngestEvent,
  IngestResponse 
} from '../services/ingestService';
import { analyticsKeys } from './useAnalytics';

// =============================================================================
// INGEST MUTATIONS
// =============================================================================

// Generic event ingestion hook
export const useIngestEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<IngestResponse, Error, IngestEvent>({
    mutationFn: (event: IngestEvent) => ingestEvent(event),
    onSuccess: () => {
      // Invalidate relevant analytics queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: analyticsKeys.all });
    },
    onError: (error) => {
      console.error('Failed to ingest event:', error);
    },
  });
};

// =============================================================================
// SPECIFIC EVENT HOOKS
// =============================================================================

// Search Event Hook
export const useIngestSearch = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IngestResponse, Error, {
    searchId: string;
    userId: string;
    origin: string;
    destination: string;
    dateOut: string;
    adults: number;
    cabin: string;
    sessionId: string;
  }>({
    mutationFn: ingestSearchEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: analyticsKeys.all });
    },
    onError: (error) => {
      console.error('Failed to ingest search event:', error);
    },
  });

  return {
    trackSearch: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// Reservation Event Hook
export const useIngestReservation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IngestResponse, Error, {
    reservaId: string;
    vueloId: string;
    precio: number;
    userId: string;
    airlineCode: string;
    origin: string;
    destination: string;
    flightDate: string;
    searchId: string;
  }>({
    mutationFn: ingestReservationEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: analyticsKeys.all });
    },
    onError: (error) => {
      console.error('Failed to ingest reservation event:', error);
    },
  });

  return {
    trackReservation: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// Payment Event Hook
export const useIngestPayment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IngestResponse, Error, {
    paymentId: string;
    reservaId: string;
    userId: string;
    amount: number;
  }>({
    mutationFn: ingestPaymentEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: analyticsKeys.all });
    },
    onError: (error) => {
      console.error('Failed to ingest payment event:', error);
    },
  });

  return {
    trackPayment: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// Cancellation Event Hook
export const useIngestCancellation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IngestResponse, Error, {
    reservaId: string;
    userId: string;
    motivo: string;
  }>({
    mutationFn: ingestCancellationEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: analyticsKeys.all });
    },
    onError: (error) => {
      console.error('Failed to ingest cancellation event:', error);
    },
  });

  return {
    trackCancellation: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// =============================================================================
// COMPOSED TRACKING HOOK
// =============================================================================

// Complete user journey tracking
export const useUserJourneyTracking = () => {
  const searchHook = useIngestSearch();
  const reservationHook = useIngestReservation();
  const paymentHook = useIngestPayment();
  const cancellationHook = useIngestCancellation();

  return {
    // Search tracking
    trackSearch: searchHook.trackSearch,
    
    // Reservation tracking
    trackReservation: reservationHook.trackReservation,
    
    // Payment tracking
    trackPayment: paymentHook.trackPayment,
    
    // Cancellation tracking
    trackCancellation: cancellationHook.trackCancellation,
    
    // Combined loading state
    isLoading: [
      searchHook.isLoading,
      reservationHook.isLoading,
      paymentHook.isLoading,
      cancellationHook.isLoading,
    ].some(Boolean),
    
    // Combined error state
    isError: [
      searchHook.isError,
      reservationHook.isError,
      paymentHook.isError,
      cancellationHook.isError,
    ].some(Boolean),
    
    // Individual hooks for specific use cases
    searchHook,
    reservationHook,
    paymentHook,
    cancellationHook,
  };
};
