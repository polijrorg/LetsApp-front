import { useState, useEffect, useCallback } from 'react';
import CalendarServices from '@services/CalendarServices';
import Event, { EventElement } from '@interfaces/Events';
import Invite from '@interfaces/Invites';

interface CalendarState {
  events: Event[];
  invites: Invite[];
  weekEvents: EventElement[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface UseCalendarReturn extends CalendarState {
  refreshEvents: () => Promise<void>;
  refreshInvites: () => Promise<void>;
  refreshWeekEvents: () => Promise<void>;
  refreshAll: () => Promise<void>;
  clearCache: () => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const useCalendar = (userEmail?: string, userPhone?: string): UseCalendarReturn => {
  const [state, setState] = useState<CalendarState>({
    events: [],
    invites: [],
    weekEvents: [],
    loading: false,
    error: null,
    lastUpdated: null,
  });

  const updateState = useCallback((updates: Partial<CalendarState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const refreshEvents = useCallback(async () => {
    if (!userEmail) return;
    
    try {
      updateState({ loading: true, error: null });
      const events = await CalendarServices.getUserEvents(userEmail);
      updateState({ 
        events, 
        loading: false, 
        lastUpdated: new Date(),
        error: null 
      });
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      updateState({ 
        loading: false, 
        error: 'Falha ao carregar eventos' 
      });
    }
  }, [userEmail, updateState]);

  const refreshInvites = useCallback(async () => {
    if (!userEmail) return;
    
    try {
      updateState({ loading: true, error: null });
      const invites = await CalendarServices.getUserInvites(userEmail);
      updateState({ 
        invites, 
        loading: false, 
        lastUpdated: new Date(),
        error: null 
      });
    } catch (error) {
      console.error('Erro ao buscar convites:', error);
      updateState({ 
        loading: false, 
        error: 'Falha ao carregar convites' 
      });
    }
  }, [userEmail, updateState]);

  const refreshWeekEvents = useCallback(async () => {
    if (!userPhone) return;
    
    try {
      updateState({ loading: true, error: null });
      const weekEvents = await CalendarServices.getEventsInWeek(userPhone);
      updateState({ 
        weekEvents, 
        loading: false, 
        lastUpdated: new Date(),
        error: null 
      });
    } catch (error) {
      console.error('Erro ao buscar eventos da semana:', error);
      updateState({ 
        loading: false, 
        error: 'Falha ao carregar eventos da semana' 
      });
    }
  }, [userPhone, updateState]);

  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshEvents(),
      refreshInvites(),
      refreshWeekEvents()
    ]);
  }, [refreshEvents, refreshInvites, refreshWeekEvents]);

  const clearCache = useCallback(() => {
    setState({
      events: [],
      invites: [],
      weekEvents: [],
      loading: false,
      error: null,
      lastUpdated: null,
    });
  }, []);

  // Auto-refresh quando dados ficam obsoletos
  useEffect(() => {
    if (!state.lastUpdated) return;

    const checkCacheExpiry = () => {
      const now = new Date();
      const timeDiff = now.getTime() - state.lastUpdated!.getTime();
      
      if (timeDiff > CACHE_DURATION) {
        refreshAll();
      }
    };

    const interval = setInterval(checkCacheExpiry, 60000); // Verifica a cada minuto
    return () => clearInterval(interval);
  }, [state.lastUpdated, refreshAll]);

  // Carregamento inicial
  useEffect(() => {
    if ((userEmail || userPhone) && !state.lastUpdated) {
      refreshAll();
    }
  }, [userEmail, userPhone, state.lastUpdated, refreshAll]);

  return {
    ...state,
    refreshEvents,
    refreshInvites,
    refreshWeekEvents,
    refreshAll,
    clearCache,
  };
};

