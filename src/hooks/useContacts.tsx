import { useState, useEffect, useCallback, useRef } from 'react';
import CalendarServices from '@services/CalendarServices';
import User from '@interfaces/User';

interface ContactState {
  contacts: User[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
}

interface UseContactsReturn extends ContactState {
  addContact: (contactData: {
    userPhone: string;
    phone: string;
    name: string;
    email: string;
  }) => Promise<User | null>;
  refreshContacts: () => Promise<void>;
  clearCache: () => void;
  syncWithGoogle: () => Promise<void>;
  syncWithOutlook: () => Promise<void>;
}

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos
const RETRY_DELAY = 2000; // 2 segundos

export const useContacts = (userPhone?: string): UseContactsReturn => {
  const [state, setState] = useState<ContactState>({
    contacts: [],
    loading: false,
    error: null,
    lastUpdated: null,
    syncStatus: 'idle',
  });

  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  const updateState = useCallback((updates: Partial<ContactState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const addContact = useCallback(async (contactData: {
    userPhone: string;
    phone: string;
    name: string;
    email: string;
  }): Promise<User | null> => {
    try {
      updateState({ loading: true, error: null });
      
      const newContact = await CalendarServices.addContact(contactData);
      
      // Atualiza a lista local de contatos
      setState(prev => ({
        ...prev,
        contacts: [...prev.contacts, newContact],
        loading: false,
        lastUpdated: new Date(),
        error: null,
      }));
      
      return newContact;
    } catch (error) {
      console.error('Erro ao adicionar contato:', error);
      updateState({ 
        loading: false, 
        error: 'Falha ao adicionar contato' 
      });
      return null;
    }
  }, [updateState]);

  const refreshContacts = useCallback(async () => {
    if (!userPhone) return;

    // Cancela requisição anterior se existir
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    try {
      updateState({ loading: true, error: null });
      
      // Simula busca de contatos (implementar endpoint real)
      // const contacts = await CalendarServices.getContacts(userPhone);
      const contacts: User[] = []; // Placeholder
      
      updateState({ 
        contacts, 
        loading: false, 
        lastUpdated: new Date(),
        error: null 
      });
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return; // Requisição foi cancelada
      }
      
      console.error('Erro ao buscar contatos:', error);
      updateState({ 
        loading: false, 
        error: 'Falha ao carregar contatos' 
      });
      
      // Retry automático após delay
      retryTimeoutRef.current = setTimeout(() => {
        refreshContacts();
      }, RETRY_DELAY);
    }
  }, [userPhone, updateState]);

  const syncWithGoogle = useCallback(async () => {
    try {
      updateState({ syncStatus: 'syncing', error: null });
      
      // Implementar sincronização com Google Contacts
      console.log('Sincronizando contatos com Google...');
      
      // Simula delay de sincronização
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      updateState({ 
        syncStatus: 'success',
        lastUpdated: new Date() 
      });
      
      // Atualiza contatos após sincronização
      await refreshContacts();
    } catch (error) {
      console.error('Erro na sincronização com Google:', error);
      updateState({ 
        syncStatus: 'error',
        error: 'Falha na sincronização com Google' 
      });
    }
  }, [updateState, refreshContacts]);

  const syncWithOutlook = useCallback(async () => {
    try {
      updateState({ syncStatus: 'syncing', error: null });
      
      // Implementar sincronização com Outlook Contacts
      console.log('Sincronizando contatos com Outlook...');
      
      // Simula delay de sincronização
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      updateState({ 
        syncStatus: 'success',
        lastUpdated: new Date() 
      });
      
      // Atualiza contatos após sincronização
      await refreshContacts();
    } catch (error) {
      console.error('Erro na sincronização com Outlook:', error);
      updateState({ 
        syncStatus: 'error',
        error: 'Falha na sincronização com Outlook' 
      });
    }
  }, [updateState, refreshContacts]);

  const clearCache = useCallback(() => {
    // Cancela operações pendentes
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    setState({
      contacts: [],
      loading: false,
      error: null,
      lastUpdated: null,
      syncStatus: 'idle',
    });
  }, []);

  // Auto-refresh quando dados ficam obsoletos
  useEffect(() => {
    if (!state.lastUpdated) return;

    const checkCacheExpiry = () => {
      const now = new Date();
      const timeDiff = now.getTime() - state.lastUpdated!.getTime();
      
      if (timeDiff > CACHE_DURATION) {
        refreshContacts();
      }
    };

    const interval = setInterval(checkCacheExpiry, 60000); // Verifica a cada minuto
    return () => clearInterval(interval);
  }, [state.lastUpdated, refreshContacts]);

  // Carregamento inicial
  useEffect(() => {
    if (userPhone && !state.lastUpdated) {
      refreshContacts();
    }
  }, [userPhone, state.lastUpdated, refreshContacts]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return {
    ...state,
    addContact,
    refreshContacts,
    clearCache,
    syncWithGoogle,
    syncWithOutlook,
  };
};

